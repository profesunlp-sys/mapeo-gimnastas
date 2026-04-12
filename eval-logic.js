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
        birthYear: document.getElementById('birthYear'),
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
        dom.birthYear.addEventListener('input', updateCategory);
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
        const year = parseInt(dom.birthYear.value);
        if(!year || year < 1990 || year > 2026) {
            dom.categoryLabel.textContent = '---';
            dom.categoryLabel.className = 'badge-status';
            return;
        }

        const age = 2026 - year;
        const cat = EVAL_CONSTANTS.CATEGORIES.find(c => age >= c.min && age <= c.max);
        
        if(cat) {
            currentState.category = cat.name;
            currentState.birthYear = year;
            dom.categoryLabel.textContent = cat.name;
            dom.categoryLabel.className = 'badge-status status-active';
        } else {
            dom.categoryLabel.textContent = 'Fuera de Rango';
            dom.categoryLabel.className = 'badge-status status-warning';
        }
    }

    function updateApparatusOptions() {
        const level = dom.levelSelect.value;
        currentState.level = level;
        
        // Reset apparatus selection
        dom.apparatusSelect.value = "";
        currentState.apparatus = "";
        hideEvaluation();

        // Level E1B only has VT and FX
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
        
        if(!level || !app) {
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
        dom.evalArea.classList.remove('hidden');
        dom.startPrompt.classList.add('hidden');
        calculateScore();
    }

    function hideEvaluation() {
        dom.evalArea.classList.add('hidden');
        dom.startPrompt.classList.remove('hidden');
    }

    function renderEvaluation() {
        const levelData = EVAL_LEVEL_DETAILS[currentState.level];
        const appData = levelData.aparatos[currentState.apparatus];
        
        if(!appData) {
            alert("Aparato no disponible para este nivel.");
            hideEvaluation();
            return;
        }

        // Header
        dom.evalTitle.textContent = `Evaluación Técnica - ${currentState.apparatus} (${currentState.level})`;
        
        // Start Value
        currentState.startValue = appData.baseScore;

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
            
            // Checkboxes for deductions
            let techDedsHtml = '';
            if(elem.deductions && elem.deductions.length > 0) {
                techDedsHtml = `<div class="deduction-list">`;
                elem.deductions.forEach((d, dIdx) => {
                    const id = `ded-elem-${index}-${dIdx}`;
                    techDedsHtml += `
                        <label class="ded-check" for="${id}">
                            <input type="checkbox" id="${id}" data-type="elem" data-elem="${index}" data-val="${d.val}">
                            <span>${d.text}</span>
                            <span class="ded-val">-${d.val.toFixed(2)}</span>
                        </label>
                    `;
                });
                techDedsHtml += `</div>`;
            }

            tr.innerHTML = `
                <td>
                    <div class="element-name">${elem.name}</div>
                    <small style="color: grey">${elem.requirement || ''}</small>
                </td>
                <td class="element-val">${elem.value.toFixed(2)}</td>
                <td>${techDedsHtml}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn-elem-status active" data-elem="${index}" data-status="base">Presente</button>
                        <button class="btn-elem-status" data-elem="${index}" data-status="missing">No realizado</button>
                    </div>
                </td>
            `;
            dom.elementsBody.appendChild(tr);
            
            // Init state for this element
            currentState.elements[index] = { 
                status: 'base', 
                baseValue: elem.value, 
                appliedDeductions: [] 
            };
        });

        // 2. Global Execution
        renderGlobalDeductions(dom.execDeducsArea, GLOBAL_DEDUCTIONS.EXECUTION, 'exec');
        renderGlobalDeductions(dom.landDeducsArea, GLOBAL_DEDUCTIONS.LANDINGS, 'land');

        // Add Listeners to all new checkboxes
        setupListeners();
    }

    function renderGlobalDeductions(container, data, type) {
        container.innerHTML = '';
        data.forEach((d, idx) => {
            const id = `ded-${type}-${idx}`;
            const div = document.createElement('div');
            div.innerHTML = `
                <label class="ded-check" for="${id}">
                    <input type="checkbox" id="${id}" data-type="${type}" data-idx="${idx}" data-val="${d.val}">
                    <span>${d.text}</span>
                    <span class="ded-val">-${d.val.toFixed(2)}</span>
                </label>
            `;
            container.appendChild(div);
        });
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

        // Any Checkbox change
        document.querySelectorAll('input[type="checkbox"]').forEach(ck => {
            ck.addEventListener('change', calculateScore);
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

        // 1. Element Status (Faltante = Deduce valor del elemento)
        Object.keys(currentState.elements).forEach(id => {
            const elem = currentState.elements[id];
            if(elem.status === 'missing') {
                deductions += elem.baseValue;
            }
        });

        // 2. Element Technical Deductions
        document.querySelectorAll('input[data-type="elem"]:checked').forEach(ck => {
            deductions += parseFloat(ck.dataset.val);
        });

        // 3. Execution & Landing
        document.querySelectorAll('input[data-type="exec"]:checked, input[data-type="land"]:checked').forEach(ck => {
            deductions += parseFloat(ck.dataset.val);
        });

        // 4. Falls (0.50 ea)
        deductions += (currentState.falls * 0.50);

        // 5. Vault Specific
        if(currentState.apparatus === 'SALTO' && currentState.vaultRuns > 1) {
            // Empty runs: 1st is free, others -0.50
            deductions += (currentState.vaultRuns - 1) * 0.50;
        }

        // Final Calcs
        let final = startVal - deductions;
        if(final < 0) final = 0;

        currentState.totalDeductions = deductions;
        currentState.finalScore = final;

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
