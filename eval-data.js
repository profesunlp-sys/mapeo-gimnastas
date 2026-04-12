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
          { name: 'Salto en extensión hacia colchones', value: 10.00, deductions: [
            { id: 'v1b1', text: 'Ayuda durante el salto', val: 2.00 },
            { id: 'v1b2', text: 'Ayuda en el aterrizaje', val: 0.50 },
            { id: 'v1b3', text: 'Falta de altura', val: 0.50 },
            { id: 'v1b4', text: 'Piernas separadas', val: 0.20 },
            { id: 'v1b5', text: 'Piernas dobladas', val: 0.30 },
            { id: 'v1b6', text: 'No aterrizar en demi-plié', val: 0.50 }
          ]}
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
          { name: 'Salto en extensión', value: 5.00, deductions: [
            { id: 'v2e1', text: 'Ayuda durante el salto', val: 2.00 },
            { id: 'v2e2', text: 'Ayuda en el aterrizaje', val: 0.50 },
            { id: 'v2e3', text: 'Falta de altura', val: 0.50 },
            { id: 'v2e4', text: 'Piernas separadas', val: 0.20 }
          ]},
          { name: 'Vertical caída dorsal', value: 5.00, deductions: [
            { id: 'v2e5', text: 'Piernas dobladas', val: 0.30 },
            { id: 'v2e6', text: 'No aterrizar en demi-plié', val: 0.50 },
            { id: 'v2e7', text: 'Cuerpo carpado/arqueado', val: 0.20 }
          ]}
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
      'SALTO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Salto Extendido (Stretch Jump)', value: 10.00, deductions: [
            { id: 'u1v1', text: 'Pies no simultáneos en trampolín', val: 0.20 },
            { id: 'u1v2', text: 'Pérdida de velocidad horizontal', val: 0.30 },
            { id: 'u1v3', text: 'Inclinación excesiva hacia adelante', val: 0.30 },
            { id: 'u1v4', text: 'Falta de extensión en vuelo', val: 0.20 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Pullover', value: 3.00, deductions: [{ id: 'u1p1', text: 'Brazos flexionados', val: 0.30 }, { id: 'u1p2', text: 'Falta de control', val: 0.20 }] },
          { name: 'Cast (Impulso atrás)', value: 2.00, deductions: [{ id: 'u1p3', text: 'Amplitud insuficiente', val: 0.20 }] },
          { name: 'Back Hip Circle (Vuelta atrás)', value: 3.00, deductions: [] },
          { name: 'Underwing Dismount (Salida)', value: 2.00, deductions: [] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Entrada Apoyo Frontal', value: 1.00, deductions: [{ id: 'u1b1', text: 'Brazos flexionados', val: 0.20 }] },
          { name: 'Needle Kick (Patada de Aguja)', value: 2.50, deductions: [{ id: 'u1b2', text: 'Falta de amplitud', val: 0.40 }] },
          { name: 'Arabesque 30º', value: 2.00, deductions: [] },
          { name: 'Stretch Jump (Salto extensión)', value: 2.50, deductions: [] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Forward Roll (Rol adelante)', value: 2.50, deductions: [] },
          { name: 'Cartwheel (Medialuna)', value: 2.50, deductions: [] },
          { name: 'Back Tuck Roll (Rol atrás agrupado)', value: 2.50, deductions: [{ id: 'u1f1', text: 'Manos en suelo antes de rodar', val: 0.30 }] },
          { name: 'Candlestick (Vela)', value: 2.50, deductions: [] }
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
          { name: 'Salto a Parada de Manos', value: 10.00, deductions: [
            { id: 'u2v1', text: 'Pies no simultáneos en trampolín', val: 0.20 },
            { id: 'u2v2', text: 'Inclinación excesiva', val: 0.30 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Pullover', value: 2.50, deductions: [] },
          { name: 'Back Hip Circle', value: 2.50, deductions: [] },
          { name: 'Leg Cut (Pasaje de pierna)', value: 2.50, deductions: [] },
          { name: 'Mill Circle (Vuelta pajarito)', value: 2.50, deductions: [] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Entrada Apoyo Frontal', value: 1.00, deductions: [] },
          { name: '1/2 Turn in Relevé', value: 2.50, deductions: [] },
          { name: 'Leap 60° (Salto de paso)', value: 2.50, deductions: [] },
          { name: 'Handstand (Vertical)', value: 2.00, deductions: [] },
          { name: 'Salida: Salto extensión', value: 2.00, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Handstand to Bridge', value: 2.50, deductions: [] },
          { name: 'Back Roll to Push-up', value: 2.50, deductions: [
            { id: 'u2f1', text: 'Dedo entrelazados / manos separadas', val: 0.10 },
            { id: 'u2f2', text: 'No mostrar posición lagartija', val: 0.20 }
          ]},
          { name: 'Round-off (Rondó)', value: 3.00, deductions: [] },
          { name: 'Split Leap 60°', value: 2.00, deductions: [] }
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
            { id: 'u3v1', text: 'Pies no simultáneos en trampolín', val: 0.20 },
            { id: 'u3v2', text: 'Toque una sola mano (JP)', val: 1.00 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Pullover', value: 1.50, deductions: [] },
          { name: 'Front Hip Circle', value: 2.00, deductions: [] },
          { name: 'Single Leg Basket Swing', value: 2.00, deductions: [] },
          { name: 'Mill Circle', value: 1.50, deductions: [] },
          { name: 'Squat-on / Pike-on to exit', value: 3.00, deductions: [{ id: 'u3p1', text: 'Pies alternados', val: 0.20 }, { id: 'u3p2', text: 'Tocar barra superior', val: 0.50 }] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Handstand (Vertical)', value: 2.50, deductions: [] },
          { name: 'Leap 90°', value: 2.00, deductions: [] },
          { name: 'Cartwheel (Medialuna)', value: 2.50, deductions: [] },
          { name: 'Stretch Jump', value: 1.50, deductions: [] },
          { name: 'Salida: 1/4 turn to side land', value: 1.50, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Handspring Step-out', value: 2.50, deductions: [] },
          { name: 'Back Roll to 45° Extension', value: 2.50, deductions: [{ id: 'u3f1', text: 'No lograr 45°', val: 0.20 }] },
          { name: 'Round-off BHS BHS', value: 3.00, deductions: [] },
          { name: 'Split Leap 90°', value: 2.00, deductions: [] }
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
          { name: 'Front Handspring over Vault Table', value: 10.00, deductions: [
            { id: 'u4v1', text: 'Pies no simultáneos en trampolín', val: 0.20 },
            { id: 'u4v2', text: 'Apoyo de brazos flexionados', val: 0.50 },
            { id: 'u4v3', text: 'Falta de inversión (repusión)', val: 0.50 },
            { id: 'u4v4', text: 'Falta de altura/vuelo 2ª fase', val: 0.30 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Kip (Apoyo de pecho)', value: 1.50, deductions: [{ id: 'u4p1', text: 'Falta de extensión en vuelo', val: 0.20 }] },
          { name: 'Cast to Horizontal (Impulso)', value: 1.50, deductions: [{ id: 'u4p2', text: 'Bajo la horizontal', val: 0.30 }] },
          { name: 'Squat-on / Pike-on', value: 1.50, deductions: [{ id: 'u4p3', text: 'Pies alternados', val: 0.20 }] },
          { name: 'Long Hang Kip', value: 1.50, deductions: [] },
          { name: 'Back Hip Circle (Vuelta atrás)', value: 2.00, deductions: [{ id: 'u4p4', text: 'Falta de continuidad', val: 0.10 }] },
          { name: 'Underswing/Counterswings', value: 1.00, deductions: [] },
          { name: 'Dismount: Tap Swing 1/2 Turn', value: 1.00, deductions: [] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Fish Mount (Entrada)', value: 1.00, deductions: [] },
          { name: 'Cartwheel (Medialuna)', value: 1.50, deductions: [] },
          { name: '1/2 Turn in Relevé', value: 1.00, deductions: [] },
          { name: 'Split Jump (120°)', value: 1.50, deductions: [{ id: 'u4b1', text: 'Amplitud insuficiente', val: 0.20 }] },
          { name: 'Cross Handstand (Vertical)', value: 2.00, deductions: [{ id: 'u4b2', text: 'No llega a vertical', val: 0.30 }] },
          { name: 'Dismount: Cartwheel to Side HS', value: 1.50, deductions: [] },
          { name: 'Coreografía y enlaces', value: 1.50, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Back Walkover (150°)', value: 1.50, deductions: [{ id: 'u4f1', text: 'Amplitud insuficiente', val: 0.20 }] },
          { name: 'Front Handspring Step-out', value: 1.50, deductions: [] },
          { name: 'Split Leap (120°)', value: 1.50, deductions: [] },
          { name: '360° Turn in Relevé', value: 1.50, deductions: [] },
          { name: 'Round-off BHS BHS series', value: 3.00, deductions: [{ id: 'u4f2', text: 'Falta de ritmo/pausa', val: 0.10 }] },
          { name: 'Cierre coreográfico', value: 1.00, deductions: [] }
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
          { name: 'Front Handspring over Vault Table', value: 10.00, deductions: [
            { id: 'u5v1', text: 'Pies no simultáneos en trampolín', val: 0.20 },
            { id: 'u5v2', text: 'Falta de fase de vuelo (altura)', val: 0.30 },
            { id: 'u5v3', text: 'Repulsión tardía/hombros', val: 0.50 }
          ]}
        ] 
      },
      'PARALELAS': { 
        baseScore: 10.00, 
        isSpecial: true, // Indica que tiene lógica de VP opcional
        elements: [
          { name: 'Kip (Apoyo de pecho)', value: 1.50, deductions: [] },
          { name: 'Cast above horizontal', value: 1.50, deductions: [{ id: 'u5p1', text: 'Bajo horizontal', val: 0.30 }] },
          { name: 'Clear Hip Circle (above horiz.)', value: 2.00, deductions: [{ id: 'u5p2', text: 'Cadera toca barra', val: 0.20 }] },
          { name: 'Long Hang Kip', value: 1.00, deductions: [] },
          { name: 'Back Hip Circle / Giant prep', value: 1.50, deductions: [] },
          { name: 'Dismount: Flyaway (Mortal)', value: 2.50, deductions: [{ id: 'u5p3', text: 'Falta de altura', val: 0.30 }] },
          { name: 'OPCIÓN: Salida Nivel 4 (SV 9.5)', value: 0.00, isOption: true, subValue: 0.50, deductions: [] }
        ] 
      },
      'VIGA': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Acro Series (BWO-BWO)', value: 2.00, deductions: [{ id: 'u5b1', text: 'Falta de continuidad', val: 0.10 }] },
          { name: '1/1 Turn in Passé', value: 1.50, deductions: [] },
          { name: 'Split Jump (150°)', value: 1.50, deductions: [{ id: 'u5b2', text: 'Amplitud insuficiente', val: 0.20 }] },
          { name: 'Leap split (150°)', value: 1.50, deductions: [] },
          { name: 'Sissonne', value: 1.00, deductions: [] },
          { name: 'Dismount: Back Tuck (Mortal)', value: 1.50, deductions: [] },
          { name: 'Coreografía', value: 1.00, deductions: [] }
        ] 
      },
      'SUELO': { 
        baseScore: 10.00, 
        elements: [
          { name: 'Front Tuck (Mortal adelante)', value: 2.00, deductions: [{ id: 'u5f1', text: 'Falta de altura', val: 0.30 }] },
          { name: 'Front Handspring series', value: 1.50, deductions: [] },
          { name: 'Leap Switch (150°)', value: 1.50, deductions: [] },
          { name: '1/1 Turn in Passé', value: 1.00, deductions: [] },
          { name: 'RO BHS Back Tuck series', value: 3.00, deductions: [] },
          { name: 'Cierre coreográfico', value: 1.00, deductions: [] }
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
