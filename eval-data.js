/**
 * EVAL-DATA.JS
 * Datos técnicos de evaluación para Gimnasia Artística Femenina (CAG Niveles E 2026)
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
          { name: 'Entrada horcajada + cuclillas', value: 1.00, deductions: [
            { id: 'vi1', text: 'Falta fluidez en transición', val: 0.10 },
            { id: 'vi2', text: 'No mantener 1" en cuclillas', val: 0.10 }
          ]},
          { name: 'Passé 1ª pierna (1")', value: 1.00, deductions: [
            { id: 'vi3', text: 'Rodilla baja', val: 0.20 },
            { id: 'vi4', text: 'Brazos no en cintura', val: 0.10 }
          ]},
          { name: 'Passé 2ª pierna (1")', value: 1.00, deductions: [
            { id: 'vi5', text: 'Pierna base flexionada', val: 0.20 },
            { id: 'vi6', text: 'Desequilibrio', val: 0.10 }
          ]},
          { name: 'Dos pasos en relevé', value: 1.50, deductions: [
            { id: 'vi7', text: 'Talones abajo', val: 0.10 },
            { id: 'vi8', text: 'Pasos no en línea', val: 0.10 }
          ]},
          { name: 'Salto en extensión', value: 2.50, deductions: [
            { id: 'vi9', text: 'Pies no cerrados', val: 0.10 },
            { id: 'vi10', text: 'Falta altura', val: 0.20 }
          ]},
          { name: 'Regreso a cuclillas + pie', value: 1.50, deductions: [
            { id: 'vi11', text: 'Empujar con manos', val: 0.30 }
          ]},
          { name: 'Salida: Salto en extensión', value: 1.50, deductions: [
            { id: 'vi12', text: 'No salir por extremo', val: 0.10 },
            { id: 'vi13', text: 'Aterrizaje inestable', val: 0.30 }
          ]}
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Enlace coreográfico', value: 1.00, deductions: [
            { id: 's1', text: 'Falta fluidez/expresión', val: 0.20 }
          ]},
          { name: 'Passé alternados (x2)', value: 1.00, deductions: [
            { id: 's2', text: 'Altura incorrecta rodilla', val: 0.20 }
          ]},
          { name: 'Pasos en relevé (x2)', value: 1.00, deductions: [
            { id: 's3', text: 'Talones abajo', val: 0.10 }
          ]},
          { name: 'Rol adelante agrupado', value: 1.50, deductions: [
            { id: 's4', text: 'Empujar con manos', val: 0.30 },
            { id: 's5', text: 'Cruce de piernas al subir', val: 0.30 }
          ]},
          { name: 'Salto en extensión (conec.)', value: 1.00, deductions: [
            { id: 's6', text: 'Falta conexión inmediata', val: 0.20 }
          ]},
          { name: 'Salto Gato', value: 1.00, deductions: [
            { id: 's7', text: 'Rodillas bajas', val: 0.20 }
          ]},
          { name: 'Vertical', value: 1.50, deductions: [
            { id: 's8', text: 'No llegar a la vertical', val: 0.30 },
            { id: 's9', text: 'Cuerpo arqueado', val: 0.20 }
          ]},
          { name: 'Vela', value: 1.00, deductions: [
            { id: 's10', text: 'Apoyar manos para bajar', val: 0.30 }
          ]},
          { name: 'Sapo (1")', value: 1.00, deductions: [
            { id: 's11', text: 'No llegar pecho al suelo', val: 0.20 }
          ]}
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
          { name: 'Vertical caída dorsal', value: 5.00, deductions: [
            { id: 'v2_1', text: 'Falta repulsión hombros', val: 0.30 },
            { id: 'v2_2', text: 'No pasar por vertical', val: 0.30 }
          ]}
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada salto al apoyo', value: 1.50, deductions: [] },
          { name: 'Flotante (Back swing)', value: 1.50, deductions: [] },
          { name: 'Pasaje de pierna (2")', value: 2.50, deductions: [
            { id: 'p2_1', text: 'Falta mantención', val: 0.30 }
          ]},
          { name: 'Flotante atrás a pie', value: 2.50, deductions: [] },
          { name: 'Escuadra colgada (2")', value: 2.00, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada horcajada + pie', value: 1.00, deductions: [] },
          { name: 'Salto Gato', value: 1.50, deductions: [] },
          { name: 'Battement al frente', value: 1.50, deductions: [] },
          { name: 'Arabesque 30º (1")', value: 1.50, deductions: [] },
          { name: 'Passé alternados (1")', value: 1.00, deductions: [] },
          { name: '1/4 Giro sobre 2 pies', value: 1.50, deductions: [] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Enlace coreográfico', value: 1.00, deductions: [] },
          { name: 'Dos 1/2 Giros (2 pies)', value: 1.00, deductions: [] },
          { name: 'Passé - Developpé (x2)', value: 1.00, deductions: [] },
          { name: 'Salto Gato', value: 1.00, deductions: [] },
          { name: 'Vertical', value: 1.50, deductions: [] },
          { name: 'Rol adelante agrupado', value: 1.50, deductions: [] },
          { name: 'Medialuna', value: 1.50, deductions: [] },
          { name: 'Arabesca 30º', value: 0.50, deductions: [] },
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
          { name: 'Vuelo Mortero (recepción acostada)', value: 10.00, deductions: [
            { id: 'v3_1', text: 'Falta vuelo primer fase', val: 0.50 },
            { id: 'v3_2', text: 'Falta repulsión', val: 0.50 }
          ]}
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Vuelta pajarito (Cast)', value: 2.00, deductions: [] },
          { name: 'Flotante al apoyo', value: 2.00, deductions: [] },
          { name: 'Vuelta atrás', value: 2.00, deductions: [] },
          { name: 'Pasaje de pierna palmar', value: 2.00, deductions: [] },
          { name: 'Salida: Piso-Piso + Salto extensión', value: 2.00, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada horcajada + escuadra (2")', value: 1.50, deductions: [] },
          { name: 'Salto Gato', value: 1.00, deductions: [] },
          { name: 'Battement al frente', value: 1.00, deductions: [] },
          { name: 'Paloma horizontal (1")', value: 1.50, deductions: [] },
          { name: 'Vertical 30º', value: 1.50, deductions: [] },
          { name: 'Dos 1/2 giros sobre 2 pies', value: 1.50, deductions: [] },
          { name: 'Salida: Salto extensión extremo', value: 2.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Enlace coreográfico', value: 0.50, deductions: [] },
          { name: '1/2 giro passé (1 pie)', value: 0.50, deductions: [] },
          { name: 'Jeté 90º', value: 1.00, deductions: [] },
          { name: 'Vertical Rol', value: 1.50, deductions: [] },
          { name: 'Salto extensión 1/2 giro', value: 1.50, deductions: [] },
          { name: 'Rol atrás (agrup/ext)', value: 1.50, deductions: [] },
          { name: 'Medialuna', value: 1.00, deductions: [] },
          { name: 'Rondó + Salto extensión', value: 2.00, deductions: [] }
        ]
      }
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
