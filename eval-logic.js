/**
 * Gymnastics Technical Evaluation Logic
 * CAG 2026 Regulations
 * Firebase Persistence
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  projectId: "gymcoachpro-c0c8e",
  appId: "1:923517600594:web:a81bdd1a150b7f22dcf08b",
  storageBucket: "gymcoachpro-c0c8e.firebasestorage.app",
  apiKey: "AIzaSyBbuRw3J7t_8xQc-6_qOqQDdjEEWZgSHaY",
  authDomain: "gymcoachpro-c0c8e.firebaseapp.com",
  messagingSenderId: "923517600594",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const evalRef = collection(db, "evaluaciones_tecnicas");

document.addEventListener('DOMContentLoaded', () => {
    // --- State & Constants ---
    let currentState = {
        gymnastName: '',
        birthYear: null,
        birthDate: '',
        age: 0,
        category: '',
        level: '',
        apparatus: '',
        elements: {}, // { elemId: { checked: true, technicalDeductions: [val] } }
        generalExecution: [],
        landings: [],
        falls: 0,
        vaultRuns: 0,
        vaultAttempt: 1,
        startValue: 10.00,
        totalDeductions: 0,
        finalScore: 10.00
    };

    // --- DOM Elements ---
    const dom = {
        name: document.getElementById('gymnastName'),
        birthDate: document.getElementById('birthDate'),
        ageLabel: document.getElementById('ageLabel'),
        categoryLabel: document.getElementById('categoryLabel'),
        levelSelect: document.getElementById('levelSelect'),
        apparatusSelect: document.getElementById('apparatusSelect'),
        evalArea: document.getElementById('evaluationArea'),
        startPrompt: document.getElementById('startPrompt'),
        evalTitle: document.getElementById('evalTitle'),
        elementsBody: document.getElementById('elementsBody'),
        execDeducsArea: document.getElementById('executionDeductions'),
        landDeducsArea: document.getElementById('landingDeductions'),
        fallCount: document.getElementById('fallCount'),
        btnMinusFall: document.getElementById('btnMinusFall'),
        btnPlusFall: document.getElementById('btnPlusFall'),
        startVal: document.getElementById('startValue'),
        totDeducs: document.getElementById('totalDeductions'),
        finalScore: document.getElementById('finalScore'),
        vaultRunsArea: document.getElementById('vaultRunsArea'),
        emptyRunsGroup: document.getElementById('emptyRunsGroup'),
        jumpAttemptGroup: document.getElementById('jumpAttemptGroup'),
        btnReset: document.getElementById('btnReset'),
        btnPrint: document.getElementById('btnPrint'),
        btnSave: document.getElementById('btnSave')
    };

    // --- Initialization ---
    init();

    function init() {
        // Event Listeners
        dom.name.addEventListener('input', e => currentState.gymnastName = e.target.value);
        dom.birthDate.addEventListener('change', updateCategory);
        dom.birthDate.addEventListener('input', updateCategory);
        dom.levelSelect.addEventListener('change', updateApparatusOptions);
        dom.apparatusSelect.addEventListener('change', startEvaluation);
        
        dom.btnMinusFall.addEventListener('click', () => updateFalls(-1));
        dom.btnPlusFall.addEventListener('click', () => updateFalls(1));
        
        dom.btnReset.addEventListener('click', resetApp);
        dom.btnPrint.addEventListener('click', () => window.print());
        dom.btnSave.addEventListener('click', saveEvaluation);

        // Vault Specific
        dom.emptyRunsGroup.addEventListener('click', e => {
            if(e.target.tagName === 'BUTTON') {
                const val = parseInt(e.target.dataset.runs);
                currentState.vaultRuns = val;
                Array.from(dom.emptyRunsGroup.children).forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                calculateScore();
            }
        });

        dom.jumpAttemptGroup.addEventListener('click', e => {
            if(e.target.tagName === 'BUTTON') {
                currentState.vaultAttempt = parseInt(e.target.dataset.attempt);
                Array.from(dom.jumpAttemptGroup.children).forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                calculateScore();
            }
        });

        // Initialize display
        updateCategory();
    }

    // --- Core Functions ---

    function updateCategory() {
        if(!dom.birthDate.value) {
            dom.categoryLabel.textContent = '---';
            dom.ageLabel.textContent = '---';
            return;
        }

        const parts = dom.birthDate.value.split('-');
        if (parts.length !== 3) return;
        
        const birthYear = parseInt(parts[0]);
        const currentYear = 2026; 
        const age = currentYear - birthYear;
        
        const constants = window.EVAL_CONSTANTS || {};
        const categories = constants.CATEGORIES || [];
        const cat = categories.find(c => age >= c.min && age <= c.max);
        
        currentState.birthDate = dom.birthDate.value;
        currentState.age = age;
        currentState.birthYear = birthYear;
        dom.ageLabel.textContent = `${age} años`;
        
        if(cat) {
            currentState.category = cat.name;
            dom.categoryLabel.textContent = cat.name;
            dom.categoryLabel.className = 'badge-status status-active';
        } else {
            currentState.category = '';
            dom.categoryLabel.textContent = age < 6 ? 'Diferenciada (Sub-6)' : 'Fuera de Rango';
            dom.categoryLabel.className = 'badge-status status-warning';
        }
    }

    function updateApparatusOptions() {
        const level = dom.levelSelect.value;
        console.log("Nivel seleccionado:", level);
        currentState.level = level;
        
        dom.apparatusSelect.value = "";
        currentState.apparatus = "";
        hideEvaluation();

        if(level === 'E1B') {
            Array.from(dom.apparatusSelect.options).forEach(opt => {
                if(opt.value && opt.value !== 'SALTO' && opt.value !== 'SUELO') {
                    opt.disabled = true;
                } else {
                    opt.disabled = false;
                }
            });
        } else {
            Array.from(dom.apparatusSelect.options).forEach(opt => opt.disabled = false);
        }
    }

    function startEvaluation() {
        const level = dom.levelSelect.value;
        const app = dom.apparatusSelect.value;
        
        console.log("startEvaluation triggered with:", { level, app });

        if(!level || !app) {
            console.warn("Faltan datos para iniciar: Nivel o Aparato vacíos.");
            hideEvaluation();
            return;
        }

        currentState.level = level;
        currentState.apparatus = app;
        currentState.elements = {};
        currentState.generalExecution = [];
        currentState.landings = [];
        currentState.falls = 0;
        currentState.vaultRuns = 0;

        renderEvaluation();
        
        console.log("Mostrando área de evaluación...");
        if (dom.evalArea) {
            dom.evalArea.classList.remove('hidden');
            dom.evalArea.style.display = 'block'; // Force display if hidden class fails
        }
        if (dom.startPrompt) {
            dom.startPrompt.classList.add('hidden');
            dom.startPrompt.style.display = 'none';
        }
        
        calculateScore();
    }

    function hideEvaluation() {
        console.log("Ocultando área de evaluación.");
        if (dom.evalArea) {
            dom.evalArea.classList.add('hidden');
            dom.evalArea.style.display = 'none';
        }
        if (dom.startPrompt) {
            dom.startPrompt.classList.remove('hidden');
            dom.startPrompt.style.display = 'flex';
        }
    }

    function renderEvaluation() {
        if(!currentState.level || !currentState.apparatus) return;

        const levelDetails = window.EVAL_LEVEL_DETAILS || {};
        const levelData = levelDetails[currentState.level];
        
        if(!levelData || !levelData.aparatos) {
            console.warn("Faltan datos para el nivel:", currentState.level);
            return;
        }

        const appData = levelData.aparatos[currentState.apparatus];
        
        if(!appData || !appData.elements) {
            alert("Información técnica no disponible para este aparato en " + levelData.label);
            hideEvaluation();
            return;
        }

        // Start Value
        currentState.startValue = appData.baseScore || 10.0;

        // Vault Area
        if(currentState.apparatus === 'SALTO') {
            dom.vaultRunsArea.classList.remove('hidden');
        } else {
            dom.vaultRunsArea.classList.add('hidden');
        }

        // 1. Elements
        dom.elementsBody.innerHTML = '';
        appData.elements.forEach((elem, index) => {
            const tr = document.createElement('tr');
            
            // Segmented Deductions for elements
            let techDedsHtml = '';
            if(elem.deductions && elem.deductions.length > 0) {
                techDedsHtml = `<div class="deduction-list">`;
                elem.deductions.forEach((d, dIdx) => {
                    const id = `ded-elem-${index}-${dIdx}`;
                    techDedsHtml += `
                        <div class="deduction-item">
                            <div class="deduction-info">
                                <span>${d.text}</span>
                            </div>
                            <div class="ded-segments" data-id="${id}" data-type="elem" data-elem="${index}">
                                ${generateSegments(d.val)}
                            </div>
                        </div>
                    `;
                });
                techDedsHtml += `</div>`;
            }

            // UI for options vs normal elements
            const statusHtml = elem.isOption 
                ? `
                    <div class="btn-group option-group">
                        <button class="btn-elem-status" data-elem="${index}" data-status="base">Elegida</button>
                        <button class="btn-elem-status active" data-elem="${index}" data-status="missing">No elegida</button>
                    </div>
                `
                : `
                    <div class="btn-group">
                        <button class="btn-elem-status active" data-elem="${index}" data-status="base">Presente</button>
                        <button class="btn-elem-status" data-elem="${index}" data-status="missing">No realizado</button>
                    </div>
                `;

            tr.innerHTML = `
                <td>
                    <div class="element-name">${elem.name}</div>
                    <small style="color: grey">${elem.requirement || ''}</small>
                </td>
                <td class="element-val">${elem.value.toFixed(2)}</td>
                <td>${techDedsHtml}</td>
                <td>${statusHtml}</td>
            `;
            dom.elementsBody.appendChild(tr);
            
            // Init state for this element
            // Options are NOT SELECTED by default
            currentState.elements[index] = { 
                status: elem.isOption ? 'missing' : 'base', 
                baseValue: elem.value,
                isOption: elem.isOption || false,
                subValue: elem.subValue || 0,
                appliedDeductions: [] 
            };
        });

        // 2. Global Execution
        const globalDeds = window.GLOBAL_DEDUCTIONS || { EXECUTION: [], LANDING: [] };
        renderGlobalDeductions(dom.execDeducsArea, globalDeds.EXECUTION, 'exec');
        renderGlobalDeductions(dom.landDeducsArea, globalDeds.LANDING, 'land');

        // Add Listeners to all new checkboxes
        setupListeners();
    }

    function renderGlobalDeductions(container, data, type) {
        container.innerHTML = '';
        data.forEach((d, idx) => {
            const id = `ded-${type}-${idx}`;
            const div = document.createElement('div');
            div.className = 'deduction-item';
            div.innerHTML = `
                <div class="deduction-info">
                    <span>${d.text}</span>
                </div>
                <div class="ded-segments" data-id="${id}" data-type="${type}" data-idx="${idx}">
                    ${generateSegments(d.val)}
                </div>
            `;
            container.appendChild(div);
        });
    }

    function generateSegments(maxVal) {
        let html = '';
        // Special case: if val is very small (0.05), just show 0.05
        if (maxVal < 0.10) {
            return `<button class="btn-segment is-max" data-val="${maxVal}">${maxVal.toFixed(2)}</button>`;
        }
        
        // Typical increments of 0.1
        for (let v = 0.1; v <= maxVal + 0.01; v += 0.1) {
            const isMax = Math.abs(v - maxVal) < 0.01;
            html += `<button class="btn-segment ${isMax ? 'is-max' : ''}" data-val="${v.toFixed(2)}">${v.toFixed(1)}</button>`;
        }
        return html;
    }

    function setupListeners() {
        // Elements Status (Presente/Faltante)
        document.querySelectorAll('.btn-elem-status').forEach(btn => {
            btn.addEventListener('click', e => {
                const elemIdx = e.target.dataset.elem;
                const status = e.target.dataset.status;
                
                // Toggle active class
                const group = e.target.parentElement;
                Array.from(group.children).forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                currentState.elements[elemIdx].status = status;
                calculateScore();
            });
        });

        // Segmented buttons click
        document.querySelectorAll('.btn-segment').forEach(btn => {
            btn.addEventListener('click', e => {
                const group = e.target.parentElement;
                const wasActive = e.target.classList.contains('active');
                
                // Remove active from peers in the same segment group
                Array.from(group.children).forEach(b => b.classList.remove('active'));
                
                // Toggle current if it wasn't already active
                if(!wasActive) {
                    e.target.classList.add('active');
                }
                
                calculateScore();
            });
        });
    }

    function updateFalls(val) {
        currentState.falls = Math.max(0, currentState.falls + val);
        dom.fallCount.textContent = currentState.falls;
        calculateScore();
    }

    function calculateScore() {
        let deductions = 0;
        let startVal = currentState.startValue;

        // 1. Element Status (Faltante = Deduce valor del elemento; Opción = Ajusta SV)
        Object.keys(currentState.elements).forEach(id => {
            const elem = currentState.elements[id];
            
            if (elem.isOption) {
                // Si la opción está "Elegida" (base), se resta del Valor de Partida inicial
                if (elem.status === 'base') {
                    startVal -= elem.subValue;
                }
            } else {
                // Elemento normal: si falta, se descuenta su valor
                if (elem.status === 'missing') {
                    deductions += elem.baseValue;
                }
            }
        });

        // 2. Technical Deductions (Segment buttons)
        document.querySelectorAll('.btn-segment.active').forEach(btn => {
            deductions += parseFloat(btn.dataset.val);
        });

        // 3. Falls (0.50 ea)
        deductions += (currentState.falls * 0.50);

        // 4. Vault Specific
        if(currentState.apparatus === 'SALTO' && currentState.vaultRuns > 1) {
            deductions += (currentState.vaultRuns - 1) * 0.50;
        }

        // Final Calcs
        let final = startVal - deductions;
        if(final < 0) final = 0;

        currentState.totalDeductions = deductions;
        currentState.finalScore = final;
        currentState.adjustedStartValue = startVal;

        // Update UI
        dom.startVal.textContent = startVal.toFixed(2);
        dom.totDeducs.textContent = deductions.toFixed(2);
        dom.finalScore.textContent = final.toFixed(2);
    }

    async function saveEvaluation() {
        if(!currentState.gymnastName || !currentState.level || !currentState.apparatus) {
            alert('Por favor, completá el Nombre, Nivel y Aparato antes de guardar.');
            return;
        }

        dom.btnSave.disabled = true;
        dom.btnSave.textContent = '💾 Guardando...';

        try {
            await addDoc(evalRef, {
                gymnastName: currentState.gymnastName,
                birthYear: currentState.birthYear,
                category: currentState.category,
                level: currentState.level,
                apparatus: currentState.apparatus,
                startValue: currentState.startValue,
                adjustedStartValue: currentState.adjustedStartValue || currentState.startValue,
                totalDeductions: currentState.totalDeductions,
                finalScore: currentState.finalScore,
                observations: document.getElementById('observations').value,
                timestamp: serverTimestamp()
            });

            alert('✅ Evaluación guardada con éxito en Firebase.');
        } catch (error) {
            console.error("Error guardando evaluación:", error);
            alert('❌ Error al guardar en la nube. Reintentá.');
        } finally {
            dom.btnSave.disabled = false;
            dom.btnSave.textContent = '💾 Guardar en Nube';
        }
    }

    function resetApp() {
        if(confirm('¿Seguro que querés reiniciar la evaluación? Se borrarán todos los datos actuales.')) {
            window.location.reload();
        }
    }
});
