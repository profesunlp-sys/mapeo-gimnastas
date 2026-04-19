// =====================================================
// APP.JS — Lógica principal de la planilla de mapeo
//          Responsive: card view (mobile) + table (desktop)
//          Firebase Firestore para guardado en la nube
//          v3: ordenamiento por columna + columna evaluación física
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, limit, getDocs }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
const gimnastasRef = collection(db, "gimnastas_mapeo");
const fisicaRef    = collection(db, "evaluaciones_fisicas");

let gymnasts = [];
let editingId = null;
let formState = {};

// ─── ORDENAMIENTO ──────────────────────────────────
// sortCol: clave de columna activa | sortDir: 'asc' | 'desc'
let sortCol = null;
let sortDir = 'asc';

// Cache de última evaluación física por gymnast id
// { [gymnastId]: { fecha: Date, fechaStr: string } }
let evalFisicaCache = {};

// ─── EXPORT TO WINDOW ──────────────────────────────
window.openModal              = openModal;
window.closeModal             = closeModal;
window.closeModalOnOverlay    = closeModalOnOverlay;
window.setToggle              = setToggle;
window.setSeg                 = setSeg;
window.calcAttendance         = calcAttendance;
window.renderElements         = renderElements;
window.setElemState           = setElemState;
window.saveGymnast            = saveGymnast;
window.deleteGymnast          = deleteGymnast;
window.exportExcel            = exportExcel;
window.exportCSV              = exportCSV;
window.renderView             = renderView;
window.onGroupChange          = onGroupChange;
window.openEvalFisicaFromModal = openEvalFisicaFromModal;
window.sortByCol              = sortByCol;

// ─── ORDENAMIENTO ──────────────────────────────────
function sortByCol(col) {
  if (sortCol === col) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortCol = col;
    sortDir = 'asc';
  }
  renderView();
  updateSortIndicators();
}

function updateSortIndicators() {
  document.querySelectorAll('#mainTable thead th[data-col]').forEach(th => {
    const col = th.dataset.col;
    th.classList.remove('sort-asc', 'sort-desc');
    if (col === sortCol) {
      th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
    }
  });
}

// Valor de ordenamiento para cada columna
function getSortValue(g, col) {
  switch(col) {
    case 'name':
      return (g.name || '').toLowerCase();
    case 'level': {
      const orden = ['Principiante','E1B','E1A','E2','E3','USAG1B','USAG1A','USAG2','USAG3','Recreativo'];
      const idx = orden.indexOf(g.level);
      return idx >= 0 ? idx : 99;
    }
    case 'years':
      return parseFloat(g.years) || 0;
    case 'group':
      return (g.days || '').toLowerCase();
    case 'asistencia': {
      const att = calcAtt(g.totalClases, g.asistio);
      return att === '—' ? -1 : parseInt(att);
    }
    case 'comprende': {
      const orden = { 'si': 0, 'parcial': 1, 'no': 2, null: 3, undefined: 3 };
      return orden[g.comprende] ?? 3;
    }
    case 'incorpora': {
      const orden = { 'si': 0, 'parcial': 1, 'no': 2, null: 3, undefined: 3 };
      return orden[g.incorpora] ?? 3;
    }
    case 'predisposicion':
      return parseInt(g.predisposicion) || 99;
    case 'flex': {
      const orden = { 'Alta': 0, 'Media': 1, 'Baja': 2, null: 3, undefined: 3 };
      return orden[g.flex] ?? 3;
    }
    case 'fuerza': {
      const orden = { 'Alta': 0, 'Media': 1, 'Baja': 2, null: 3, undefined: 3 };
      return orden[g.fuerzaBrazos] ?? 3;
    }
    case 'evaluacion': {
      const cache = evalFisicaCache[g.id];
      return cache ? cache.fecha.getTime() : 0;
    }
    default:
      return 0;
  }
}

function applySort(list) {
  if (!sortCol) return list;
  return [...list].sort((a, b) => {
    const va = getSortValue(a, sortCol);
    const vb = getSortValue(b, sortCol);
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

// ─── CACHE DE EVALUACIONES FÍSICAS ─────────────────
async function loadEvalFisicaCache() {
  try {
    // Traer todas las evaluaciones físicas y quedarse con la más reciente por gymnast
    const snap = await getDocs(fisicaRef);
    const mapa = {};
    snap.forEach(d => {
      const data = d.data();
      const gid = data.gymnastId;
      if (!gid) return;
      const ts = data.timestamp?.toDate ? data.timestamp.toDate() : null;
      if (!ts) return;
      if (!mapa[gid] || ts > mapa[gid].fecha) {
        mapa[gid] = {
          fecha: ts,
          fechaStr: ts.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })
        };
      }
    });
    evalFisicaCache = mapa;
    // Re-render para mostrar las fechas
    renderView();
  } catch(e) {
    console.warn('No se pudo cargar cache de evaluaciones físicas:', e.message);
  }
}

// Actualizar cache de una gimnasta específica (tras guardar evaluación)
window.refreshEvalFisicaCache = async function(gymnastId) {
  try {
    const q = query(fisicaRef, where('gymnastId','==', gymnastId), orderBy('timestamp','desc'), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const data = snap.docs[0].data();
      const ts = data.timestamp?.toDate ? data.timestamp.toDate() : null;
      if (ts) {
        evalFisicaCache[gymnastId] = {
          fecha: ts,
          fechaStr: ts.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })
        };
        renderView();
      }
    }
  } catch(e) {
    console.warn('No se pudo refrescar cache:', e.message);
  }
};

// ─── POBLAR FILTROS ────────────────────────────────
function populateFilters() {
  const filterLevel = document.getElementById('filterLevel');
  if (filterLevel) {
    filterLevel.innerHTML = `
      <option value="">Todos los niveles</option>
      <option value="Principiante">Principiante</option>
      <option value="E1B">E1B</option>
      <option value="E1A">E1A</option>
      <option value="E2">E2</option>
      <option value="E3">E3</option>
      <option value="USAG1B">USAG 1B</option>
      <option value="USAG1A">USAG 1A</option>
      <option value="USAG2">USAG 2</option>
      <option value="USAG3">USAG 3</option>
      <option value="Recreativo">Recreativo</option>
    `;
  }
  const fg = document.getElementById('filterGroup');
  if (fg) {
    fg.innerHTML = '<option value="">Todos los Grupos / Profesores</option>';
    let currentDays = '';
    let optgroup = null;
    window.CLUB_GROUPS.forEach(gr => {
      if (gr.days !== currentDays) {
        if (optgroup) fg.appendChild(optgroup);
        optgroup = document.createElement('optgroup');
        optgroup.label = '📅 ' + gr.days;
        currentDays = gr.days;
      }
      const opt = document.createElement('option');
      opt.value = gr.id;
      const detail = gr.levelDetail ? ` (${gr.levelDetail})` : '';
      opt.textContent = `${gr.teacher} — ${gr.age}${detail}`;
      optgroup.appendChild(opt);
    });
    if (optgroup) fg.appendChild(optgroup);
  }
}

function populateFormGroup() {
  const fGroupSelect = document.getElementById('fGroup');
  if (!fGroupSelect) return;
  fGroupSelect.innerHTML = '<option value="">— Seleccionar Grupo —</option>';
  let currentDays = '';
  let optgroup = null;
  window.CLUB_GROUPS.forEach(gr => {
    if (gr.days !== currentDays) {
      if (optgroup) fGroupSelect.appendChild(optgroup);
      optgroup = document.createElement('optgroup');
      optgroup.label = gr.days;
      currentDays = gr.days;
    }
    const opt = document.createElement('option');
    opt.value = gr.id;
    opt.textContent = `${gr.time} | ${gr.teacher} | ${gr.age} ${gr.levelDetail ? '('+gr.levelDetail+')' : ''}`;
    optgroup.appendChild(opt);
  });
  if (optgroup) fGroupSelect.appendChild(optgroup);
}

// ─── INIT ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('evalDate').value = today;
  const saved = localStorage.getItem('teacherName');
  if (saved) document.getElementById('teacherName').value = saved;
  document.getElementById('teacherName').addEventListener('input', e => {
    localStorage.setItem('teacherName', e.target.value);
  });

  const toast = document.createElement('div');
  toast.id = 'toast';
  document.body.appendChild(toast);

  updateFABVisibility();
  window.addEventListener('resize', updateFABVisibility);

  populateFilters();

  // Cargar cache de evaluaciones físicas
  loadEvalFisicaCache();

  onSnapshot(gimnastasRef, (snapshot) => {
    gymnasts = [];
    snapshot.forEach((docSnapshot) => {
      gymnasts.push({ id: docSnapshot.id, ...docSnapshot.data() });
    });
    gymnasts.sort((a,b) => (a.name || '').localeCompare(b.name || ''));
    renderView();
    updateStats();
  }, (error) => {
    console.error("Error cargando de Firebase: ", error);
    showToast("Error de conexión al cargar", true);
  });
});

function updateFABVisibility() {
  const fab = document.getElementById('fabAdd');
  const btnAdd = document.getElementById('btnAdd');
  if (!fab) return;
  if (window.innerWidth < 640) {
    fab.style.display = 'flex';
    btnAdd.style.display = 'none';
  } else {
    fab.style.display = 'none';
    btnAdd.style.display = '';
  }
}

// ─── FILTER ────────────────────────────────────────
function getFiltered() {
  const fl = document.getElementById('filterLevel').value;
  const fp = document.getElementById('filterPred').value;
  const fg = document.getElementById('filterGroup').value;
  const fn = document.getElementById('filterName').value.toLowerCase();
  return gymnasts.filter(g => {
    if (fl && g.level !== fl) return false;
    if (fp && g.predisposicion !== fp) return false;
    if (fg && g.groupId !== fg) return false;
    if (fn && !g.name.toLowerCase().includes(fn)) return false;
    return true;
  });
}

// ─── RENDER ────────────────────────────────────────
function renderView() {
  const filtered = applySort(getFiltered());
  const empty = document.getElementById('emptyState');

  document.getElementById('countLabel').textContent =
    gymnasts.length > 0 && filtered.length !== gymnasts.length
      ? `Mostrando ${filtered.length} de ${gymnasts.length} gimnastas`
      : gymnasts.length > 0 ? `${gymnasts.length} gimnasta${gymnasts.length !== 1 ? 's' : ''}` : '';

  if (gymnasts.length === 0) {
    empty.style.display = 'block';
    renderCards([]);
    renderTable([]);
    return;
  }
  empty.style.display = 'none';
  renderCards(filtered);
  renderTable(filtered);
  updateSortIndicators();
}

// ─── CARDS ─────────────────────────────────────────
function renderCards(filtered) {
  const container = document.getElementById('cardsList');
  if (filtered.length === 0) {
    container.innerHTML = gymnasts.length > 0
      ? `<div class="empty-state" style="padding:30px 0"><p>Ningún resultado para los filtros aplicados.</p></div>` : '';
    return;
  }
  container.innerHTML = filtered.map((g, i) => {
    const att = calcAtt(g.totalClases, g.asistio);
    const attClass = att === '—' ? '' : parseInt(att) >= 80 ? 'att-high' : parseInt(att) >= 60 ? 'att-mid' : 'att-low';
    const lvlData = LEVEL_DATA[g.level];
    const lvlLabel = lvlData ? lvlData.label : (g.level || 'Sin nivel');
    const pred = PRED_LABELS[g.predisposicion];
    const gr = window.CLUB_GROUPS.find(gr => gr.id === g.groupId) || null;
    const groupText = gr ? `${gr.days} (${gr.teacher})` : (g.days ? `${g.days}/sem` : '—');
    const safeName = (g.name || '').replace(/'/g, '');
    const evalCache = evalFisicaCache[g.id];
    const evalTexto = evalCache ? `📅 ${evalCache.fechaStr}` : 'Sin evaluar';
    const evalColor = evalCache ? '#10b981' : '#6b7280';

    return `<div class="gymnast-card">
      <div class="card-top">
        <div>
          <span class="card-num">#${i + 1}</span>
          <span class="card-name">${esc(g.name) || '<span class="dash">Sin nombre</span>'}</span>
        </div>
      </div>
      <div class="card-badges">
        <span class="lvl-badge badge-${g.level || 'Principiante'}">${esc(lvlLabel)}</span>
        ${pred ? `<span class="pred-mini ${pred.cls}">${pred.text}</span>` : ''}
        <span style="font-size:10px; color:${evalColor}; margin-left:4px;">🏋️ ${evalTexto}</span>
      </div>
      <div class="card-stats">
        <div class="card-stat">
          <span class="card-stat-label">Años</span>
          <span class="card-stat-val">${g.years !== '' && g.years !== undefined ? g.years : '—'}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">Grupo/Días</span>
          <span class="card-stat-val" style="font-size:0.75rem">${groupText}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">Asistencia</span>
          <span class="card-stat-val ${attClass}">${att !== '—' ? att + '%' : '—'}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">Comprende</span>
          <span class="card-stat-val">${boolDisplayText(g.comprende)}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">Incorpora</span>
          <span class="card-stat-val">${boolDisplayText(g.incorpora)}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">Flexib.</span>
          <span class="card-stat-val">${physDisplayText(g.flex)}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn-edit-card" onclick="openModal('${g.id}')">✏ Editar</button>
        <button class="btn-edit-card"
          onclick="openEvalFisica('${g.id}','${safeName}')"
          style="background:#1e3a5f; margin-left:6px; flex:0; padding:8px 12px;"
          title="Evaluación Física">🏋️ Físico</button>
      </div>
    </div>`;
  }).join('');
}

function boolDisplayText(v) {
  if (!v) return '<span class="dash">—</span>';
  if (v === 'si') return '<span class="bool-yes">✓ Sí</span>';
  if (v === 'parcial') return '<span class="bool-parcial">~ Parc</span>';
  if (v === 'no') return '<span class="bool-no">✗ No</span>';
  return '<span class="dash">—</span>';
}
function physDisplayText(v) {
  if (!v) return '<span class="dash">—</span>';
  return `<span class="phys-mini phys-${v}">${v}</span>`;
}

// ─── TABLE ─────────────────────────────────────────
function renderTable(filtered) {
  const tbody = document.getElementById('tableBody');
  if (!filtered || filtered.length === 0) { tbody.innerHTML = ''; return; }

  tbody.innerHTML = filtered.map((g, i) => {
    const att = calcAtt(g.totalClases, g.asistio);
    const lvlData = LEVEL_DATA[g.level];
    const lvlLabel = lvlData ? lvlData.label : (g.level || '—');
    const pred = PRED_LABELS[g.predisposicion];
    const safeName = (g.name || '').replace(/'/g, '');
    const evalCache = evalFisicaCache[g.id];

    let attHtml = '<span class="dash">—</span>';
    if (att !== '—') {
      const attVal = parseInt(att);
      const color = attVal >= 90 ? '#10b981' : attVal >= 70 ? '#f59e0b' : '#ef4444';
      attHtml = `
        <div class="att-progress-cell">
          <div class="att-bar">
            <div class="att-fill" style="width:${attVal}%;background:${color}"></div>
          </div>
          <div class="att-labels">
            <span class="att-details">${g.asistio}/${g.totalClases} clases</span>
            <span class="att-pct" style="color:${color}"><strong>${attVal}%</strong></span>
          </div>
        </div>`;
    }

    const gr = window.CLUB_GROUPS.find(gr => gr.id === g.groupId) || null;
    const groupText = gr
      ? `${gr.days}<br><span style="color:var(--text3);font-size:0.75rem">${gr.teacher}</span>`
      : (g.days ? `${g.days}/sem` : '<span class="dash">—</span>');

    // Celda de evaluación física
    let evalHtml;
    if (evalCache) {
      evalHtml = `<span style="font-size:11px;color:#10b981;font-weight:600;cursor:pointer"
        onclick="openEvalFisica('${g.id}','${safeName}')"
        title="Ver evaluación">📅 ${evalCache.fechaStr}</span>`;
    } else {
      evalHtml = `<span style="font-size:11px;color:#6b7280;cursor:pointer"
        onclick="openEvalFisica('${g.id}','${safeName}')"
        title="Registrar evaluación física">Sin evaluar</span>`;
    }

    return `<tr>
      <td class="row-num">${i + 1}</td>
      <td class="col-name">${esc(g.name) || '<span class="dash">Sin nombre</span>'}</td>
      <td><span class="lvl-badge badge-${g.level || 'Principiante'}">${esc(lvlLabel)}</span></td>
      <td>${g.years !== '' && g.years !== undefined ? g.years + ' año' + (g.years != 1 ? 's' : '') : '<span class="dash">—</span>'}</td>
      <td>${groupText}</td>
      <td>${attHtml}</td>
      <td>${boolDisplayText(g.comprende)}</td>
      <td>${boolDisplayText(g.incorpora)}</td>
      <td>${pred ? `<span class="pred-mini ${pred.cls}">${pred.text}</span>` : '<span class="dash">—</span>'}</td>
      <td>${physDisplayText(g.flex)}</td>
      <td>${physDisplayText(g.fuerzaBrazos)}</td>
      <td>${evalHtml}</td>
      <td style="white-space:nowrap">
        <button class="btn-edit" onclick="openModal('${g.id}')">✏ Editar</button>
        <button class="btn-edit"
          onclick="openEvalFisica('${g.id}','${safeName}')"
          style="margin-left:4px;background:#1e3a5f;"
          title="Evaluación Física">🏋️</button>
      </td>
    </tr>`;
  }).join('');
}

function calcAtt(total, asistio) {
  if (!total || !asistio || isNaN(total) || isNaN(asistio)) return '—';
  return Math.round((parseInt(asistio) / parseInt(total)) * 100);
}
function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── STATS ─────────────────────────────────────────
function updateStats() {
  const counts = { E1B:0, E1A:0, E2:0, E3:0, USAG1B:0, USAG1A:0, USAG2:0, USAG3:0, comp:0 };
  let potCompAsis=0, potApren=0, potExp=0, potElem=0;

  gymnasts.forEach(g => {
    if (counts[g.level] !== undefined) counts[g.level]++;
    if (g.predisposicion === '1' || g.predisposicion === '2') counts.comp++;
    const isComp = (g.predisposicion === '1' || g.predisposicion === '2');
    const asisPct = parseInt(calcAtt(g.totalClases, g.asistio));
    if (isComp && !isNaN(asisPct) && asisPct >= 80) potCompAsis++;
    if (g.comprende === 'si' && g.incorpora === 'si') potApren++;
    if (parseInt(g.years || 0) >= 2) potExp++;
    const elementsKeys = Object.keys(g.elements || {});
    let validElems = 0;
    elementsKeys.forEach(k => { if (g.elements[k] !== 'no') validElems++; });
    if (validElems >= 5) potElem++;
  });

  document.querySelector('#stat-total .stat-num').textContent = gymnasts.length;
  document.querySelector('#stat-e1b .stat-num').textContent = counts.E1B;
  document.querySelector('#stat-e1a .stat-num').textContent = counts.E1A;
  document.querySelector('#stat-e2 .stat-num').textContent = counts.E2;
  document.querySelector('#stat-e3 .stat-num').textContent = counts.E3;
  document.querySelector('#stat-u1b .stat-num').textContent = counts.USAG1B;
  document.querySelector('#stat-u1a .stat-num').textContent = counts.USAG1A;
  document.querySelector('#stat-u2 .stat-num').textContent = counts.USAG2;
  document.querySelector('#stat-u3 .stat-num').textContent = counts.USAG3;
  document.querySelector('#stat-comp .stat-num').textContent = counts.comp;

  const elCompAsis = document.querySelector('#pot-comp-asis .pot-num');
  if (elCompAsis) {
    elCompAsis.textContent = potCompAsis;
    document.querySelector('#pot-apren .pot-num').textContent = potApren;
    document.querySelector('#pot-exp .pot-num').textContent = potExp;
    document.querySelector('#pot-elem .pot-num').textContent = potElem;
    document.getElementById('potencialSummary').style.display = gymnasts.length > 0 ? 'block' : 'none';
  }
}

// ─── MODAL ─────────────────────────────────────────
function openModal(id) {
  editingId = id;
  formState = { comprende: null, incorpora: null, flex: null, fuerzaBrazos: null, fuerzaTronco: null, coordinacion: null };

  window._currentEditingId   = id || null;
  window._currentEditingName = id ? (gymnasts.find(x => x.id === id)?.name || '') : '';

  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('active');
  document.getElementById('btnDelete').style.display = id ? 'block' : 'none';
  document.body.style.overflow = 'hidden';

  populateFormGroup();

  const efNota = document.getElementById('ef-modal-nota');
  if (efNota) {
    if (id) {
      efNota.textContent = 'Podés registrar la evaluación física de esta gimnasta.';
      efNota.style.color = '#6b7280';
    } else {
      efNota.textContent = '⚠️ Guardá la gimnasta primero para poder registrar la evaluación física.';
      efNota.style.color = '#f59e0b';
    }
  }

  if (id) {
    const g = gymnasts.find(x => x.id === id);
    if (!g) return;
    document.getElementById('modalTitle').textContent = '✏ Editar Gimnasta';
    document.getElementById('fName').value = g.name || '';
    document.getElementById('fGroup').value = g.groupId || '';
    onGroupChange();
    document.getElementById('fYears').value = g.years !== undefined ? g.years : '';
    document.getElementById('fTotalClases').value = g.totalClases || '';
    document.getElementById('fAsistio').value = g.asistio || '';
    document.getElementById('fLevel').value = g.level || '';
    document.getElementById('fDudas').value = g.dudas || '';
    document.getElementById('fObs').value = g.obs || '';
    setToggle('comprende', g.comprende, null, true);
    setToggle('incorpora', g.incorpora, null, true);
    setSeg('flex', g.flex, null, true);
    setSeg('fuerzaBrazos', g.fuerzaBrazos, null, true);
    setSeg('fuerzaTronco', g.fuerzaTronco, null, true);
    setSeg('coordinacion', g.coordinacion, null, true);
    if (g.predisposicion) {
      const rad = document.querySelector(`input[name="pred"][value="${g.predisposicion}"]`);
      if (rad) rad.checked = true;
    } else {
      document.querySelectorAll('input[name="pred"]').forEach(r => r.checked = false);
    }
    formState.elements = g.elements ? JSON.parse(JSON.stringify(g.elements)) : {};
    calcAttendance();
    renderElements();
  } else {
    document.getElementById('modalTitle').textContent = '+ Nueva Gimnasta';
    document.getElementById('fName').value = '';
    document.getElementById('fGroup').value = '';
    document.getElementById('fYears').value = '';
    document.getElementById('fTotalClases').value = '';
    document.getElementById('fAsistio').value = '';
    document.getElementById('fLevel').value = '';
    document.getElementById('fDudas').value = '';
    document.getElementById('fObs').value = '';
    document.querySelectorAll('input[name="pred"]').forEach(r => r.checked = false);
    clearToggles();
    clearSegs();
    formState.elements = {};
    document.getElementById('attendanceDisplay').textContent = '—';
    document.getElementById('attendanceDisplay').className = 'attendance-display';
    renderElements();
  }
  setTimeout(() => document.getElementById('fName').focus(), 300);
}

function openEvalFisicaFromModal(tabInicial) {
  const id   = window._currentEditingId;
  const name = window._currentEditingName;
  if (!id) { showToast('Guardá la gimnasta primero para asociar la evaluación.', true); return; }
  if (window.openEvalFisica) {
    window.openEvalFisica(id, name);
    setTimeout(() => {
      const tab = document.querySelector(`.ef-tab[data-tab="${tabInicial}"]`);
      if (tab) tab.click();
    }, 100);
  }
}

function clearToggles() {
  document.querySelectorAll('.toggle-group button').forEach(b => {
    b.className = b.className.replace(/\bactive-\w+\b/g, '');
  });
}
function clearSegs() {
  document.querySelectorAll('.seg-group button').forEach(b => {
    b.className = b.className.replace(/\bseg-active-\w+\b/g, '');
  });
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ─── FORM HELPERS ──────────────────────────────────
function setToggle(field, val, btn, silent) {
  if (!val) return;
  formState[field] = val;
  const group = document.getElementById('tog-' + field);
  if (!group) return;
  group.querySelectorAll('button').forEach(b => {
    b.className = b.className.replace(/\bactive-\w+\b/g, '');
    if (b.dataset.val === val) b.classList.add('active-' + val);
  });
}
function setSeg(field, val, btn, silent) {
  if (!val) return;
  formState[field] = val;
  const group = document.getElementById('seg-' + field);
  if (!group) return;
  group.querySelectorAll('button').forEach(b => {
    b.className = b.className.replace(/\bseg-active-\w+\b/g, '');
    if (b.textContent.trim() === val) b.classList.add('seg-active-' + val);
  });
}
function calcAttendance() {
  const total = parseInt(document.getElementById('fTotalClases').value);
  const asist = parseInt(document.getElementById('fAsistio').value);
  const el = document.getElementById('attendanceDisplay');
  if (isNaN(total) || isNaN(asist) || total === 0) { el.textContent = '—'; el.className = 'attendance-display'; return; }
  const pct = Math.round((asist / total) * 100);
  el.textContent = pct + '%';
  el.className = 'attendance-display ' + (pct >= 80 ? 'att-high' : pct >= 60 ? 'att-mid' : 'att-low');
}
function onGroupChange() {
  const groupId = document.getElementById('fGroup').value;
  if (!groupId) { document.getElementById('fTotalClases').value = ''; calcAttendance(); return; }
  document.getElementById('fTotalClases').value = calculateExpectedClasses(groupId);
  calcAttendance();
}
function calculateExpectedClasses(groupId) {
  const gr = window.CLUB_GROUPS.find(g => g.id === groupId);
  if (!gr || !window.CLUB_CONFIG) return 0;
  let validDays = [];
  const daysStr = gr.days.toLowerCase();
  if (daysStr.includes('lunes y miércoles') || daysStr.includes('lunes y miercoles')) validDays = [1, 3];
  else if (daysStr.includes('martes y jueves')) validDays = [2, 4];
  else if (daysStr.includes('sábado') || daysStr.includes('sabado')) validDays = [6];
  else return 0;
  const parseSafe = s => { const p = s.split('-'); return new Date(p[0], p[1]-1, p[2]); };
  const start    = parseSafe(window.CLUB_CONFIG.periodStart);
  const end      = parseSafe(window.CLUB_CONFIG.periodEnd);
  const holidays = window.CLUB_CONFIG.holidays || [];
  let count = 0, cur = new Date(start), safety = 0;
  while (cur <= end && safety < 500) {
    safety++;
    if (validDays.includes(cur.getDay())) {
      const ds = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}-${String(cur.getDate()).padStart(2,'0')}`;
      if (!holidays.includes(ds)) count++;
    }
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

// ─── ELEMENTS RENDERER ─────────────────────────────
function renderElements() {
  const level = document.getElementById('fLevel').value;
  const container = document.getElementById('elementsContainer');
  if (!level || level === 'Principiante' || level === 'Recreativo') {
    container.innerHTML = `<div class="no-level-msg">ℹ️ ${
      level === 'Principiante' ? 'Principiante: no hay serie definida.' :
      level === 'Recreativo'   ? 'Nivel recreativo: sin serie.' :
      'Seleccioná un nivel con serie para ver los elementos.'
    }</div>`;
    return;
  }
  const data = LEVEL_DATA[level];
  if (!data) { container.innerHTML = ''; return; }
  if (!formState.elements) formState.elements = {};

  let html = `<div style="margin-top:10px;padding:10px;background:#6c63ff11;border:1px solid #6c63ff33;border-radius:8px;font-size:.78rem;color:#9fa3c7;margin-bottom:4px">
    <strong style="color:#a78bfa">📋 ${data.label}</strong> — Marcá el estado de cada elemento:<br>
    <span style="color:#06d6a0">✅ Adquirido</span> &nbsp;
    <span style="color:#f7a948">🔄 En trabajo</span> &nbsp;
    <span style="color:#ef476f88">⬛ No abordado</span>
  </div>`;
  Object.entries(data.aparatos).forEach(([aparato, elementos]) => {
    html += `<div class="aparato-block"><div class="aparato-title">📍 ${aparato}</div><div class="elements-list">`;
    elementos.forEach((elem, idx) => {
      const key   = `${level}__${aparato}__${idx}`;
      const state = formState.elements[key] || 'none';
      html += `<div class="element-row">
        <span class="elem-name">${esc(elem)}</span>
        <div class="elem-state-group">
          <button class="elem-btn${state==='adq'?' state-adq':''}"  onclick="setElemState('${key}','adq',this)">✅ Adq</button>
          <button class="elem-btn${state==='trab'?' state-trab':''}" onclick="setElemState('${key}','trab',this)">🔄 Trab</button>
          <button class="elem-btn${state==='no'?' state-no':''}"   onclick="setElemState('${key}','no',this)">⬛ No</button>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
}
function setElemState(key, state, btn) {
  if (!formState.elements) formState.elements = {};
  formState.elements[key] = state;
  btn.closest('.elem-state-group').querySelectorAll('.elem-btn').forEach(b => { b.className = 'elem-btn'; });
  btn.classList.add('state-' + state);
}

// ─── SAVE / DELETE ─────────────────────────────────
async function saveGymnast() {
  const name = document.getElementById('fName').value.trim();
  if (!name) { showToast('Por favor escribí el nombre de la gimnasta.', true); return; }

  const pred     = document.querySelector('input[name="pred"]:checked');
  const groupId  = document.getElementById('fGroup')?.value || null;
  const classGroup = window.CLUB_GROUPS.find(gr => gr.id === groupId) || null;
  let totalClases  = document.getElementById('fTotalClases').value;
  if (!totalClases && groupId) totalClases = calculateExpectedClasses(groupId);

  const g = {
    name,
    groupId,
    years:        document.getElementById('fYears').value,
    days:         classGroup ? classGroup.days : '',
    totalClases:  totalClases || "0",
    asistio:      document.getElementById('fAsistio').value || "0",
    level:        document.getElementById('fLevel').value,
    comprende:    formState.comprende || null,
    incorpora:    formState.incorpora || null,
    predisposicion: pred ? pred.value : null,
    flex:         formState.flex || null,
    fuerzaBrazos: formState.fuerzaBrazos || null,
    fuerzaTronco: formState.fuerzaTronco || null,
    coordinacion: formState.coordinacion || null,
    elements:     formState.elements ? JSON.parse(JSON.stringify(formState.elements)) : {},
    dudas:        document.getElementById('fDudas').value,
    obs:          document.getElementById('fObs').value,
  };

  try {
    const btnSave = document.querySelector('.btn-save');
    btnSave.textContent = 'Guardando...';
    btnSave.disabled = true;

    if (editingId) {
      g.updatedAt = new Date().toISOString();
      await updateDoc(doc(db, "gimnastas_mapeo", editingId), g);
      showToast('✓ Gimnasta actualizada en la nube.');
    } else {
      g.createdAt = new Date().toISOString();
      const newDocRef = await addDoc(gimnastasRef, g);
      window._currentEditingId   = newDocRef.id;
      window._currentEditingName = name;
      const efNota = document.getElementById('ef-modal-nota');
      if (efNota) { efNota.textContent = 'Podés registrar la evaluación física de esta gimnasta.'; efNota.style.color = '#6b7280'; }
      showToast('✓ Gimnasta agregada a la nube.');
    }
    closeModal();
    btnSave.textContent = '💾 Guardar';
    btnSave.disabled = false;
  } catch (error) {
    console.error("Error al guardar:", error);
    showToast("Error al guardar: " + error.message, true);
    document.querySelector('.btn-save').disabled = false;
    document.querySelector('.btn-save').textContent = '💾 Guardar';
  }
}

async function deleteGymnast() {
  if (!editingId) return;
  const g = gymnasts.find(x => x.id === editingId);
  if (!confirm(`¿Eliminar a ${g ? g.name : 'esta gimnasta'} de la base de datos? Esta acción no se puede deshacer.`)) return;
  try {
    document.getElementById('btnDelete').disabled = true;
    await deleteDoc(doc(db, "gimnastas_mapeo", editingId));
    showToast('Gimnasta eliminada de la nube.');
    closeModal();
    document.getElementById('btnDelete').disabled = false;
  } catch (error) {
    console.error("Error al eliminar:", error);
    showToast("Error al eliminar: " + error.message, true);
    document.getElementById('btnDelete').disabled = false;
  }
}

// ─── EXPORT ────────────────────────────────────────
function exportExcel() {
  if (gymnasts.length === 0) { showToast('No hay datos para exportar.', true); return; }
  const teacher = document.getElementById('teacherName').value || 'Sin_Nombre';
  const dateStr = document.getElementById('evalDate').value || new Date().toISOString().split('T')[0];
  const headers = ['Nombre','Nivel','Años Actividad','Grupo/Días','Profesor','Horario','Clases Teóricas','Asistió','% Asistencia','Comprende Consignas','Incorpora Rápido','Predisposición','Flexibilidad','Fuerza Brazos','Fuerza Tronco','Coordinación','Elem. Adquiridos','Elem. en Trabajo','Última Eval. Física','Dudas/Consultas','Observaciones','Fecha Evaluación'];
  const data = gymnasts.map(g => {
    const pred = PRED_LABELS[g.predisposicion];
    const attPercent = calcAtt(g.totalClases, g.asistio);
    const lvl = LEVEL_DATA[g.level] ? LEVEL_DATA[g.level].label : (g.level || '');
    const adq  = Object.values(g.elements || {}).filter(v => v === 'adq').length;
    const trab = Object.values(g.elements || {}).filter(v => v === 'trab').length;
    const gr   = window.CLUB_GROUPS.find(gr => gr.id === g.groupId) || null;
    const evalStr = evalFisicaCache[g.id]?.fechaStr || 'Sin evaluar';
    return [g.name, lvl, parseInt(g.years||0), gr?gr.days:(g.days||''), gr?gr.teacher:'', gr?gr.time:'', parseInt(g.totalClases||0), parseInt(g.asistio||0), attPercent!=='—'?attPercent/100:0, g.comprende||'', g.incorpora||'', pred?pred.text.replace(/[🏆⭐💪🌸👪]/g,'').trim():'', g.flex||'', g.fuerzaBrazos||'', g.fuerzaTronco||'', g.coordinacion||'', adq, trab, evalStr, g.dudas||'', g.obs||'', dateStr];
  });
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r+1; R <= range.e.r; ++R) { const cell = ws[XLSX.utils.encode_cell({r:R,c:8})]; if(cell) cell.z='0%'; }
  XLSX.utils.book_append_sheet(wb, ws, "Mapeo");
  XLSX.writeFile(wb, `mapeo_gimnastas_${teacher.replace(/\s+/g,'_')}_${dateStr}.xlsx`);
  showToast('✓ Excel exportado.');
}

function exportCSV() {
  if (gymnasts.length === 0) { showToast('No hay datos para exportar.', true); return; }
  const teacher = document.getElementById('teacherName').value || 'Sin_Nombre';
  const dateStr = document.getElementById('evalDate').value || new Date().toISOString().split('T')[0];
  const headers = ['Nombre','Nivel','Años_Actividad','Grupo_Dias','Profesor','Horario','Total_Clases','Clases_Asistidas','Pct_Asistencia','Comprende_Consignas','Incorpora_Rapido','Predisposicion','Flexibilidad','Fuerza_Brazos','Fuerza_Tronco','Coordinacion','Elementos_Adquiridos','Elementos_Trabajo','Ultima_Eval_Fisica','Dudas','Observaciones','Fecha_Evaluacion'];
  const rows = gymnasts.map(g => {
    const pred = PRED_LABELS[g.predisposicion];
    const attPercent = calcAtt(g.totalClases, g.asistio);
    const lvl  = LEVEL_DATA[g.level] ? LEVEL_DATA[g.level].label : (g.level || '');
    const adq  = Object.values(g.elements||{}).filter(v=>v==='adq').length;
    const trab = Object.values(g.elements||{}).filter(v=>v==='trab').length;
    const gr   = window.CLUB_GROUPS.find(gr=>gr.id===g.groupId)||null;
    const evalStr = evalFisicaCache[g.id]?.fechaStr || 'Sin evaluar';
    return [g.name, lvl, g.years||'', gr?gr.days:(g.days||''), gr?gr.teacher:'', gr?gr.time:'', g.totalClases||'', g.asistio||'', attPercent!=='—'?attPercent+'%':'', g.comprende||'', g.incorpora||'', pred?pred.text.replace(/[🏆⭐💪🌸👪]/g,'').trim():'', g.flex||'', g.fuerzaBrazos||'', g.fuerzaTronco||'', g.coordinacion||'', adq, trab, evalStr, (g.dudas||'').replace(/\n/g,' '), (g.obs||'').replace(/\n/g,' '), dateStr].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',');
  });
  const csv = '\uFEFF' + 'sep=,\n' + headers.join(',') + '\n' + rows.join('\n');
  const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8;'}));
  const a = document.createElement('a');
  a.href = url; a.download = `mapeo_gimnastas_${teacher.replace(/\s+/g,'_')}_${dateStr}.csv`; a.click();
  URL.revokeObjectURL(url);
  showToast('✓ CSV exportado.');
}

// ─── TOAST ─────────────────────────────────────────
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show' + (isError ? ' error' : '');
  setTimeout(() => { t.className = ''; }, 3200);
}
