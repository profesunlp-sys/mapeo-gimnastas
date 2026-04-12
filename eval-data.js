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
            { id: 'v1', text: 'Ayuda durante el salto', val: 2.00 },
            { id: 'v2', text: 'Ayuda en el aterrizaje', val: 0.50 },
            { id: 'v3', text: 'Falta de altura', val: 0.50 },
            { id: 'v4', text: 'Piernas separadas', val: 0.20 },
            { id: 'v5', text: 'Piernas dobladas', val: 0.30 },
            { id: 'v6', text: 'No aterrizar en demi-plié', val: 0.50 }
          ]}
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Salto al Apoyo (Entrada)', value: 2.50, deductions: [{ id: 'p1', text: 'Falta salto impulsado', val: 0.30 }] },
          { name: 'Flotante (Back swing)', value: 2.50, deductions: [{ id: 'p3', text: 'Falta altura de piernas', val: 0.30 }] },
          { name: 'Media vuelta adelante (brazos flex.)', value: 2.50, deductions: [{ id: 'p5', text: 'Falta control en giro', val: 0.30 }] },
          { name: 'Escuadra colgada (2")', value: 2.50, deductions: [{ id: 'p7', text: 'No mantener 2 segundos', val: 0.50 }] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada horcajada + cuclillas', value: 1.00, deductions: [] },
          { name: 'Caminata en relevé', value: 1.50, deductions: [] },
          { name: 'Passé alternados (1" c/u)', value: 1.50, deductions: [] },
          { name: 'Salto en extensión', value: 2.50, deductions: [] },
          { name: 'Giro 90º sobre dos pies', value: 1.50, deductions: [] },
          { name: 'Salida: Salto en extensión', value: 2.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Rol adelante agrupado', value: 2.00, deductions: [] },
          { name: 'Vertical (mostrar)', value: 2.00, deductions: [] },
          { name: 'Salto Gato', value: 2.00, deductions: [] },
          { name: 'Vela (2")', value: 2.00, deductions: [] },
          { name: 'Sapo (2")', value: 2.00, deductions: [] }
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
          { name: 'Salto al apoyo con extensión', value: 10.00, deductions: [] }
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Salto apoyo (entrada)', value: 1.00, deductions: [] },
          { name: 'Flotante (Back swing)', value: 1.50, deductions: [] },
          { name: 'Media vuelta adelante', value: 1.50, deductions: [] },
          { name: 'Rodada atrás agrupada', value: 2.00, deductions: [] },
          { name: 'Escuadra colgada (2")', value: 2.00, deductions: [] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada horcajada + cuclillas', value: 1.00, deductions: [] },
          { name: 'Caminata en relevé', value: 1.00, deductions: [] },
          { name: 'Passé alternados (1" c/u)', value: 1.00, deductions: [] },
          { name: 'Cuclillas con un pie adelante', value: 1.00, deductions: [] },
          { name: 'Salto en extensión', value: 2.00, deductions: [] },
          { name: 'Giro 180º sobre dos pies', value: 2.00, deductions: [] },
          { name: 'Salida: Salto en extensión', value: 2.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Rol adelante agrupado', value: 1.00, deductions: [] },
          { name: 'Vertical (mostrar)', value: 2.00, deductions: [] },
          { name: 'Salto Gato', value: 1.00, deductions: [] },
          { name: 'Pasos de ballet', value: 1.00, deductions: [] },
          { name: 'Rol atrás agrupado', value: 2.00, deductions: [] },
          { name: 'Vela (2")', value: 1.00, deductions: [] },
          { name: 'Sapo (2")', value: 2.00, deductions: [] }
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
          { name: 'Salto extensión a colchones (altura)', value: 10.00, deductions: [] }
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Salto apoyo (entrada)', value: 1.00, deductions: [] },
          { name: 'Flotante (back swing)', value: 1.50, deductions: [] },
          { name: 'Pasaje de una pierna adelante', value: 1.50, deductions: [] },
          { name: 'Media vuelta adelante a sentada', value: 1.50, deductions: [] },
          { name: 'Rodada atrás agrupada al piso', value: 1.50, deductions: [] },
          { name: 'Escuadra colgada (2")', value: 1.50, deductions: [] },
          { name: 'Salida: Salto extensión con giro', value: 1.50, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada apoyo manos a cuclillas', value: 1.00, deductions: [] },
          { name: 'Caminata relevé y talón', value: 1.00, deductions: [] },
          { name: 'Passé adelante y atrás', value: 1.00, deductions: [] },
          { name: 'Árabe (mostrar)', value: 1.00, deductions: [] },
          { name: 'Salto agrupado', value: 1.50, deductions: [] },
          { name: 'Giro 180º en relevé (1 pie)', value: 1.50, deductions: [] },
          { name: 'Salida: Salto carpa/extensión', value: 1.50, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Rol adelante a un pie', value: 1.00, deductions: [] },
          { name: 'Vertical a rodar (rol)', value: 1.50, deductions: [] },
          { name: 'Salto Gato con giro', value: 1.00, deductions: [] },
          { name: 'Pasos cruzados y relevé', value: 1.00, deductions: [] },
          { name: 'Parada de manos (vertical)', value: 1.50, deductions: [] },
          { name: 'Rol atrás a brazos ext.', value: 1.50, deductions: [] },
          { name: 'Vela manos en espalda', value: 1.00, deductions: [] },
          { name: 'Salto rítmico (sissonne)', value: 1.50, deductions: [] }
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
          { name: 'Salto extensión (vuelo profundo)', value: 10.00, deductions: [] }
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Salto apoyo con impulso pierna', value: 1.00, deductions: [] },
          { name: 'Flotante con cuerpo extendido', value: 1.00, deductions: [] },
          { name: 'Pasaje pierna a horcajada', value: 1.00, deductions: [] },
          { name: 'Media vuelta a apoyo facial', value: 1.00, deductions: [] },
          { name: 'Rodada atrás a apoyo colgado', value: 1.00, deductions: [] },
          { name: 'Escuadra (L-sit) mantenida', value: 1.00, deductions: [] },
          { name: 'Salida: Mortal atrás/Salto giro', value: 1.00, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Entrada sin manos a cuclillas', value: 1.00, deductions: [] },
          { name: 'Caminata rítmica ballet', value: 1.00, deductions: [] },
          { name: 'Passé con equilibrio 2"', value: 1.00, deductions: [] },
          { name: 'Árabe a 45º (2")', value: 1.00, deductions: [] },
          { name: 'Salto de ciervo (sissonne)', value: 1.00, deductions: [] },
          { name: 'Giro 360º sobre un pie', value: 1.00, deductions: [] },
          { name: 'Salida: Mortal / Salto complejo', value: 1.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Rol adelante a piernas ext.', value: 1.00, deductions: [] },
          { name: 'Vertical a caer a puente', value: 1.00, deductions: [] },
          { name: 'Salto Gato 360º', value: 1.00, deductions: [] },
          { name: 'Pasos coreográficos Pro', value: 1.00, deductions: [] },
          { name: 'Rueda de carro (una mano)', value: 1.00, deductions: [] },
          { name: 'Rol atrás a vertical', value: 1.00, deductions: [] },
          { name: 'Vela sin manos (2")', value: 1.00, deductions: [] },
          { name: 'Salto split / extensión giro', value: 1.00, deductions: [] }
        ]
      }
    }
  },
  'USAG1': {
    label: 'USAG Nivel 1',
    aparatos: {
      'SALTO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Salto Extendido (Stretch Jump)', value: 10.00, deductions: [
            { id: 'u1v1', text: 'Pies no simultáneos en trampolín', val: 0.10 },
            { id: 'u1v2', text: 'Pérdida de velocidad horizontal', val: 0.30 },
            { id: 'u1v3', text: 'Inclinación excesiva hacia adelante', val: 0.20 },
            { id: 'u1v4', text: 'Falta de extensión en vuelo', val: 0.20 },
            { id: 'u1v5', text: 'Altura insuficiente', val: 0.30 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Pullover', value: 3.00, deductions: [
            { id: 'u1p1', text: 'Brazos flexionados', val: 0.30 },
            { id: 'u1p2', text: 'Falta de control al llegar arriba', val: 0.20 },
            { id: 'u1p3', text: 'Piernas separadas/flexionadas', val: 0.20 }
          ] },
          { name: 'Cast (Impulso atrás)', value: 2.00, deductions: [
            { id: 'u1p4', text: 'Amplitud insuficiente (bajo la barra)', val: 0.20 },
            { id: 'u1p5', text: 'Pies tocan el suelo', val: 0.50 }
          ] },
          { name: 'Back Hip Circle (Vuelta atrás)', value: 3.00, deductions: [
            { id: 'u1p6', text: 'No mantener contacto con la barra', val: 0.20 },
            { id: 'u1p7', text: 'Falta de continuidad', val: 0.10 }
          ] },
          { name: 'Underwing Dismount (Salida)', value: 2.00, deductions: [
            { id: 'u1p8', text: 'Falta de extensión en la salida', val: 0.20 }
          ] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Entrada Apoyo Frontal', value: 1.00, deductions: [{ id: 'u1b1', text: 'Brazos flexionados', val: 0.20 }] },
          { name: 'Needle Kick (Patada de Aguja)', value: 2.50, deductions: [{ id: 'u1b2', text: 'Falta de amplitud', val: 0.20 }, { id: 'u1b3', text: 'Desequilibrio', val: 0.10 }] },
          { name: 'Arabesque 30º', value: 2.00, deductions: [{ id: 'u1b4', text: 'Tiempo insuficiente (2")', val: 0.10 }] },
          { name: 'Stretch Jump (Salto extensión)', value: 2.50, deductions: [{ id: 'u1b5', text: 'Falta de extensión/puntas', val: 0.10 }] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Forward Roll (Rol adelante)', value: 2.50, deductions: [{ id: 'u1f1', text: 'Uso de manos para levantarse', val: 0.30 }] },
          { name: 'Cartwheel (Medialuna)', value: 2.50, deductions: [{ id: 'u1f2', text: 'No pasar por la vertical', val: 0.30 }, { id: 'u1f3', text: 'Pies fuera de la línea', val: 0.10 }] },
          { name: 'Back Tuck Roll (Rol atrás agrupado)', value: 2.50, deductions: [{ id: 'u1f4', text: 'Manos en suelo antes de rodar', val: 0.30 }] },
          { name: 'Candlestick (Vela)', value: 2.50, deductions: [{ id: 'u1f5', text: 'No mantener 2"', val: 0.10 }] }
        ] 
      }
    }
  },
  'USAG2': {
    label: 'USAG Nivel 2',
    aparatos: {
      'SALTO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Salto a Parada de Manos (Flat Back)', value: 10.00, deductions: [
            { id: 'u2v1', text: 'Pies no simultáneos en trampolín', val: 0.10 },
            { id: 'u2v2', text: 'Inclinación excesiva hacia adelante', val: 0.20 },
            { id: 'u2v3', text: 'Brazos flexionados al tocar colchón', val: 0.30 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Pullover', value: 2.50, deductions: [{ id: 'u2p1', text: 'Cuerpo carpado/flexionado', val: 0.20 }] },
          { name: 'Back Hip Circle', value: 2.50, deductions: [{ id: 'u2p2', text: 'Falta de continuidad', val: 0.10 }] },
          { name: 'Leg Cut (Pasaje de pierna)', value: 2.50, deductions: [{ id: 'u2p3', text: 'Tocar barra con la pierna', val: 0.10 }] },
          { name: 'Mill Circle (Vuelta pajarito)', value: 2.50, deductions: [{ id: 'u2p4', text: 'Falta de amplitud inicial', val: 0.20 }] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Entrada Apoyo Frontal', value: 1.00, deductions: [] },
          { name: '1/2 Turn in Relevé', value: 2.50, deductions: [{ id: 'u2b1', text: 'No terminar en relevé', val: 0.10 }, { id: 'u2b2', text: 'Talón toca viga', val: 0.10 }] },
          { name: 'Leap 60° (Salto de paso)', value: 2.50, deductions: [{ id: 'u2b3', text: 'Amplitud insuficiente', val: 0.20 }] },
          { name: 'Handstand (Vertical)', value: 2.00, deductions: [{ id: 'u2b4', text: 'No llegar a la vertical', val: 0.30 }] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Handstand to Bridge', value: 2.50, deductions: [{ id: 'u2f1', text: 'Falta de control en el puente', val: 0.20 }] },
          { name: 'Back Roll to Push-up', value: 2.50, deductions: [
            { id: 'u2f2', text: 'Dedo entrelazados / manos separadas', val: 0.10 },
            { id: 'u2f3', text: 'No mostrar posición lagartija', val: 0.20 }
          ]},
          { name: 'Round-off (Rondó)', value: 3.00, deductions: [{ id: 'u2f4', text: 'Dirección desviada', val: 0.10 }] },
          { name: 'Split Leap 60°', value: 2.00, deductions: [{ id: 'u2f5', text: 'Falta de amplitud', val: 0.20 }] }
        ] 
      }
    }
  },
  'USAG3': {
    label: 'USAG Nivel 3',
    aparatos: {
      'SALTO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Handstand Flat Back (81cm)', value: 10.00, deductions: [
            { id: 'u3v1', text: 'Pies no simultáneos en trampolín', val: 0.10 },
            { id: 'u3v2', text: 'Fase de vuelo insuficiente', val: 0.30 },
            { id: 'u3v3', text: 'Toque una sola mano (JP)', val: 1.00 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Pullover', value: 1.50, deductions: [] },
          { name: 'Front Hip Circle', value: 2.00, deductions: [{ id: 'u3p1', text: 'Tocar suelo con pies', val: 0.50 }] },
          { name: 'Single Leg Basket Swing', value: 2.00, deductions: [] },
          { name: 'Mill Circle', value: 1.50, deductions: [] },
          { name: 'Squat-on / Pike-on to exit', value: 3.00, deductions: [{ id: 'u3p2', text: 'Pies alternados', val: 0.20 }, { id: 'u3p3', text: 'Tocar barra superior', val: 0.50 }] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Handstand (Vertical)', value: 2.50, deductions: [{ id: 'u3b1', text: 'No mantener vertical 1"', val: 0.10 }] },
          { name: 'Leap 90°', value: 2.00, deductions: [{ id: 'u3b2', text: 'Falta de amplitud', val: 0.20 }] },
          { name: 'Cartwheel (Medialuna)', value: 2.50, deductions: [{ id: 'u3b3', text: 'No pasar por la vertical', val: 0.30 }] },
          { name: 'Stretch Jump', value: 1.50, deductions: [] },
          { name: 'Salida: 1/4 turn to side land', value: 1.50, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Handspring Step-out', value: 2.50, deductions: [{ id: 'u3f1', text: 'Falta de vuelo', val: 0.20 }] },
          { name: 'Back Roll to 45° Extension', value: 2.50, deductions: [{ id: 'u3f2', text: 'No lograr 45°', val: 0.20 }] },
          { name: 'Round-off BHS BHS', value: 3.00, deductions: [{ id: 'u3f3', text: 'Falta de ritmo/dinamismo', val: 0.20 }] },
          { name: 'Split Leap 90°', value: 2.00, deductions: [{ id: 'u3f4', text: 'Falta de amplitud', val: 0.20 }] }
        ] 
      }
    }
  },
  'USAG4': {
    label: 'USAG Nivel 4',
    aparatos: {
      'SALTO': {
        baseScore: 10.00,
        elements: [
          { name: 'Front Handspring (Mortero)', value: 10.00, deductions: [
            { id: 'u4v1', text: 'Fase de vuelo insuficiente', val: 0.50 },
            { id: 'u4v2', text: 'Brazos flexionados en apoyo', val: 0.50 },
            { id: 'u4v3', text: 'Falta de repulsión', val: 0.50 },
            { id: 'u4v4', text: 'Mala recepción', val: 0.30 }
          ]}
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Kip (Kipe)', value: 1.00, deductions: [] },
          { name: 'Cast to horizontal', value: 1.00, deductions: [{ id: 'u4p1', text: 'Bajo la horizontal', val: 0.30 }] },
          { name: 'Clear hip circle to horizontal', value: 1.50, deductions: [{ id: 'u4p2', text: 'Toca la barra', val: 0.20 }] },
          { name: 'Kip (Kipe) 2da vez', value: 1.00, deductions: [] },
          { name: 'Cast to horizontal', value: 1.00, deductions: [] },
          { name: 'Back hip circle (Vuelta atrás)', value: 1.00, deductions: [] },
          { name: 'Squat/Stoop on (Pasaje a banda alta)', value: 1.00, deductions: [] },
          { name: 'Long hang kip (Kipe banda alta)', value: 1.00, deductions: [] },
          { name: 'Back hip circle (Banda alta)', value: 1.00, deductions: [] },
          { name: 'Underswing back tuck dismount (Salida)', value: 0.50, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Cartwheel mount (Entrada medialuna)', value: 1.00, deductions: [] },
          { name: 'Front scale (Balanza horizontal 2")', value: 1.00, deductions: [] },
          { name: 'Cartwheel (Medialuna)', value: 2.00, deductions: [] },
          { name: 'Split jump 120º', value: 1.50, deductions: [{ id: 'u4b1', text: 'Falta amplitud', val: 0.20 }] },
          { name: 'Sissonne', value: 1.00, deductions: [] },
          { name: 'Half turn on 1 foot', value: 1.00, deductions: [] },
          { name: 'Stretch jump (Salto extensión)', value: 1.00, deductions: [] },
          { name: 'Side tuck jump (Salida)', value: 1.50, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Straddle jump 120º', value: 1.00, deductions: [] },
          { name: 'Front handspring (Mortero)', value: 1.50, deductions: [] },
          { name: 'Back extension roll (Rol vertical)', value: 1.50, deductions: [] },
          { name: 'Round-off, BHS, BHS (Serie flic-flac)', value: 3.00, deductions: [{ id: 'u4f1', text: 'Falta ritmo', val: 0.10 }] },
          { name: 'Half turn (Medio giro)', value: 1.00, deductions: [] },
          { name: 'Split leap 120º', value: 1.00, deductions: [] },
          { name: 'Stretch jump', value: 1.00, deductions: [] }
        ]
      }
    }
  },
  'USAG5': {
    label: 'USAG Nivel 5',
    aparatos: {
      'SALTO': {
        baseScore: 10.00,
        elements: [
          { name: 'Front Handspring (Mortero)', value: 10.00, deductions: [] }
        ]
      },
      'PARALELAS': {
        baseScore: 10.00,
        elements: [
          { name: 'Kip (Kipe)', value: 1.00, deductions: [] },
          { name: 'Cast above horizontal', value: 1.00, deductions: [{ id: 'u5p1', text: 'Bajo horizontal', val: 0.30 }] },
          { name: 'Clear hip circle above horizontal', value: 1.50, deductions: [{ id: 'u5p2', text: 'Toca la barra', val: 0.20 }] },
          { name: 'Kip (Kipe) 2da vez', value: 1.00, deductions: [] },
          { name: 'Long hang kip (Banda alta)', value: 1.00, deductions: [] },
          { name: 'Back giant (Gigante atrás)', value: 1.50, deductions: [] },
          { name: 'Back giant (2da vez)', value: 1.50, deductions: [] },
          { name: 'Flyaway dismount (Salida mortal)', value: 1.00, deductions: [] },
          { name: 'OPCIÓN: Salida Nivel 4 (SV 9.5)', value: 0.00, isOption: true, subValue: 0.50, deductions: [] }
        ]
      },
      'VIGA': {
        baseScore: 10.00,
        elements: [
          { name: 'Mount (Entrada)', value: 1.00, deductions: [] },
          { name: 'Arabesque (Balanza 45º)', value: 1.00, deductions: [] },
          { name: 'Cartwheel (Medialuna)', value: 2.00, deductions: [] },
          { name: 'Split jump 150º', value: 1.50, deductions: [] },
          { name: 'Sissonne', value: 1.00, deductions: [] },
          { name: 'Full turn on 1 foot', value: 1.00, deductions: [] },
          { name: 'Handstand vertical (2")', value: 1.50, deductions: [] },
          { name: 'Back tuck dismount (Salida mortal)', value: 1.00, deductions: [] }
        ]
      },
      'SUELO': {
        baseScore: 10.00,
        elements: [
          { name: 'Straddle jump 150º', value: 1.00, deductions: [] },
          { name: 'Front handspring series', value: 1.50, deductions: [] },
          { name: 'Back extension roll to handstand', value: 1.50, deductions: [] },
          { name: 'RO, BHS, Back Tuck (Serie mortal)', value: 3.00, deductions: [] },
          { name: 'Full turn (Giro completo)', value: 1.00, deductions: [] },
          { name: 'Split leap 150º', value: 1.00, deductions: [] },
          { name: 'Stretch jump', value: 1.00, deductions: [] }
        ]
      }
    }
  }



};

window.GLOBAL_DEDUCTIONS = {
  'EXECUTION': [
    { id: 'ge1', text: 'Dinamismo insuficiente', val: 0.20 },
    { id: 'ge2', text: 'Piernas flexionadas', val: 0.30 },
    { id: 'ge3', text: 'Brazos flexionados', val: 0.30 },
    { id: 'ge4', text: 'Falta de puntas', val: 0.10 },
    { id: 'ge5', text: 'Postura cuerpo (arqueo/carpa)', val: 0.20 },
    { id: 'ge6', text: 'Brazos no cubren orejas (acro)', val: 0.05 },
    { id: 'ge7', text: 'Falta sincronización música (FX)', val: 0.30 }
  ],
  'LANDING': [
    { id: 'gl1', text: 'Pasos pequeños (c/u)', val: 0.40 },
    { id: 'gl2', text: 'Paso largo (>1m)', val: 0.40 },
    { id: 'gl3', text: 'Sentadilla (cadera baja)', val: 0.30 },
    { id: 'gl4', text: 'Balanceo de brazos', val: 0.10 },
    { id: 'gl5', text: 'Falta de fijeza (Stick)', val: 0.10 },
    { id: 'gl6', text: 'Ayuda en aterrizaje', val: 0.50 }
  ],
  'FALL': { id: 'fall', text: 'Caída (adicional)', val: 0.50 },
  'COACH': [
    { id: 'c1', text: 'Ayuda durante elemento (General)', val: 2.00 },
    { id: 'c2', text: 'Entrar a plataforma/área (sin motivo)', val: 0.50 }
  ]
};
