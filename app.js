// =====================================================
// APP.JS — Lógica principal de la planilla de mapeo
//          Responsive: card view (mobile) + table (desktop)
// =====================================================

let gymnasts = JSON.parse(localStorage.getItem('gymnasts') || '[]');
let editingId = null;
let formState = {};

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

  renderView();
  updateStats();
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
          <span class="card-stat-label">Días/sem</span>
          <span class="card-stat-val">${g.days || '—'}</span>
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
    return `<tr>
      <td class="row-num">${i + 1}</td>
      <td class="col-name">${esc(g.name) || '<span class="dash">Sin nombre</span>'}</td>
      <td><span class="lvl-badge badge-${g.level || 'Principiante'}">${esc(lvlLabel)}</span></td>
      <td>${g.years !== '' && g.years !== undefined ? g.years + ' año' + (g.years != 1 ? 's' : '') : '<span class="dash">—</span>'}</td>
      <td>${g.days ? g.days + '/sem' : '<span class="dash">—</span>'}</td>
      <td><span class="att-num ${attClass}">${att}${att !== '—' ? '%' : ''}</span></td>
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
  gymnasts.forEach(g => {
    if (counts[g.level] !== undefined) counts[g.level]++;
    if (g.predisposicion === '1' || g.predisposicion === '2') counts.comp++;
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
}

// ─── MODAL ────────────────────────────────────────
function openModal(id) {
  editingId = id;
  formState = { comprende: null, incorpora: null, flex: null, fuerzaBrazos: null, fuerzaTronco: null, coordinacion: null };
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('active');
  document.getElementById('btnDelete').style.display = id ? 'block' : 'none';
  document.body.style.overflow = 'hidden';

  if (id) {
    const g = gymnasts.find(x => x.id === id);
    if (!g) return;
    document.getElementById('modalTitle').textContent = '✏ Editar Gimnasta';
    document.getElementById('fName').value = g.name || '';
    document.getElementById('fYears').value = g.years !== undefined ? g.years : '';
    document.getElementById('fDays').value = g.days || '';
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
    document.getElementById('fYears').value = '';
    document.getElementById('fDays').value = '';
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
function saveGymnast() {
  const name = document.getElementById('fName').value.trim();
  if (!name) { showToast('Por favor escribí el nombre de la gimnasta.', true); return; }

  const pred = document.querySelector('input[name="pred"]:checked');
  const g = {
    id: editingId || Date.now().toString(36) + Math.random().toString(36).slice(2),
    name,
    years: document.getElementById('fYears').value,
    days: document.getElementById('fDays').value,
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
    updatedAt: new Date().toISOString()
  };

  if (editingId) {
    const idx = gymnasts.findIndex(x => x.id === editingId);
    if (idx >= 0) gymnasts[idx] = g;
  } else {
    gymnasts.push(g);
  }

  localStorage.setItem('gymnasts', JSON.stringify(gymnasts));
  closeModal();
  renderView();
  updateStats();
  showToast(editingId ? '✓ Gimnasta actualizada.' : '✓ Gimnasta agregada.');
}

function deleteGymnast() {
  if (!editingId) return;
  const g = gymnasts.find(x => x.id === editingId);
  if (!confirm(`¿Eliminar a ${g ? g.name : 'esta gimnasta'}? Esta acción no se puede deshacer.`)) return;
  gymnasts = gymnasts.filter(x => x.id !== editingId);
  localStorage.setItem('gymnasts', JSON.stringify(gymnasts));
  closeModal();
  renderView();
  updateStats();
  showToast('Gimnasta eliminada.');
}

// ─── EXPORT CSV ────────────────────────────────────
function exportCSV() {
  if (gymnasts.length === 0) { showToast('No hay datos para exportar.', true); return; }
  const teacher = document.getElementById('teacherName').value || 'Sin_Nombre';
  const date = document.getElementById('evalDate').value || new Date().toISOString().split('T')[0];

  const headers = ['Nombre','Nivel','Años_Actividad','Dias_Semana','Total_Clases','Clases_Asistidas','Pct_Asistencia',
    'Comprende_Consignas','Incorpora_Rapido','Predisposicion','Flexibilidad','Fuerza_Brazos','Fuerza_Tronco','Coordinacion',
    'Elementos_Adquiridos','Elementos_Trabajo','Dudas','Observaciones','Fecha_Evaluacion'];

  const rows = gymnasts.map(g => {
    const pred = PRED_LABELS[g.predisposicion];
    const att = calcAtt(g.totalClases, g.asistio);
    const lvl = LEVEL_DATA[g.level] ? LEVEL_DATA[g.level].label : (g.level || '');
    const adq = Object.values(g.elements || {}).filter(v => v === 'adq').length;
    const trab = Object.values(g.elements || {}).filter(v => v === 'trab').length;
    return [
      g.name, lvl, g.years || '', g.days || '', g.totalClases || '', g.asistio || '', att !== '—' ? att + '%' : '',
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
