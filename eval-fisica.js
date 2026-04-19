/**
 * EVAL-FISICA.JS
 * Módulo de evaluación de Preparación Física y Flexibilidad
 * Basado en: "Programa de Desarrollo GAF USAG — Rutinas Obligatorias 2021-2029"
 * Firebase Firestore — colección separada: "evaluaciones_fisicas"
 *
 * INTEGRACIÓN:
 *   - Se carga como módulo ES desde index.html
 *   - Expone window.openEvalFisica(gymnastId, gymnastName)
 *   - Guarda en Firestore colección "evaluaciones_fisicas"
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// ── Reutilizar la app Firebase ya inicializada por app.js ──────────────────
const firebaseConfig = {
  projectId: "gymcoachpro-c0c8e",
  appId: "1:923517600594:web:a81bdd1a150b7f22dcf08b",
  storageBucket: "gymcoachpro-c0c8e.firebasestorage.app",
  apiKey: "AIzaSyBbuRw3J7t_8xQc-6_qOqQDdjEEWZgSHaY",
  authDomain: "gymcoachpro-c0c8e.firebaseapp.com",
  messagingSenderId: "923517600594",
};
const fbApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const fisicaRef = collection(db, "evaluaciones_fisicas");

// ══════════════════════════════════════════════════════════════════════════
//  ESTRUCTURA DE TESTS — Fuente: Manual USAG Prep Física y Flexibilidad
// ══════════════════════════════════════════════════════════════════════════

const TESTS = {
  fuerza: {
    label: "💪 Preparación Física",
    color: "#3b82f6",
    secciones: [
      {
        id: "brazos",
        titulo: "Fuerza de Brazos",
        items: [
          {
            id: "estatica_barbilla",
            nombre: "Mantención estática en la barbilla",
            tipo: "tiempo",
            unidad: "seg",
            descripcion: "Colgada en barra, brazos flexionados con barbilla arriba sin tocar barra. Registrar tiempo de mantención.",
            niveles: [
              { label: "No logra", valor: "0" },
              { label: "1–5 seg", valor: "1-5" },
              { label: "6–10 seg", valor: "6-10" },
              { label: "11–20 seg", valor: "11-20" },
              { label: "+20 seg", valor: "+20" }
            ]
          },
          {
            id: "dominadas",
            nombre: "Dominadas",
            tipo: "repeticiones",
            unidad: "reps",
            descripcion: "Colgada en barra, toma invertida. Flexionar brazos hasta que barbilla quede paralela a la barra.",
            niveles: [
              { label: "0 reps", valor: "0" },
              { label: "1–2 reps", valor: "1-2" },
              { label: "3–5 reps", valor: "3-5" },
              { label: "6–8 reps", valor: "6-8" },
              { label: "+9 reps", valor: "+9" }
            ]
          },
          {
            id: "lagartijas",
            nombre: "Lagartijas",
            tipo: "nivel",
            descripcion: "Registrar la variante más avanzada que puede sostener con buena forma.",
            niveles: [
              { label: "No realiza", valor: "0" },
              { label: "Prep-1: manos en bloque", valor: "prep1" },
              { label: "Prep-2: manos y pies en piso", valor: "prep2" },
              { label: "Prep-3: pies en bloque elevado", valor: "prep3" }
            ]
          },
          {
            id: "escalada_cuerda",
            nombre: "Escalada de cuerda (marca 3.5 m)",
            tipo: "nivel",
            descripcion: "Subir mano a mano hasta la marca de 3.5 m. Registrar el nivel alcanzado.",
            niveles: [
              { label: "No logra subir", valor: "0" },
              { label: "Prep-1: sube desde parada", valor: "prep1" },
              { label: "Prep-2: sube desde sentada", valor: "prep2" },
              { label: "Prep-3: doble escalada", valor: "prep3" },
              { label: "Toca los 3.5 m", valor: "completo" }
            ]
          }
        ]
      },
      {
        id: "abdominales",
        titulo: "Fuerza Abdominal",
        items: [
          {
            id: "levant_rodillas",
            nombre: "Levantamientos con rodillas flexionadas",
            tipo: "repeticiones",
            unidad: "reps",
            descripcion: "Colgada en barra, traer rodillas sobre la horizontal con pies en punta.",
            niveles: [
              { label: "0 reps", valor: "0" },
              { label: "1–5 reps", valor: "1-5" },
              { label: "6–10 reps", valor: "6-10" },
              { label: "11–15 reps", valor: "11-15" },
              { label: "+16 reps", valor: "+16" }
            ]
          },
          {
            id: "levant_piernas",
            nombre: "Levantamientos de piernas (dedos a barra)",
            tipo: "repeticiones",
            unidad: "reps",
            descripcion: "Colgada en barra, levantar piernas hasta que dedos de pies toquen la barra.",
            niveles: [
              { label: "0 reps", valor: "0" },
              { label: "1–3 reps", valor: "1-3" },
              { label: "4–7 reps", valor: "4-7" },
              { label: "8–12 reps", valor: "8-12" },
              { label: "+13 reps", valor: "+13" }
            ]
          },
          {
            id: "cuerpo_ahuecado",
            nombre: "Mantención cuerpo ahuecado",
            tipo: "nivel",
            descripcion: "Registrar la variante más avanzada sostenida al menos 30 segundos.",
            niveles: [
              { label: "No logra", valor: "0" },
              { label: "Prep-1: manos en muslos, rodillas flex.", valor: "prep1" },
              { label: "Prep-2: manos en muslos, piernas ext.", valor: "prep2" },
              { label: "Prep-3: brazos cruzados en pecho", valor: "prep3" },
              { label: "Prep-4: brazos extendidos arriba", valor: "prep4" }
            ]
          }
        ]
      },
      {
        id: "piernas",
        titulo: "Fuerza de Piernas",
        items: [
          {
            id: "carrera_18m",
            nombre: "Carrera de 18 m",
            tipo: "tiempo",
            unidad: "seg",
            descripcion: "Correr 18 m en línea recta. Meta USAG Nivel 3: 4.0 seg o menos.",
            meta: "≤ 4.0 seg (Nivel 3)",
            niveles: [
              { label: "No cronometrado", valor: "nc" },
              { label: "+6.0 seg", valor: "+6.0" },
              { label: "5.1–6.0 seg", valor: "5.1-6.0" },
              { label: "4.1–5.0 seg", valor: "4.1-5.0" },
              { label: "≤ 4.0 seg ✓", valor: "<=4.0" }
            ]
          },
          {
            id: "vela_salto",
            nombre: "Vela a salto extendido",
            tipo: "repeticiones",
            unidad: "reps",
            descripcion: "Desde parado: cuclillas → vela → agrupado de pie → salto extendido. Registrar repeticiones seguidas.",
            niveles: [
              { label: "0 reps", valor: "0" },
              { label: "1–3 reps", valor: "1-3" },
              { label: "4–6 reps", valor: "4-6" },
              { label: "7–10 reps", valor: "7-10" },
              { label: "+11 reps", valor: "+11" }
            ]
          }
        ]
      }
    ]
  },

  flexibilidad: {
    label: "🤸 Flexibilidad",
    color: "#10b981",
    secciones: [
      {
        id: "piernas_flex",
        titulo: "Flexibilidad de Piernas",
        items: [
          {
            id: "isquiotibiales",
            nombre: "Estiramiento de isquiotibiales",
            tipo: "nivel",
            descripcion: "Sentada con pies contra la pared, inclinarse hacia adelante con espalda plana. Meta Nivel 3: variante E.",
            meta: "Variante E (Nivel 3)",
            niveles: [
              { label: "A — dedos a pared", valor: "A" },
              { label: "B — nudillos a pared", valor: "B" },
              { label: "C — palmas a pared", valor: "C" },
              { label: "D — pecho a muslos", valor: "D" },
              { label: "E — palmas + pecho a muslos ✓", valor: "E" }
            ]
          },
          {
            id: "split_frente",
            nombre: "Split al frente (mejor pierna)",
            tipo: "nivel",
            descripcion: "Deslizar pierna hacia adelante en split. Meta Nivel 3: mínimo 150°.",
            meta: "Mínimo 150° (Nivel 3)",
            niveles: [
              { label: "Menos de 90°", valor: "<90" },
              { label: "90°–119°", valor: "90-119" },
              { label: "120°–149°", valor: "120-149" },
              { label: "150°–179° ✓", valor: "150-179" },
              { label: "180° completo ✓✓", valor: "180" }
            ]
          },
          {
            id: "split_lado",
            nombre: "Split lateral / Squat (apertura)",
            tipo: "nivel",
            descripcion: "Separación de piernas lateralmente. Meta Nivel 3: mínimo 150°.",
            meta: "Mínimo 150° (Nivel 3)",
            niveles: [
              { label: "Menos de 45°", valor: "<45" },
              { label: "45°–89°", valor: "45-89" },
              { label: "90°–119°", valor: "90-119" },
              { label: "120°–149°", valor: "120-149" },
              { label: "150° o más ✓", valor: ">=150" }
            ]
          }
        ]
      },
      {
        id: "hombros_flex",
        titulo: "Flexibilidad de Hombros",
        items: [
          {
            id: "palo_hombros",
            nombre: "Elevación de palo (flexibilidad de hombros)",
            tipo: "nivel",
            descripcion: "Acostada boca abajo, levantar palo con pulgares juntos y muñecas rectas. Meta Nivel 3: 25 cm del suelo.",
            meta: "25 cm del suelo (Nivel 3)",
            niveles: [
              { label: "No logra despegar del suelo", valor: "0" },
              { label: "1–4 cm", valor: "1-4" },
              { label: "5–14 cm", valor: "5-14" },
              { label: "15–24 cm", valor: "15-24" },
              { label: "25 cm o más ✓", valor: ">=25" }
            ]
          }
        ]
      },
      {
        id: "espalda_flex",
        titulo: "Flexibilidad de Espalda",
        items: [
          {
            id: "puente",
            nombre: "Puente / Arco de espalda",
            tipo: "nivel",
            descripcion: "Desde acostada boca arriba, empujar para llegar a posición de arco. Meta: variante E (hombros pasando las manos).",
            meta: "Variante E (Nivel 3)",
            niveles: [
              { label: "A — cabeza fuera del suelo", valor: "A" },
              { label: "B — brazos completamente extendidos", valor: "B" },
              { label: "C — hombros sobre las manos", valor: "C" },
              { label: "D — hombros pasan las manos", valor: "D" },
              { label: "E — brazos y piernas extendidos ✓", valor: "E" }
            ]
          }
        ]
      }
    ]
  }
};

// ══════════════════════════════════════════════════════════════════════════
//  ESTADO DEL MODAL
// ══════════════════════════════════════════════════════════════════════════
let currentGymnast = { id: null, name: '' };
let currentTab = 'fuerza';
let formValues = {};
let historial = [];

// ══════════════════════════════════════════════════════════════════════════
//  INYECTAR ESTILOS Y MODAL AL DOM
// ══════════════════════════════════════════════════════════════════════════
function injectUI() {
  if (document.getElementById('ef-modal-overlay')) return;

  // ── Estilos ────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* ── Overlay ── */
    #ef-modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.65);
      z-index: 3000;
      align-items: center;
      justify-content: center;
      padding: 12px;
    }
    #ef-modal-overlay.ef-active { display: flex; }

    /* ── Modal container ── */
    #ef-modal {
      background: #0f172a;
      border-radius: 16px;
      width: 100%;
      max-width: 680px;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6);
      font-family: 'Inter', sans-serif;
      color: #e2e8f0;
    }

    /* ── Header ── */
    #ef-header {
      background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
      padding: 16px 20px 12px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      flex-shrink: 0;
    }
    #ef-header h2 {
      margin: 0 0 2px;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.01em;
    }
    #ef-header p {
      margin: 0;
      font-size: 12px;
      color: #94a3b8;
    }
    #ef-close-btn {
      position: absolute;
      top: 12px;
      right: 14px;
      background: rgba(255,255,255,0.08);
      border: none;
      color: #94a3b8;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #ef-close-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }

    /* ── Tabs ── */
    #ef-tabs {
      display: flex;
      background: #0f172a;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      flex-shrink: 0;
    }
    .ef-tab {
      flex: 1;
      padding: 10px 8px;
      background: none;
      border: none;
      color: #64748b;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
      letter-spacing: 0.01em;
    }
    .ef-tab.ef-tab-active {
      color: #60a5fa;
      border-bottom-color: #60a5fa;
    }
    .ef-tab:hover:not(.ef-tab-active) { color: #94a3b8; }

    /* ── Body ── */
    #ef-body {
      overflow-y: auto;
      flex: 1;
      padding: 16px;
      scroll-behavior: smooth;
    }
    #ef-body::-webkit-scrollbar { width: 4px; }
    #ef-body::-webkit-scrollbar-track { background: transparent; }
    #ef-body::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

    /* ── Sección ── */
    .ef-seccion {
      margin-bottom: 20px;
    }
    .ef-seccion-titulo {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    /* ── Item de test ── */
    .ef-item {
      background: #1e293b;
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 8px;
      border: 1px solid rgba(255,255,255,0.05);
      transition: border-color 0.2s;
    }
    .ef-item:has(.ef-chip.ef-chip-sel) {
      border-color: rgba(96,165,250,0.25);
    }
    .ef-item-nombre {
      font-size: 13px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 3px;
    }
    .ef-item-desc {
      font-size: 11px;
      color: #64748b;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    .ef-item-meta {
      display: inline-block;
      font-size: 10px;
      background: rgba(16,185,129,0.12);
      color: #34d399;
      border-radius: 4px;
      padding: 2px 6px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    /* ── Chips de nivel ── */
    .ef-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .ef-chip {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 500;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .ef-chip:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
    .ef-chip.ef-chip-sel {
      background: #1d4ed8;
      border-color: #3b82f6;
      color: #fff;
    }
    .ef-chip.ef-chip-sel[data-val*="✓"],
    .ef-chip.ef-chip-sel[data-val="completo"],
    .ef-chip.ef-chip-sel[data-val="<=4.0"],
    .ef-chip.ef-chip-sel[data-val=">=150"],
    .ef-chip.ef-chip-sel[data-val=">=25"],
    .ef-chip.ef-chip-sel[data-val="180"],
    .ef-chip.ef-chip-sel[data-val="E"] {
      background: #065f46;
      border-color: #10b981;
    }

    /* ── Observaciones ── */
    .ef-obs-label {
      font-size: 11px;
      color: #475569;
      margin-top: 8px;
      margin-bottom: 3px;
      display: block;
    }
    .ef-obs-input {
      width: 100%;
      background: #0f172a;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px;
      color: #94a3b8;
      font-size: 11px;
      padding: 6px 8px;
      resize: none;
      box-sizing: border-box;
      font-family: inherit;
    }
    .ef-obs-input:focus {
      outline: none;
      border-color: rgba(96,165,250,0.3);
      color: #e2e8f0;
    }

    /* ── Historial ── */
    #ef-historial-area {
      background: #0f172a;
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 10px 16px;
      flex-shrink: 0;
      max-height: 110px;
      overflow-y: auto;
    }
    .ef-hist-titulo {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 6px;
    }
    .ef-hist-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: #64748b;
      padding: 3px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .ef-hist-fecha { color: #3b82f6; font-weight: 600; min-width: 70px; }
    .ef-hist-resumen { color: #94a3b8; flex: 1; }
    .ef-hist-btn {
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.2);
      color: #60a5fa;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 10px;
      cursor: pointer;
    }

    /* ── Footer ── */
    #ef-footer {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid rgba(255,255,255,0.07);
      flex-shrink: 0;
      background: #0f172a;
    }
    #ef-btn-save {
      flex: 1;
      background: #1d4ed8;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    #ef-btn-save:hover { background: #2563eb; }
    #ef-btn-save:disabled { background: #334155; color: #64748b; cursor: not-allowed; }
    #ef-btn-cancel {
      background: rgba(255,255,255,0.05);
      color: #94a3b8;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 13px;
      cursor: pointer;
    }
    #ef-btn-cancel:hover { background: rgba(255,255,255,0.08); }

    /* ── Toast ── */
    #ef-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(60px);
      background: #1e293b;
      color: #e2e8f0;
      border-radius: 8px;
      padding: 10px 18px;
      font-size: 13px;
      font-weight: 500;
      z-index: 4000;
      transition: transform 0.3s;
      border: 1px solid rgba(255,255,255,0.1);
      pointer-events: none;
    }
    #ef-toast.ef-toast-show { transform: translateX(-50%) translateY(0); }
    #ef-toast.ef-toast-ok { border-color: rgba(16,185,129,0.4); color: #34d399; }
    #ef-toast.ef-toast-err { border-color: rgba(239,68,68,0.4); color: #f87171; }

    /* ── Progreso visual ── */
    .ef-progreso-bar {
      height: 3px;
      background: rgba(255,255,255,0.06);
      border-radius: 2px;
      margin-top: 10px;
      overflow: hidden;
    }
    .ef-progreso-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #10b981);
      border-radius: 2px;
      transition: width 0.4s ease;
    }
    .ef-progreso-texto {
      font-size: 10px;
      color: #475569;
      text-align: right;
      margin-top: 3px;
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      #ef-modal { border-radius: 12px 12px 0 0; max-height: 96vh; }
      #ef-modal-overlay { align-items: flex-end; padding: 0; }
      .ef-chip { font-size: 10px; padding: 3px 8px; }
    }
  `;
  document.head.appendChild(style);

  // ── HTML del modal ─────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'ef-modal-overlay';
  overlay.innerHTML = `
    <div id="ef-modal">
      <div id="ef-header" style="position:relative">
        <h2 id="ef-gymnast-title">Evaluación Física</h2>
        <p id="ef-gymnast-sub">Preparación física y flexibilidad</p>
        <button id="ef-close-btn" aria-label="Cerrar">✕</button>
        <div class="ef-progreso-bar"><div class="ef-progreso-fill" id="ef-progreso-fill" style="width:0%"></div></div>
        <div class="ef-progreso-texto" id="ef-progreso-texto">0 de 0 ítems completados</div>
      </div>

      <div id="ef-tabs">
        <button class="ef-tab ef-tab-active" data-tab="fuerza">💪 Fuerza</button>
        <button class="ef-tab" data-tab="flexibilidad">🤸 Flexibilidad</button>
      </div>

      <div id="ef-body">
        <!-- Se renderiza dinámicamente -->
      </div>

      <div id="ef-historial-area" style="display:none">
        <div class="ef-hist-titulo">📅 Evaluaciones anteriores</div>
        <div id="ef-historial-list"></div>
      </div>

      <div id="ef-footer">
        <button id="ef-btn-cancel">Cerrar</button>
        <button id="ef-btn-save">💾 Guardar evaluación</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // ── Toast ──────────────────────────────────────────────────────────────
  const toast = document.createElement('div');
  toast.id = 'ef-toast';
  document.body.appendChild(toast);

  // ── Event listeners ────────────────────────────────────────────────────
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeEvalFisica();
  });
  document.getElementById('ef-close-btn').addEventListener('click', closeEvalFisica);
  document.getElementById('ef-btn-cancel').addEventListener('click', closeEvalFisica);
  document.getElementById('ef-btn-save').addEventListener('click', saveEvalFisica);

  document.querySelectorAll('.ef-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      document.querySelectorAll('.ef-tab').forEach(t => t.classList.remove('ef-tab-active'));
      btn.classList.add('ef-tab-active');
      renderTab();
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════
//  RENDER DEL TAB ACTIVO
// ══════════════════════════════════════════════════════════════════════════
function renderTab() {
  const body = document.getElementById('ef-body');
  const data = TESTS[currentTab];
  if (!data) return;

  let html = '';
  data.secciones.forEach(sec => {
    html += `<div class="ef-seccion">
      <div class="ef-seccion-titulo">${sec.titulo}</div>`;

    sec.items.forEach(item => {
      const key = `${currentTab}__${sec.id}__${item.id}`;
      const val = formValues[key] || null;

      html += `<div class="ef-item">
        <div class="ef-item-nombre">${item.nombre}</div>
        <div class="ef-item-desc">${item.descripcion}</div>
        ${item.meta ? `<div class="ef-item-meta">🎯 Meta: ${item.meta}</div>` : ''}
        <div class="ef-chips">`;

      item.niveles.forEach(niv => {
        const sel = val === niv.valor ? 'ef-chip-sel' : '';
        html += `<button class="ef-chip ${sel}" data-key="${key}" data-val="${niv.valor}">${niv.label}</button>`;
      });

      html += `</div>`;

      // Campo de observaciones por ítem
      const obsKey = `obs__${key}`;
      const obsVal = formValues[obsKey] || '';
      html += `
        <span class="ef-obs-label">Observaciones</span>
        <textarea class="ef-obs-input" rows="1" data-obs-key="${obsKey}" placeholder="Notas del evaluador...">${obsVal}</textarea>
      </div>`;
    });

    html += `</div>`;
  });

  body.innerHTML = html;

  // Listeners chips
  body.querySelectorAll('.ef-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.key;
      const val = chip.dataset.val;
      const wasSelected = chip.classList.contains('ef-chip-sel');

      // Deseleccionar todos los chips del mismo key
      body.querySelectorAll(`.ef-chip[data-key="${key}"]`).forEach(c => c.classList.remove('ef-chip-sel'));

      if (!wasSelected) {
        chip.classList.add('ef-chip-sel');
        formValues[key] = val;
      } else {
        delete formValues[key];
      }

      updateProgreso();
    });
  });

  // Listeners observaciones
  body.querySelectorAll('.ef-obs-input').forEach(ta => {
    ta.addEventListener('input', () => {
      formValues[ta.dataset.obsKey] = ta.value;
    });
  });

  updateProgreso();
}

// ══════════════════════════════════════════════════════════════════════════
//  BARRA DE PROGRESO
// ══════════════════════════════════════════════════════════════════════════
function updateProgreso() {
  let total = 0;
  let completados = 0;

  ['fuerza', 'flexibilidad'].forEach(tab => {
    TESTS[tab].secciones.forEach(sec => {
      sec.items.forEach(item => {
        total++;
        const key = `${tab}__${sec.id}__${item.id}`;
        if (formValues[key]) completados++;
      });
    });
  });

  const pct = total > 0 ? Math.round((completados / total) * 100) : 0;
  document.getElementById('ef-progreso-fill').style.width = pct + '%';
  document.getElementById('ef-progreso-texto').textContent = `${completados} de ${total} ítems completados`;
}

// ══════════════════════════════════════════════════════════════════════════
//  CARGAR HISTORIAL DESDE FIREBASE
// ══════════════════════════════════════════════════════════════════════════
async function loadHistorial(gymnastId) {
  try {
    const q = query(
      fisicaRef,
      where('gymnastId', '==', gymnastId),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    const snap = await getDocs(q);
    historial = [];
    snap.forEach(d => historial.push({ id: d.id, ...d.data() }));

    const area = document.getElementById('ef-historial-area');
    const list = document.getElementById('ef-historial-list');

    if (historial.length === 0) {
      area.style.display = 'none';
      return;
    }

    area.style.display = 'block';
    list.innerHTML = historial.map(h => {
      const fecha = h.timestamp?.toDate
        ? h.timestamp.toDate().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })
        : '—';
      const completados = Object.keys(h.valores || {}).filter(k => !k.startsWith('obs__')).length;
      return `<div class="ef-hist-item">
        <span class="ef-hist-fecha">${fecha}</span>
        <span class="ef-hist-resumen">${completados} ítems evaluados</span>
        <button class="ef-hist-btn" data-hid="${h.id}">Ver</button>
      </div>`;
    }).join('');

    // Cargar evaluación anterior al click
    list.querySelectorAll('.ef-hist-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const reg = historial.find(h => h.id === btn.dataset.hid);
        if (reg) {
          formValues = { ...reg.valores };
          renderTab();
          showToast('📋 Evaluación anterior cargada', 'ok');
        }
      });
    });
  } catch (e) {
    console.warn('No se pudo cargar historial:', e.message);
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  GUARDAR EN FIREBASE
// ══════════════════════════════════════════════════════════════════════════
async function saveEvalFisica() {
  const btn = document.getElementById('ef-btn-save');
  btn.disabled = true;
  btn.textContent = '⏳ Guardando...';

  try {
    const completados = Object.keys(formValues).filter(k => !k.startsWith('obs__')).length;
    if (completados === 0) {
      showToast('⚠️ Completá al menos un ítem antes de guardar', 'err');
      btn.disabled = false;
      btn.textContent = '💾 Guardar evaluación';
      return;
    }

    await addDoc(fisicaRef, {
      gymnastId: currentGymnast.id,
      gymnastName: currentGymnast.name,
      valores: { ...formValues },
      completados,
      timestamp: serverTimestamp()
    });

    showToast('✅ Evaluación guardada en la nube', 'ok');
    await loadHistorial(currentGymnast.id);
  } catch (e) {
    console.error('Error guardando evaluación física:', e);
    showToast('❌ Error al guardar: ' + e.message, 'err');
  } finally {
    btn.disabled = false;
    btn.textContent = '💾 Guardar evaluación';
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  ABRIR / CERRAR MODAL
// ══════════════════════════════════════════════════════════════════════════
function openEvalFisica(gymnastId, gymnastName) {
  injectUI();

  currentGymnast = { id: gymnastId, name: gymnastName };
  currentTab = 'fuerza';
  formValues = {};

  document.getElementById('ef-gymnast-title').textContent = `Evaluación Física — ${gymnastName}`;
  document.getElementById('ef-gymnast-sub').textContent = 'Preparación física · Flexibilidad · USAG';

  // Reset tabs
  document.querySelectorAll('.ef-tab').forEach(t => t.classList.remove('ef-tab-active'));
  document.querySelector('.ef-tab[data-tab="fuerza"]').classList.add('ef-tab-active');

  renderTab();
  document.getElementById('ef-modal-overlay').classList.add('ef-active');
  document.body.style.overflow = 'hidden';

  // Cargar historial async
  loadHistorial(gymnastId);
}

function closeEvalFisica() {
  const overlay = document.getElementById('ef-modal-overlay');
  if (overlay) overlay.classList.remove('ef-active');
  document.body.style.overflow = '';
}

// ══════════════════════════════════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════════════════════════════════
function showToast(msg, tipo = '') {
  const t = document.getElementById('ef-toast');
  t.textContent = msg;
  t.className = 'ef-toast-show' + (tipo === 'ok' ? ' ef-toast-ok' : tipo === 'err' ? ' ef-toast-err' : '');
  setTimeout(() => { t.className = ''; }, 3000);
}

// ══════════════════════════════════════════════════════════════════════════
//  EXPORTAR AL WINDOW
// ══════════════════════════════════════════════════════════════════════════
window.openEvalFisica = openEvalFisica;
window.closeEvalFisica = closeEvalFisica;
