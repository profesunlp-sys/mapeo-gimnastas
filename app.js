// =====================================================
// APP.JS — Lógica principal de la planilla de mapeo
//          Responsive: card view (mobile) + table (desktop)
//          Firebase Firestore para guardado en la nube
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

let gymnasts = [];
let editingId = null;
let formState = {};

// ─── EXPORT TO WINDOW TO MAKE ONCLICK WORK in ES MODULE ────────
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalOnOverlay = closeModalOnOverlay;
window.setToggle = setToggle;
window.setSeg = setSeg;
window.calcAttendance = calcAttendance;
window.renderElements = renderElements;
window.setElemState = setElemState;
window.saveGymnast = saveGymnast;
window.deleteGymnast = deleteGymnast;
window.exportCSV = exportCSV;
window.renderView = renderView;

// ─── INIT ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('evalDate').value = today;
  const saved = localStorage.getItem('teacherName');
  if (saved) document.getElementById('teacherName').value = saved;
  document.getElementById('teacherName').addEventListener('input', e => {
    localStorage.setItem('teacherName', e.target.value);
  });

  // Toast
  const toast = document.createElement('div');
  toast.id = 'toast';
  document.body.appendChild(toast);

  // FAB visibility
  updateFABVisibility();
  window.addEventListener('resize', updateFABVisibility);

  // Firestore Snapshot (cargará datos iniciales también)
  onSnapshot(gimnastasRef, (snapshot) => {
    gymnasts = [];
    snapshot.forEach((docSnapshot) => {
      gymnasts.push({ id: docSnapshot.id, ...docSnapshot.data() });
    });
    // Ordenar por nombre
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
  const fn = document.getElementById('filterName').value.toLowerCase();
  return gymnasts.filter(g => {
    if (fl && g.level !== fl) return false;
    if (fp && g.predisposicion !== fp) return false;
    if (fn && !g.name.toLowerCase().includes(fn)) return false;
    return true;
  });
}

// ─── RENDER (dual: cards + table) ──────────────────
function renderView() {
  const filtered = getFiltered();
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
}

// ─── CARDS (mobile / tablet) ───────────────────────
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
    
    // Group details
    const gr = window.CLUB_GROUPS.find(gr => gr.id === g.groupId) || null;
    const groupText = gr ? `${gr.days} (${gr.teacher})` : (g.days ? `${g.days}/sem` : '—');
    
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
        <button class="btn-edit-card" onclick="openModal('${g.id}')">✏ Ver / Editar</button>
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

// ─── TABLE (desktop) ───────────────────────────────
function renderTable(filtered) {
  const tbody = document.getElementById('tableBody');
  if (!filtered || filtered.length === 0) { tbody.innerHTML = ''; return; }
  tbody.innerHTML = filtered.map((g, i) => {
    const att = calcAtt(g.totalClases, g.asistio);
    const attClass = att === '—' ? 'dash' : (parseInt(att) >= 80 ? 'att-high' : parseInt(att) >= 60 ? 'att-mid' : 'att-low');
    const lvlData = LEVEL_DATA[g.level];
    const lvlLabel = lvlData ? lvlData.label : (g.level || '—');
    const pred = PRED_LABELS[g.predisposicion];
    
    // Asistencia visual (ProgressBar)
    let attHtml = '<span class="dash">—</span>';
    if (att !== '—') {
      const attVal = parseInt(att);
      const color = attVal >= 90 ? '#10b981' : attVal >= 70 ? '#f59e0b' : '#ef4444';
      attHtml = `
        <div class="att-progress-cell">
           <div class="att-bar">
             <div class="att-fill" style="width: ${attVal}%; background: ${color}"></div>
           </div>
           <div class="att-labels">
             <span class="att-details">${g.asistio}/${g.totalClases} clases</span>
             <span class="att-pct" style="color: ${color}"><strong>${attVal}%</strong></span>
           </div>
        </div>
      `;
    }

    const gr = window.CLUB_GROUPS.find(gr => gr.id === g.groupId) || null;
    const groupText = gr ? `${gr.days}<br><span style="color:var(--text3);font-size:0.75rem">${gr.teacher}</span>` : (g.days ? `${g.days}/sem` : '<span class="dash">—</span>');

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
      <td><button class="btn-edit" onclick="openModal('${g.id}')">✏ Ver / Editar</button></td>
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
  const counts = { E1B:0,E1A:0,E2:0,E3:0,USAG1B:0,USAG1A:0,USAG2:0,USAG3:0,comp:0 };
  
  // Nuevas Métricas de "Resumen de Potencial"
  let potCompAsis = 0;
  let potApren = 0;
  let potExp = 0;
  let potElem = 0;

  gymnasts.forEach(g => {
    if (counts[g.level] !== undefined) counts[g.level]++;
    if (g.predisposicion === '1' || g.predisposicion === '2') counts.comp++;
    
    // Potencial calculations
    const isComp = (g.predisposicion === '1' || g.predisposicion === '2');
    const asisPct = parseInt(calcAtt(g.totalClases, g.asistio));
    if (isComp && !isNaN(asisPct) && asisPct >= 80) potCompAsis++;
    
    if (g.comprende === 'si' && g.incorpora === 'si') potApren++;
    
    if (parseInt(g.years || 0) >= 2) potExp++;
    
    const elementsKeys = Object.keys(g.elements || {});
    let validElems = 0;
    elementsKeys.forEach(k => {
      if (g.elements[k] !== 'no') validElems++; // trab or adq
    });
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
  
  // Modificar nuevas tarjetas
  const elCompAsis = document.querySelector('#pot-comp-asis .pot-num');
  if (elCompAsis) {
    elCompAsis.textContent = potCompAsis;
    document.querySelector('#pot-apren .pot-num').textContent = potApren;
    document.querySelector('#pot-exp .pot-num').textContent = potExp;
    document.querySelector('#pot-elem .pot-num').textContent = potElem;
    
    // Sólo mostrar el panel de potencial si hay gimnastas cargados
    document.getElementById('potencialSummary').style.display = gymnasts.length > 0 ? 'block' : 'none';
  }
}

// ─── MODAL ────────────────────────────────────────
function openModal(id) {
  editingId = id;
  formState = { comprende: null, incorpora: null, flex: null, fuerzaBrazos: null, fuerzaTronco: null, coordinacion: null };
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('active');
  document.getElementById('btnDelete').style.display = id ? 'block' : 'none';
  document.body.style.overflow = 'hidden';

  // Población de dropdown fGroup
  const fGroupSelect = document.getElementById('fGroup');
  if (fGroupSelect && fGroupSelect.options.length <= 1) {
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

  if (id) {
    const g = gymnasts.find(x => x.id === id);
    if (!g) return;
    document.getElementById('modalTitle').textContent = '✏ Editar Gimnasta';
    document.getElementById('fName').value = g.name || '';
    if (document.getElementById('fGroup')) document.getElementById('fGroup').value = g.groupId || '';
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
    if (document.getElementById('fGroup')) document.getElementById('fGroup').value = '';
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

  // Focus name field after animation
  setTimeout(() => document.getElementById('fName').focus(), 300);
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

// ─── FORM HELPERS ─────────────────────────────────
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
  if (!groupId) {
    document.getElementById('fTotalClases').value = '';
    calcAttendance();
    return;
  }
  const total = calculateExpectedClasses(groupId);
  document.getElementById('fTotalClases').value = total;
  calcAttendance();
}

function calculateExpectedClasses(groupId) {
  const gr = window.CLUB_GROUPS.find(g => g.id === groupId);
  if (!gr || !window.CLUB_CONFIG) return 0;
  
  // Mapear el string 'days' a los días de la semana (0:Dom, 1:Lun, 2:Mar, 3:Mie, 4:Jue, 5:Vie, 6:Sab)
  let validDays = [];
  const daysStr = gr.days.toLowerCase();
  if (daysStr.includes('lunes y miércoles')) validDays = [1, 3];
  else if (daysStr.includes('martes y jueves')) validDays = [2, 4];
  else if (daysStr.includes('sábado') || daysStr.includes('sabado')) validDays = [6];
  else return 0; // Fallback
  
  const start = new Date(window.CLUB_CONFIG.periodStart + 'T00:00:00');
  const end = new Date(window.CLUB_CONFIG.periodEnd + 'T00:00:00');
  const holidays = window.CLUB_CONFIG.holidays || [];
  
  let count = 0;
  let currentDate = new Date(start);
  
  while (currentDate <= end) {
    // 1. Ver si es un día de cursada
    if (validDays.includes(currentDate.getDay())) {
      // 2. Ver si NO es feriado
      const isoDate = currentDate.toISOString().split('T')[0];
      if (!holidays.includes(isoDate)) {
        count++;
      }
    }
    // Siguiente día
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}


// ─── ELEMENTS RENDERER ────────────────────────────
function renderElements() {
  const level = document.getElementById('fLevel').value;
  const container = document.getElementById('elementsContainer');

  if (!level || level === 'Principiante' || level === 'Recreativo') {
    container.innerHTML = `<div class="no-level-msg">ℹ️ ${
      level === 'Principiante' ? 'Principiante: no hay serie definida. Solo se evaluarán capacidades generales.' :
      level === 'Recreativo' ? 'Nivel recreativo: sin serie. Se registran datos generales.' :
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
    html += `<div class="aparato-block">
      <div class="aparato-title">📍 ${aparato}</div>
      <div class="elements-list">`;
    elementos.forEach((elem, idx) => {
      const key = `${level}__${aparato}__${idx}`;
      const state = formState.elements[key] || 'none';
      html += `<div class="element-row">
        <span class="elem-name">${esc(elem)}</span>
        <div class="elem-state-group">
          <button class="elem-btn${state==='adq'?' state-adq':''}" onclick="setElemState('${key}','adq',this)">✅ Adq</button>
          <button class="elem-btn${state==='trab'?' state-trab':''}" onclick="setElemState('${key}','trab',this)">🔄 Trab</button>
          <button class="elem-btn${state==='no'?' state-no':''}" onclick="setElemState('${key}','no',this)">⬛ No</button>
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
  const row = btn.closest('.elem-state-group');
  row.querySelectorAll('.elem-btn').forEach(b => { b.className = 'elem-btn'; });
  btn.classList.add('state-' + state);
}

// ─── SAVE / DELETE ─────────────────────────────────
async function saveGymnast() {
  const name = document.getElementById('fName').value.trim();
  if (!name) { showToast('Por favor escribí el nombre de la gimnasta.', true); return; }

  const pred = document.querySelector('input[name="pred"]:checked');
  const classGroup = window.CLUB_GROUPS.find(gr => gr.id === document.getElementById('fGroup')?.value) || null;
  
  const g = {
    name,
    groupId: classGroup ? classGroup.id : null,
    years: document.getElementById('fYears').value,
    days: classGroup ? classGroup.days : '', // Fallback for backwards compat
    totalClases: document.getElementById('fTotalClases').value,
    asistio: document.getElementById('fAsistio').value,
    level: document.getElementById('fLevel').value,
    comprende: formState.comprende || null,
    incorpora: formState.incorpora || null,
    predisposicion: pred ? pred.value : null,
    flex: formState.flex || null,
    fuerzaBrazos: formState.fuerzaBrazos || null,
    fuerzaTronco: formState.fuerzaTronco || null,
    coordinacion: formState.coordinacion || null,
    elements: formState.elements ? JSON.parse(JSON.stringify(formState.elements)) : {},
    dudas: document.getElementById('fDudas').value,
    obs: document.getElementById('fObs').value,
  };

  try {
    const btnSave = document.querySelector('.btn-save');
    const oldText = btnSave.textContent;
    btnSave.textContent = 'Guardando...';
    btnSave.disabled = true;

    if (editingId) {
      g.updatedAt = new Date().toISOString();
      await updateDoc(doc(db, "gimnastas_mapeo", editingId), g);
      showToast('✓ Gimnasta actualizada en la nube.');
    } else {
      g.createdAt = new Date().toISOString();
      await addDoc(gimnastasRef, g);
      showToast('✓ Gimnasta agregada a la nube.');
    }
    closeModal();
    btnSave.textContent = oldText;
    btnSave.disabled = false;
  } catch (error) {
    console.error("Error al guardar: ", error);
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
    const btnDel = document.getElementById('btnDelete');
    btnDel.disabled = true;
    await deleteDoc(doc(db, "gimnastas_mapeo", editingId));
    showToast('Gimnasta eliminada de la nube.');
    closeModal();
    btnDel.disabled = false;
  } catch (error) {
    console.error("Error al eliminar: ", error);
    showToast("Error al eliminar: " + error.message, true);
    document.getElementById('btnDelete').disabled = false;
  }
}

// ─── EXPORT CSV ────────────────────────────────────
function exportCSV() {
  if (gymnasts.length === 0) { showToast('No hay datos para exportar.', true); return; }
  const teacher = document.getElementById('teacherName').value || 'Sin_Nombre';
  const date = document.getElementById('evalDate').value || new Date().toISOString().split('T')[0];

  const headers = ['Nombre','Nivel','Años_Actividad','Grupo_Dias','Profesor','Horario','Total_Clases','Clases_Asistidas','Pct_Asistencia',
    'Comprende_Consignas','Incorpora_Rapido','Predisposicion','Flexibilidad','Fuerza_Brazos','Fuerza_Tronco','Coordinacion',
    'Elementos_Adquiridos','Elementos_Trabajo','Dudas','Observaciones','Fecha_Evaluacion'];

  const rows = gymnasts.map(g => {
    const pred = PRED_LABELS[g.predisposicion];
    const att = calcAtt(g.totalClases, g.asistio);
    const lvl = LEVEL_DATA[g.level] ? LEVEL_DATA[g.level].label : (g.level || '');
    const adq = Object.values(g.elements || {}).filter(v => v === 'adq').length;
    const trab = Object.values(g.elements || {}).filter(v => v === 'trab').length;
    
    // Group details
    const gr = window.CLUB_GROUPS.find(gr => gr.id === g.groupId) || null;
    const gDays = gr ? gr.days : (g.days || '');
    const gProf = gr ? gr.teacher : '';
    const gTime = gr ? gr.time : '';
    
    return [
      g.name, lvl, g.years || '', gDays, gProf, gTime, g.totalClases || '', g.asistio || '', att !== '—' ? att + '%' : '',
      g.comprende || '', g.incorpora || '', pred ? pred.text.replace(/[🏆⭐💪🌸👪]/g,'').trim() : '',
      g.flex || '', g.fuerzaBrazos || '', g.fuerzaTronco || '', g.coordinacion || '',
      adq, trab, (g.dudas || '').replace(/\n/g,' '), (g.obs || '').replace(/\n/g,' '), date
    ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',');
  });

  const bom = '\uFEFF';
  const csv = bom + headers.join(',') + '\n' + rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mapeo_gimnastas_${teacher.replace(/\s+/g,'_')}_${date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✓ CSV exportado correctamente.');
}

// ─── TOAST ─────────────────────────────────────────
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show' + (isError ? ' error' : '');
  setTimeout(() => { t.className = ''; }, 3200);
}
