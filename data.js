// =====================================================
// ELEMENTOS OBLIGATORIOS POR NIVEL Y APARATO
// EXTRAÍDOS DIRECTAMENTE DE:
// - PROGRAMA NIVEL E 2026 - CAG
// - USAG 2021-2029
// =====================================================

window.LEVEL_DATA = {

  // ---------------------------------------------------
  // CAG - NIVEL E1 B (Sólo Suelo y Salto)
  // ---------------------------------------------------
  'E1B': {
    label: 'E1B — CAG',
    color: '#3d9970',
    aparatos: {
      'SALTO': [
        'Salto en extensión hacia colchones (Única opción)'
      ],
      'SUELO': [
        'Enlace Coreográfico',
        'Passé con una pierna',
        'Passé con la otra pierna (al frente)',
        'Dos pasos en relevé',
        'Rol adelante agrupado',
        'Salto en extensión (continuado del rol)',
        'Salto Gato',
        'Vertical',
        'Cuclillas (mantener 1")',
        'Vela',
        'Sapo'
      ]
    }
  },

  // ---------------------------------------------------
  // CAG - NIVEL E1 A (4 Aparatos)
  // ---------------------------------------------------
  'E1A': {
    label: 'E1A — CAG',
    color: '#2196f3',
    aparatos: {
      'SALTO': [
        'Salto en extensión hacia colchones (Única opción)'
      ],
      'PARALELAS': [
        'Entrada: Salto al Apoyo',
        'Flotante',
        'Media vuelta adelante brazos flexionados - Descenso',
        'Posición de escuadra colgada (mantener 2")'
      ],
      'VIGA': [
        'Entrada a horcajadas, cuclillas y posición de pie',
        'Passé con una pierna',
        'Passé con la otra',
        'Dos pasos en relevé',
        'Salto en extensión',
        'Cuclillas y vuelta a posición de pie',
        'Salida: Salto en extensión (desde el extremo)'
      ],
      'SUELO': [
        'Enlace Coreográfico',
        'Passé con una pierna',
        'Passé con la otra pierna (al frente)',
        'Dos pasos en relevé',
        'Rol adelante agrupado',
        'Salto en extensión (continuado del rol)',
        'Salto Gato',
        'Vertical',
        'Cuclillas (mantener 1")',
        'Vela',
        'Sapo'
      ]
    }
  },

  // ---------------------------------------------------
  // CAG - NIVEL E2
  // ---------------------------------------------------
  'E2': {
    label: 'E2 — CAG',
    color: '#9c27b0',
    aparatos: {
      'SALTO': [
        // La altura de los colchones varía según categoría, pero son ambos saltos (valor 5.00 y 5.00 c/u)
        'Salto en extensión hacia colchones',
        'Vertical caída dorsal sobre el colchón'
      ],
      'PARALELAS': [
        'Entrada salto al apoyo',
        'Flotante',
        'Pasaje de pierna, toma palmar (2 segundos)',
        'Flotante atrás a posición de pie',
        'Posición de escuadra colgada (2 segundos)'
      ],
      'VIGA': [
        'Entrada a horcajada, cuclillas y posición de pie',
        'Salto Gato',
        'Battement al frente con una pierna',
        'Arabesque con la otra pierna (30º)',
        'Passé con una pierna y Passé con la otra',
        'Enlace Coreográfico',
        '1/4 giro sobre dos pies',
        'Salida: Salto en extensión'
      ],
      'SUELO': [
        'Enlace Coreográfico',
        'Dos (2) 1/2 giros (180º) sobre dos pies',
        'Passé - Developpe',
        'Passé - Developpe (con la otra pierna)',
        'Salto Gato',
        'Vertical',
        'Rol adelante agrupado',
        'Medialuna',
        'Arabesca (30º)',
        'Cuclillas',
        'Vela',
        'Sapo'
      ]
    }
  },

  // ---------------------------------------------------
  // CAG - NIVEL E3
  // ---------------------------------------------------
  'E3': {
    label: 'E3 — CAG',
    color: '#e91e63',
    aparatos: {
      'SALTO': [
        'Vuelo Mortero - Recepción acostada sobre colchones'
      ],
      'PARALELAS': [
        'Vuelta Pajarito',
        'Flotante al apoyo',
        'Vuelta atrás',
        'Pasaje de pierna toma palmar (2 seg)',
        'Piso-Piso (colocación de ambos pies en barra), cuclillas, salida de salto extendido'
      ],
      'VIGA': [
        'Entrada a horcajada, escuadra y posición de pie',
        'Salto Gato',
        'Battement de pierna al frente',
        'Paloma (horizontal)',
        'Vertical 30º',
        'Dos (2) 1/2 giros (180º) sobre dos pies',
        'Enlace Coreográfico',
        'Salida: Salto en extensión'
      ],
      'SUELO': [
        'Enlace Coreográfico',
        '1/2 giro en passé sobre 1 pie',
        '1/2 giro en passe sobre 2 pies',
        'Jette a dos piernas (90º)',
        'Salto en Extensión',
        'Medialuna',
        'Vertical Rol',
        'Salto en extensión con 1/2 giro',
        'Rol atrás agrupado o extendido',
        'Rondo',
        'Salto en extensión',
        'Enlace Coreográfico (final)'
      ]
    }
  },


  // ---------------------------------------------------
  // USAG NIVEL 1 B y 1 A
  // ---------------------------------------------------
  'USAG1B': {
    label: 'Prog. 1 y 2 USA', // Simplified entry level representation
    color: '#ff9800',
    aparatos: {
      'SALTO': [
        'Salto en extensión',
        'Vertical caída dorsal'
      ],
      'PARALELAS': [
        'Pullover (entrada)',
        'Vuelta pajarito (Cast)',
        'Vuelta atrás (Back hip circle)',
        'Salida balanceada (Underswing)'
      ],
      'VIGA': [
        'Entrada al apoyo',
        'Arabesca (30°)',
        'Salto de extensión',
        'Medialuna a vertical lateral a posición de pie (salida)'
      ],
      'SUELO': [
        'Vertical',
        'Medialuna',
        'Rol atrás',
        'Rol adelante'
      ]
    }
  },

  'USAG2': {
    label: 'Prog. 3 USA',
    color: '#ff5722',
    aparatos: {
      'SALTO': [
        'Vertical caída dorsal (mayor altura)'
      ],
      'PARALELAS': [
        'Pullover',
        'Vuelta pajarito (cast) al horizontal',
        'Vuelta atrás (back hip circle)',
        'Salida de underswing'
      ],
      'VIGA': [
        'Salto extensión',
        'Pivotes (1/2 giros)',
        'Arabesca 45°',
        'Salida de medialuna o vertical lateral'
      ],
      'SUELO': [
        'Flic-flac asistido o rolido',
        'Medialuna paso a paso',
        'Split de piernas',
        'Giro en un pie'
      ]
    }
  }

};

// PREDISPOSICIONES Y ETIQUETAS
window.PRED_LABELS = {
  '1': { text: '🏆 Competitiva comprometida', cls: 'pm1' },
  '2': { text: '⭐ Competitiva en desarrollo', cls: 'pm2' },
  '3': { text: '💪 Deportiva sin competencia', cls: 'pm3' },
  '4': { text: '🌸 Recreativa', cls: 'pm4' },
  5: { text: '👪 Asistencial', cls: 'p5' }
};

// ---------------------------------------------------
// ESTRUCTURA DE GRUPOS (LUN-MIE / MAR-JUE / SABADOS)
// ---------------------------------------------------
window.CLUB_GROUPS = [
  // Lunes y Miércoles
  { id: 'lm_lucia_3_5',     days: 'Lunes y Miércoles', time: '17:00 - 18:30', teacher: 'Lucía', age: '3 a 5 años', levelDetail: '' },
  { id: 'lm_lola_6_9',      days: 'Lunes y Miércoles', time: '17:30 - 19:00', teacher: 'Lola', age: '6 a 9 años', levelDetail: '' },
  { id: 'lm_milagros_10_15',days: 'Lunes y Miércoles', time: '17:30 - 19:00', teacher: 'Milagros', age: '10 a 15 años', levelDetail: '' },

  // Martes y Jueves
  { id: 'mj_lolacata_3_5',  days: 'Martes y Jueves',   time: '17:00 - 18:30', teacher: 'Lola-Catalina', age: '3 a 5 años', levelDetail: '' },
  { id: 'mj_maylen_6_9',    days: 'Martes y Jueves',   time: '17:30 - 19:00', teacher: 'Maylen', age: '6 a 9 años', levelDetail: 'Iniciales' },
  { id: 'mj_sabrina_6_9',   days: 'Martes y Jueves',   time: '17:30 - 19:00', teacher: 'Sabrina', age: '6 a 9 años', levelDetail: 'Avanzado' },
  { id: 'mj_catalina_10_15',days: 'Martes y Jueves',   time: '18:30 - 20:00', teacher: 'Catalina', age: '10 a 15 años', levelDetail: 'Inicial' },
  { id: 'mj_milagros_10_15',days: 'Martes y Jueves',   time: '17:30 - 19:00', teacher: 'Milagros', age: '10 a 15 años', levelDetail: 'Avanzado' },

  // Sábados
  { id: 's_lucialola_3_5',  days: 'Sábado',            time: '10:00 - 13:00', teacher: 'Lucía-Lola', age: '3 a 5 años', levelDetail: '' },
  { id: 's_maylen_6_9',     days: 'Sábado',            time: '10:00 - 13:00', teacher: 'Maylen', age: '6 a 9 años', levelDetail: 'Inicial' },
  { id: 's_sabrina_6_9',    days: 'Sábado',            time: '10:00 - 13:00', teacher: 'Sabrina', age: '6 a 9 años', levelDetail: 'Avanzado' },
  { id: 's_catalina_10_15', days: 'Sábado',            time: '10:00 - 13:00', teacher: 'Catalina', age: '10 a 15 años', levelDetail: 'Inicial' },
  { id: 's_milagros_10_15', days: 'Sábado',            time: '10:00 - 13:00', teacher: 'Milagros', age: '10 a 15 años', levelDetail: 'Avanzado' }
];

// ---------------------------------------------------
// CONFIGURACIÓN DE CICLO Y FERIADOS NACIONALES
// ---------------------------------------------------
window.CLUB_CONFIG = {
  // Fecha de inicio de clases
  periodStart: '2026-03-07',
  
  // Fecha de corte de la evaluación actual (puede actualizarse)
  periodEnd: '2026-04-18', 
  
  // Array de feriados formato YYYY-MM-DD
  holidays: [
    '2026-03-23', // Puente
    '2026-03-24', // Memoria
    '2026-04-02', // Malvinas / Jueves Santo
    '2026-04-04', // Sábado Santo / Feriado
    '2026-05-25'  // Revolución de Mayo
    // *Se irán agregando feriados puente aquí*
  ]
};
