/**
 * EVAL-DATA.JS
 * Datos técnicos de evaluación para Gimnasia Artística Femenina (CAG Niveles E 2026 y USAG 1-3)
 */

window.EVAL_CONSTANTS = {
  CATEGORIES: [
    { name: 'Pre-Mini', min: 6, max: 7 },
    { name: 'Mini', min: 8, max: 9 },
    { name: 'Pre-Infantil', min: 10, max: 11 },
    { name: 'Infantil', min: 12, max: 13 },
    { name: 'Juvenil', min: 14, max: 15 },
    { name: 'Mayor', min: 16, max: 99 }
  ],
  CUTOFF_MONTH: 11, // Diciembre (0-indexed)
  CUTOFF_DAY: 31
};

window.EVAL_LEVEL_DETAILS = {
  'E1A': {
    label: 'Nivel E1 A',
    aparatos: {
      'SALTO': {
        baseScore: 10.00,
        elements: [
          { name: 'Salto en extensión hacia colchones', value: 10.00, deductions: [
            { id: 'v1', text: 'Falta fase de vuelo (altura)', val: 0.30 },
            { id: 'v2', text: 'Cuerpo carpado/arqueado', val: 0.20 },
            { id: 'v3', text: 'Pies no simultáneos', val: 0.10 },
            { id: 'v4', text: 'Cerrar pies en el aire', val: 0.10 },
            { id: 'v5', text: 'Aterrizaje inestable', val: 0.30 }
          ]}
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada: Salto al Apoyo', value: 2.00, deductions: [
            { id: 'p1', text: 'Falta salto impulsado', val: 0.30 },
            { id: 'p2', text: 'Brazos flexionados', val: 0.30 }
          ]},
          { name: 'Flotante (Back swing)', value: 3.00, deductions: [
            { id: 'p3', text: 'Falta altura de piernas', val: 0.30 },
            { id: 'p4', text: 'Cuerpo no extendido', val: 0.20 }
          ]},
          { name: 'Media vuelta adelante brazos flexionados', value: 3.00, deductions: [
            { id: 'p5', text: 'Falta control en giro', val: 0.30 },
            { id: 'p6', text: 'No mantener flexión', val: 0.20 }
          ]},
          { name: 'Escuadra colgada (2")', value: 2.00, deductions: [
            { id: 'p7', text: 'No mantener 2 segundos', val: 0.50 },
            { id: 'p8', text: 'Ángulo > 90º', val: 0.30 }
          ]}
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada horcajada + cuclillas', value: 1.00, deductions: [] },
          { name: 'Passé 1ª pierna (1")', value: 1.00, deductions: [] },
          { name: 'Passé 2ª pierna (1")', value: 1.00, deductions: [] },
          { name: 'Dos pasos en relevé', value: 1.50, deductions: [] },
          { name: 'Salto en extensión', value: 2.50, deductions: [] },
          { name: 'Regreso a cuclillas + pie', value: 1.50, deductions: [] },
          { name: 'Salida: Salto en extensión', value: 1.50, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Enlace coreográfico', value: 1.00, deductions: [] },
          { name: 'Passé alternados (x2)', value: 1.00, deductions: [] },
          { name: 'Rol adelante agrupado', value: 1.50, deductions: [] },
          { name: 'Vertical', value: 1.50, deductions: [] },
          { name: 'Salto Gato', value: 1.00, deductions: [] },
          { name: 'Vela', value: 1.00, deductions: [] },
          { name: 'Sapo (1")', value: 1.00, deductions: [] }
        ]
      }
    }
  },
  'E1B': {
    label: 'Nivel E1 B',
    aparatos: {
      'SALTO': {
        baseScore: 10.00,
        elements: [
          { name: 'Carrera y Pique', value: 5.00, deductions: [] },
          { name: 'Salto Extensión (básico)', value: 5.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Rol adelante', value: 3.00, deductions: [] },
          { name: 'Salto extensión', value: 3.00, deductions: [] },
          { name: 'Equilibrio (1 pie)', value: 4.00, deductions: [] }
        ]
      }
    }
  },
  'E2': {
    label: 'Nivel E2',
    aparatos: {
      'SALTO': {
        baseScore: 10.00,
        elements: [
          { name: 'Salto en extensión', value: 5.00, deductions: [] },
          { name: 'Vertical caída dorsal', value: 5.00, deductions: [] }
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada salto al apoyo', value: 1.50, deductions: [] },
          { name: 'Flotante (Back swing)', value: 1.50, deductions: [] },
          { name: 'Pasaje de pierna (2")', value: 2.50, deductions: [] },
          { name: 'Flotante atrás a pie', value: 2.50, deductions: [] },
          { name: 'Escuadra colgada (2")', value: 2.00, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada horcajada + pie', value: 1.00, deductions: [] },
          { name: 'Salto Gato', value: 1.50, deductions: [] },
          { name: 'Arabesque 30º (1")', value: 1.50, deductions: [] },
          { name: 'Giro 90º sobre 2 pies', value: 1.50, deductions: [] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Vertical', value: 1.50, deductions: [] },
          { name: 'Rol adelante agrupado', value: 1.50, deductions: [] },
          { name: 'Medialuna', value: 1.50, deductions: [] },
          { name: 'Vela / Sapo', value: 1.00, deductions: [] }
        ]
      }
    }
  },
  'E3': {
    label: 'Nivel E3',
    aparatos: {
      'SALTO': {
        baseScore: 10.00,
        elements: [
          { name: 'Vuelo Mortero (recepción acostada)', value: 10.00, deductions: [] }
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Vuelta pajarito (Cast)', value: 2.00, deductions: [] },
          { name: 'Vuelta atrás', value: 2.00, deductions: [] },
          { name: 'Pasaje de pierna palmar', value: 2.00, deductions: [] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada escuadra (2")', value: 1.50, deductions: [] },
          { name: 'Paloma horizontal (1")', value: 1.50, deductions: [] },
          { name: 'Vertical 30º', value: 1.50, deductions: [] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Vertical Rol', value: 1.50, deductions: [] },
          { name: 'Rol atrás', value: 1.50, deductions: [] },
          { name: 'Medialuna', value: 1.00, deductions: [] },
          { name: 'Rondó', value: 2.00, deductions: [] }
        ]
      }
    }
  },
  'USAG1': {
    label: 'USAG Nivel 1',
    aparatos: {
      'SALTO': { baseScore: 10.00, elements: [{ name: 'Stretch Jump to Mat', value: 10.00, deductions: [] }] },
      'PARALELAS': { baseScore: 10.00, elements: [{ name: 'Pullover', value: 5.00, deductions: [] }, { name: 'Cast', value: 5.00, deductions: [] }] },
      'VIGA': { baseScore: 10.00, elements: [{ name: 'Scales', value: 5.00, deductions: [] }, { name: 'Jumps', value: 5.00, deductions: [] }] },
      'SUELO': { baseScore: 10.00, elements: [{ name: 'Forward Roll', value: 5.00, deductions: [] }, { name: 'Cartwheel', value: 5.00, deductions: [] }] }
    }
  },
  'USAG2': {
    label: 'USAG Nivel 2',
    aparatos: {
      'SALTO': { baseScore: 10.00, elements: [{ name: 'Jump to Handstand', value: 10.00, deductions: [] }] },
      'PARALELAS': { baseScore: 10.00, elements: [{ name: 'Back Hip Circle', value: 5.00, deductions: [] }, { name: 'Leg Cut', value: 5.00, deductions: [] }] },
      'VIGA': { baseScore: 10.00, elements: [{ name: '1/2 Turn', value: 5.00, deductions: [] }, { name: 'Leap 60°', value: 5.00, deductions: [] }] },
      'SUELO': { baseScore: 10.00, elements: [{ name: 'Round-off', value: 5.00, deductions: [] }, { name: 'Bridge', value: 5.00, deductions: [] }] }
    }
  },
  'USAG3': {
    label: 'USAG Nivel 3',
    aparatos: {
      'SALTO': { baseScore: 10.00, elements: [{ name: 'Handstand Flat Back', value: 10.00, deductions: [] }] },
      'PARALELAS': { baseScore: 10.00, elements: [{ name: 'Front Hip Circle', value: 5.00, deductions: [] }, { name: 'Underswing', value: 5.00, deductions: [] }] },
      'VIGA': { baseScore: 10.00, elements: [{ name: 'Handstand', value: 5.00, deductions: [] }, { name: 'Cartwheel', value: 5.00, deductions: [] }] },
      'SUELO': { baseScore: 10.00, elements: [{ name: 'Handspring', value: 5.00, deductions: [] }, { name: 'Split Leap 90°', value: 5.00, deductions: [] }] }
    }
  }
};

window.GLOBAL_DEDUCTIONS = {
  'EXECUTION': [
    { id: 'ge1', text: 'Flexión de piernas', val: 0.10 },
    { id: 'ge2', text: 'Flexión de brazos', val: 0.10 },
    { id: 'ge3', text: 'Pies no en punta', val: 0.05 },
    { id: 'ge4', text: 'Falta de amplitud', val: 0.10 },
    { id: 'ge5', text: 'Pérdida leve de equilibrio', val: 0.10 },
    { id: 'ge6', text: 'Apoyo de manos en aparato', val: 0.30 }
  ],
  'LANDING': [
    { id: 'gl1', text: 'Paso pequeño', val: 0.10 },
    { id: 'gl2', text: 'Salto grande', val: 0.30 },
    { id: 'gl3', text: 'Falta de fijeza', val: 0.10 }
  ],
  'FALL': { id: 'fall', text: 'Caída (adicional)', val: 0.50 }
};
