/**
 * EVAL-DATA.JS — Revisión exhaustiva v2
 * Fuente única: "Ejercicios Obligatorios de Nivel Escuela GAF — Programa CAG 2026" (90 págs.)
 *
 * NOTAS DE IMPLEMENTACIÓN:
 * - val: valor máximo de la deducción ("hasta X")
 * - Las deducciones fijas (sin "hasta") se marcan con fixed: true
 * - Las carreras vacías siguen escala: #1 sin deducción / #2 = 1.00 / #3 = 3.00 / NULO
 * - E1B: solo SALTO y SUELO (2 aparatos)
 * - E2 y E3 SALTO: dos elementos independientes con sus propios puntajes
 * - Orden obligatorio en E1A y E1B suelo/viga; libre en E2 y E3
 */

window.EVAL_CONSTANTS = {
  CATEGORIES: [
    { name: 'Pre-Mini',     min: 6,  max: 7  },
    { name: 'Mini',         min: 8,  max: 9  },
    { name: 'Pre-Infantil', min: 10, max: 11 },
    { name: 'Infantil',     min: 12, max: 13 },
    { name: 'Juvenil',      min: 14, max: 15 },
    { name: 'Mayor',        min: 16, max: 99 }
  ],
  CUTOFF_MONTH: 11,
  CUTOFF_DAY: 31
};

// ═══════════════════════════════════════════════════════════════════════════
// SALTO — E1A y E1B
// Un único salto: Salto en extensión hacia colchones. VP: 10.00
// Altura Pre-Mini 20 cm / Mini en adelante 40 cm
// ═══════════════════════════════════════════════════════════════════════════
const SALTO_E1 = {
  baseScore: 10.00,
  nota: 'Altura: Pre-Mini 20 cm | Mini, Pre-Infantil, Infantil, Juvenil y Mayor 40 cm',
  elements: [
    {
      name: 'Salto en extensión hacia colchones',
      value: 10.00,
      deductions: [
        // ── Carreras vacías ──────────────────────────────────────
        { id: 'sv_c1',   text: 'Carrera vacía #1 (sin tocar la tabla)',                fixed: true, val: 0.00, nota: 'Sin deducción' },
        { id: 'sv_c2',   text: 'Carrera vacía #2',                                     fixed: true, val: 1.00 },
        { id: 'sv_c3',   text: 'Carrera vacía #3',                                     fixed: true, val: 3.00 },
        { id: 'sv_nulo', text: 'Salto nulo — puede volver con deducción',               fixed: true, val: 3.00, nota: 'NULO — se permite reintentar descontando 3.00' },
        // ── Faltas generales ─────────────────────────────────────
        { id: 'sv_din',  text: 'Dinamismo insuficiente (velocidad / potencia)',          val: 0.30 },
        { id: 'sv_ay1',  text: 'Ayuda durante el salto extendido',                      fixed: true, val: 2.00 },
        { id: 'sv_ay2',  text: 'Ayuda durante el aterrizaje del salto extendido',       fixed: true, val: 0.50 },
        { id: 'sv_caid', text: 'Caída posterior a la ayuda (deducción adicional)',       fixed: true, val: 0.50 },
        // ── Carrera y contacto con la tabla ──────────────────────
        { id: 'sv_vel',  text: 'No mantener la velocidad horizontal hacia la tabla',    val: 0.30 },
        { id: 'sv_inc',  text: 'Inclinación excesiva del cuerpo al contacto con tabla', val: 0.30 },
        { id: 'sv_reb',  text: 'Brinco adicional / doble rebote / pique alternado',     fixed: true, val: 0.30, nota: 'Cada vez 0.30' },
        // ── Salto en extensión ───────────────────────────────────
        { id: 'sv_alt',  text: 'Falta de altura en el salto en extensión',              val: 0.50 },
        { id: 'sv_pie',  text: 'Pies flexionados o relajados',                          val: 0.10 },
        { id: 'sv_sep',  text: 'Piernas separadas',                                     val: 0.20 },
        { id: 'sv_dob',  text: 'Piernas dobladas',                                      val: 0.30 },
        { id: 'sv_cab',  text: 'No mantener posición neutra de la cabeza',              val: 0.30 },
        { id: 'sv_arq',  text: 'Cuerpo arqueado durante el salto',                      val: 0.30 },
        { id: 'sv_car',  text: 'Cuerpo carpado durante el salto',                       val: 0.50 },
        { id: 'sv_des',  text: 'Desviación de la dirección recta',                      val: 0.30 },
        { id: 'sv_dem',  text: 'No aterrizar en demi-plié controlado',                  val: 0.50 },
        { id: 'sv_cf',   text: 'Caída (manos/rodillas/cadera) tras aterrizaje en pies', fixed: true, val: 0.50 },
        // ── Fase de aterrizaje ───────────────────────────────────
        { id: 'sv_at1',  text: 'Pie(s) se deslizan / levantan para juntar talones',     val: 0.10 },
        { id: 'sv_at2',  text: 'Pies separados a la cadera sin juntar talones',         fixed: true, val: 0.05 },
        { id: 'sv_at3',  text: 'Brinco pequeño / ajuste / pies escalonados',            val: 0.10 },
        { id: 'sv_at4',  text: 'Pies más separados que el ancho de la cadera',          fixed: true, val: 0.10 },
        { id: 'sv_bal',  text: 'Balanceo de brazo(s) para mantener el equilibrio',      val: 0.10 },
        { id: 'sv_dir',  text: 'Desviación de la dirección recta en el aterrizaje',     val: 0.10 },
        { id: 'sv_pas',  text: 'Pasos en el aterrizaje (c/paso, máx 4 — hasta 0.40)',   fixed: true, val: 0.10, nota: 'Cada vez 0.10, máx 0.40' },
        { id: 'sv_sal',  text: 'Salto o paso largo (~1 m o más, máx 0.40)',             fixed: true, val: 0.20, nota: 'Cada vez 0.20, máx 0.40' },
        { id: 'sv_tro',  text: 'Movimientos adicionales de tronco para mantener equilibrio', val: 0.20 },
        { id: 'sv_pos',  text: 'Postura incorrecta del cuerpo en el aterrizaje',        val: 0.20 },
        { id: 'sv_snt',  text: 'Sentadilla en el aterrizaje (cadera ≤ rodillas)',        val: 0.30 },
        { id: 'sv_roz',  text: 'Rozar/tocar colchón con manos (no apoyo)',              val: 0.30 },
        { id: 'sv_ay3',  text: 'Ayuda en el aterrizaje',                                fixed: true, val: 0.50 },
        { id: 'sv_apo',  text: 'Apoyo en colchón con una o dos manos',                  fixed: true, val: 0.50 },
        { id: 'sv_rod',  text: 'Caída sobre rodilla(s) o cadera en colchón',            fixed: true, val: 0.50 },
        { id: 'sv_nop',  text: 'No aterrizar con los pies primero',                     fixed: true, val: 2.00, nota: 'Incluye la caída' }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// SALTO — E2
// Dos saltos: Salto en extensión (5.00) + Vertical caída dorsal (5.00)
// Altura Pre-Mini 20 cm / Mini en adelante 40 cm
// ═══════════════════════════════════════════════════════════════════════════
const SALTO_E2 = {
  baseScore: 10.00,
  nota: 'DOS saltos: Salto en extensión (VP 5.00) + Vertical caída dorsal (VP 5.00). Altura Pre-Mini 20 cm | Mini+ 40 cm',
  elements: [
    {
      name: '① Salto en extensión hacia colchones (VP 5.00)',
      value: 5.00,
      deductions: [
        { id: 'e2_c1',   text: 'Carrera vacía #1 (sin tocar tabla)',                   fixed: true, val: 0.00, nota: 'Sin deducción' },
        { id: 'e2_c2',   text: 'Carrera vacía #2',                                     fixed: true, val: 1.00 },
        { id: 'e2_c3',   text: 'Carrera vacía #3',                                     fixed: true, val: 3.00 },
        { id: 'e2_nulo', text: 'Salto nulo — puede reintentar',                        fixed: true, val: 3.00, nota: 'NULO — 3.00 de descuento' },
        { id: 'e2_din',  text: 'Dinamismo insuficiente',                                val: 0.30 },
        { id: 'e2_ay1',  text: 'Ayuda durante el salto extendido',                      fixed: true, val: 2.00 },
        { id: 'e2_reb',  text: 'Brinco adicional / doble rebote / pique con un pie',    fixed: true, val: 0.30, nota: 'Cada vez' },
        { id: 'e2_alt',  text: 'Falta de altura',                                       val: 0.50 },
        { id: 'e2_pie',  text: 'Pies flexionados o relajados',                          val: 0.10 },
        { id: 'e2_sep',  text: 'Piernas separadas',                                     val: 0.20 },
        { id: 'e2_dob',  text: 'Piernas dobladas',                                      val: 0.30 },
        { id: 'e2_cab',  text: 'No mantener posición neutra de la cabeza',              val: 0.30 },
        { id: 'e2_arq',  text: 'Cuerpo arqueado',                                       val: 0.30 },
        { id: 'e2_car',  text: 'Cuerpo carpado',                                        val: 0.50 },
        { id: 'e2_des',  text: 'Desviación de la dirección recta',                      val: 0.30 },
        { id: 'e2_dem',  text: 'No aterrizar en demi-plié controlado',                  val: 0.50 },
        { id: 'e2_pas',  text: 'Pasos en aterrizaje (c/paso, máx 0.40)',                fixed: true, val: 0.10 },
        { id: 'e2_tro',  text: 'Movimientos adicionales de tronco',                     val: 0.20 },
        { id: 'e2_snt',  text: 'Sentadilla en aterrizaje',                              val: 0.30 },
        { id: 'e2_apo',  text: 'Apoyo en colchón con manos',                            fixed: true, val: 0.50 },
        { id: 'e2_nop',  text: 'No aterrizar con los pies primero',                     fixed: true, val: 2.00 }
      ]
    },
    {
      name: '② Vertical — Caída dorsal sobre colchones (VP 5.00)',
      value: 5.00,
      deductions: [
        { id: 'e2v_pat',  text: 'Patada adicional a parada de manos',                   fixed: true, val: 0.50, nota: 'Cada vez' },
        { id: 'e2v_ay',   text: 'Ayuda del entrenador tras apoyo de manos',             fixed: true, val: 2.00 },
        { id: 'e2v_bra',  text: 'No mantener brazos junto a orejas al llegar a parada', val: 0.20 },
        { id: 'e2v_mp',   text: 'Colocación adicional de manos (pasos/brincos)',         fixed: true, val: 0.10, nota: 'Cada vez, máx 0.30' },
        { id: 'e2v_pie',  text: 'Pies flexionados o relajados',                          val: 0.10 },
        { id: 'e2v_cab',  text: 'No mantener posición neutra de la cabeza',              val: 0.30 },
        { id: 'e2v_arq',  text: 'Cuerpo arqueado en parada de manos',                    val: 0.30 },
        { id: 'e2v_car',  text: 'Cuerpo carpado en parada de manos',                     val: 0.50 },
        { id: 'e2v_sep',  text: 'Piernas separadas',                                     val: 0.20 },
        { id: 'e2v_dob',  text: 'Piernas dobladas',                                      val: 0.30 },
        { id: 'e2v_hom',  text: 'Alineación incorrecta de hombros (ángulo <180°)',       val: 0.30 },
        { id: 'e2v_brz',  text: 'Brazos doblados',                                       val: 0.50 },
        { id: 'e2v_at',   text: 'No aterrizar en extensión en espalda (máx 1.00)',        val: 1.00 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// SALTO — E3
// Pre-Mini: ídem E2 (salto extensión 5.00 + vertical caída dorsal 5.00)
// Mini en adelante: Vuelo Mortero — Recepción acostada (10.00)
//   Altura Mini 60 cm / Pre-Infantil, Infantil, Juvenil y Mayor 80 cm
// ═══════════════════════════════════════════════════════════════════════════
const SALTO_E3 = {
  baseScore: 10.00,
  nota: 'PRE-MINI: Salto ext (5.00) + Vertical caída dorsal (5.00) — igual E2. MINI+: Vuelo Mortero (10.00). Altura Mini 60 cm / Pre-Infantil+ 80 cm',
  elements: [
    {
      name: '① PRE-MINI — Salto en extensión hacia colchones (VP 5.00)',
      value: 5.00,
      nota: 'Solo categoría Pre-Mini. Mismo reglamento que E2.',
      deductions: [
        { id: 'e3pm_c2',  text: 'Carrera vacía #2',                         fixed: true, val: 1.00 },
        { id: 'e3pm_c3',  text: 'Carrera vacía #3',                         fixed: true, val: 3.00 },
        { id: 'e3pm_din', text: 'Dinamismo insuficiente',                     val: 0.30 },
        { id: 'e3pm_alt', text: 'Falta de altura',                            val: 0.50 },
        { id: 'e3pm_sep', text: 'Piernas separadas',                          val: 0.20 },
        { id: 'e3pm_dob', text: 'Piernas dobladas',                           val: 0.30 },
        { id: 'e3pm_arq', text: 'Cuerpo arqueado',                            val: 0.30 },
        { id: 'e3pm_car', text: 'Cuerpo carpado',                             val: 0.50 },
        { id: 'e3pm_dem', text: 'No aterrizar en demi-plié',                  val: 0.50 },
        { id: 'e3pm_nop', text: 'No aterrizar con los pies primero',          fixed: true, val: 2.00 }
      ]
    },
    {
      name: '① PRE-MINI — Vertical caída dorsal (VP 5.00)',
      value: 5.00,
      nota: 'Solo categoría Pre-Mini. Mismo reglamento que E2.',
      deductions: [
        { id: 'e3pv_pat', text: 'Patada adicional a parada de manos',         fixed: true, val: 0.50 },
        { id: 'e3pv_ay',  text: 'Ayuda del entrenador tras apoyo de manos',   fixed: true, val: 2.00 },
        { id: 'e3pv_brz', text: 'Brazos doblados',                             val: 0.50 },
        { id: 'e3pv_cab', text: 'No mantener posición neutra de la cabeza',    val: 0.30 },
        { id: 'e3pv_arq', text: 'Cuerpo arqueado',                             val: 0.30 },
        { id: 'e3pv_car', text: 'Cuerpo carpado',                              val: 0.50 },
        { id: 'e3pv_sep', text: 'Piernas separadas',                           val: 0.20 },
        { id: 'e3pv_dob', text: 'Piernas dobladas',                            val: 0.30 },
        { id: 'e3pv_at',  text: 'No aterrizar en extensión en espalda',        val: 1.00 }
      ]
    },
    {
      name: '① MINI en adelante — Vuelo Mortero — Recepción acostada (VP 10.00)',
      value: 10.00,
      nota: 'Categorías Mini, Pre-Infantil, Infantil, Juvenil y Mayor. Altura Mini 60 cm / Pre-Infantil+ 80 cm.',
      deductions: [
        // ── Carreras vacías (escala Mini+) ───────────────────────
        { id: 'e3m_c1',   text: 'Carrera vacía #1 (sin apoyarse en colchón)',           fixed: true, val: 0.00, nota: 'Sin deducción' },
        { id: 'e3m_c2',   text: 'Carrera vacía #2',                                     fixed: true, val: 3.00 },
        { id: 'e3m_c3',   text: 'Carrera vacía #3',                                     fixed: true, val: 0.00, nota: 'NULO' },
        { id: 'e3m_nulo', text: 'Salto nulo — puede reintentar',                        fixed: true, val: 3.00, nota: 'NULO — 3.00 de descuento' },
        // ── Faltas generales ─────────────────────────────────────
        { id: 'e3m_din',  text: 'Dinamismo insuficiente',                                val: 0.30 },
        { id: 'e3m_ay',   text: 'Ayuda del entrenador tras apoyo de manos',             fixed: true, val: 2.00 },
        // ── Errores de cuerpo (c/fase) ───────────────────────────
        { id: 'e3m_cab',  text: 'No mantener posición neutra de la cabeza (c/fase)',     val: 0.10 },
        { id: 'e3m_pie',  text: 'Pies flexionados / relajados (c/fase)',                 val: 0.10 },
        { id: 'e3m_sep',  text: 'Piernas separadas (c/fase)',                            val: 0.20 },
        { id: 'e3m_dob',  text: 'Piernas dobladas (c/fase)',                             val: 0.30 },
        { id: 'e3m_arq',  text: 'Cuerpo arqueado (c/fase)',                              val: 0.30 },
        { id: 'e3m_car',  text: 'Cuerpo carpado (c/fase)',                               val: 0.50 },
        // ── Carrera y contacto con la tabla ──────────────────────
        { id: 'e3m_vel',  text: 'No mantener velocidad horizontal de la carrera',        val: 0.30 },
        { id: 'e3m_inc',  text: 'Inclinación excesiva al contacto con la tabla',         val: 0.30 },
        { id: 'e3m_reb',  text: 'Brinco adicional en el botador',                        fixed: true, val: 0.30 },
        { id: 'e3m_dir',  text: 'Desviación de dirección recta (contacto inicial)',       val: 0.30 },
        { id: 'e3m_hom',  text: 'Alineación incorrecta de hombros (<180°)',               val: 0.30 },
        // ── Fase de apoyo ─────────────────────────────────────────
        { id: 'e3m_brz1', text: 'Brazos doblados en el apoyo',                           val: 0.50 },
        { id: 'e3m_brz2', text: 'Brazos completamente doblados — cabeza toca colchón',   fixed: true, val: 2.00, nota: 'Incluye 0.50 por flex. excesiva' },
        { id: 'e3m_ver',  text: 'No mostrar vertical invertida (realiza rol adelante)',   val: 2.00 },
        { id: 'e3m_v45',  text: 'Manos contactan 1°-45° más allá de la vertical',        val: 0.50, nota: '0.05 a 0.50' },
        { id: 'e3m_v89',  text: 'Manos contactan 46°-89° más allá de la vertical',       val: 1.00, nota: '0.55 a 1.00' },
        { id: 'e3m_cin',  text: 'Ambas manos más allá de la línea de cinta (80 cm)',     fixed: true, val: 0.50 },
        { id: 'e3m_cins', text: 'Una mano dentro, otra sobre la línea',                  fixed: true, val: 0.20 },
        { id: 'e3m_mp',   text: 'Colocación adicional de manos (c/vez, máx 0.30)',       fixed: true, val: 0.10 },
        { id: 'e3m_1m',   text: 'Solo una mano toca el colchón (mortal)',                fixed: true, val: 3.00 },
        // ── Aterrizaje ────────────────────────────────────────────
        { id: 'e3m_at1',  text: 'Aterriza en pies y se baja del colchón',               fixed: true, val: 1.00 },
        { id: 'e3m_at2',  text: 'Aterriza sentada (ángulo 90°) y se baja',              fixed: true, val: 0.50 },
        { id: 'e3m_at3',  text: 'Aterriza en espalda arqueada/piernas dobladas y se baja', fixed: true, val: 0.50 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// PARALELAS — E1A (barrote metodológico bajo / paralela asimétrica)
// 4 elementos — orden OBLIGATORIO — VP 10.00
// Suma de valores: 1.00 + 0.60 + 0.60 + 0.60 = 2.80
// El resto del VP se completa con deducciones generales
// ═══════════════════════════════════════════════════════════════════════════
const PARALELAS_E1A = {
  baseScore: 10.00,
  nota: 'Orden obligatorio. Equipamiento: Barrote metodológico bajo O paralela asimétrica (subir superficie: Pre-Mini/Mini +40cm, Pre-Infantil +20cm, Infantil+ solo colchones reglamentarios).',
  elements: [
    {
      name: '1. Entrada: Salto al apoyo sin ayuda',
      value: 1.00,
      deductions: [
        { id: 'e1pa1', text: 'Alineación incorrecta del cuerpo', val: 0.20 }
      ]
    },
    {
      name: '2. Flotante',
      value: 0.60,
      deductions: [
        { id: 'e1pa2', text: 'Alineación incorrecta (no mostrar línea recta hombros-pies pecho ahuecado)', val: 0.20 },
        { id: 'e1pa3', text: 'Falta de control al regresar a la barra',                                   val: 0.10 }
      ]
    },
    {
      name: '3. Media vuelta adelante brazos flexionados — Descenso',
      value: 0.60,
      deductions: [
        { id: 'e1pa4', text: 'No mantener posición neutra de la cabeza',      val: 0.10 },
        { id: 'e1pa5', text: 'No dejar los brazos flexionados',               fixed: true, val: 0.20 },
        { id: 'e1pa6', text: 'No bajar ambas piernas al mismo tiempo',        fixed: true, val: 0.30 },
        { id: 'e1pa7', text: 'Apoyo del mentón en la barra al descender',     fixed: true, val: 0.30 },
        { id: 'e1pa8', text: 'No descender en forma controlada las piernas',  val: 0.20 },
        { id: 'e1pa9', text: 'No mostrar la toma dorsal',                     fixed: true, val: 0.30 }
      ]
    },
    {
      name: '4. Posición de escuadra colgada, brazos extendidos — Mantener 2"',
      value: 0.60,
      deductions: [
        { id: 'e1pa10', text: 'Amplitud de piernas insuficiente', val: 0.30 },
        { id: 'e1pa11', text: 'No mantener 2 segundos',           val: 0.20 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// PARALELAS — E2
// 5 elementos — orden LIBRE — VP 10.00
// ═══════════════════════════════════════════════════════════════════════════
const PARALELAS_E2 = {
  baseScore: 10.00,
  nota: 'Orden libre. Mismas especificaciones de equipamiento que E1A.',
  elements: [
    {
      name: '1. Entrada: Salto al apoyo sin ayuda',
      value: 1.00,
      deductions: [
        { id: 'e2pa1', text: 'Alineación incorrecta del cuerpo', val: 0.20 }
      ]
    },
    {
      name: '2. Flotante',
      value: 0.60,
      deductions: [
        { id: 'e2pa2', text: 'Alineación incorrecta (no mostrar línea recta)', val: 0.20 },
        { id: 'e2pa3', text: 'Falta de control al regresar a la barra',        val: 0.10 }
      ]
    },
    {
      name: '3. Pasaje de una pierna a toma palmar — Mantener 1" — Volver la pierna atrás',
      value: 0.80,
      deductions: [
        { id: 'e2pa4', text: 'Alineación incorrecta (no mantener cuerpo ahuecado)', val: 0.20 },
        { id: 'e2pa5', text: 'Falta de control al pasar la pierna adelante',        val: 0.10 },
        { id: 'e2pa6', text: 'Falta de control al regresar la pierna atrás',        val: 0.10 },
        { id: 'e2pa7', text: 'No mostrar la toma palmar',                           fixed: true, val: 0.30 },
        { id: 'e2pa8', text: 'No mantener 1 segundo',                               val: 0.20 }
      ]
    },
    {
      name: '4. Flotante atrás a posición de pie',
      value: 0.60,
      deductions: [
        { id: 'e2pa9',  text: 'Balanceo insuficiente de piernas hacia atrás',                   fixed: true, val: 0.10 },
        { id: 'e2pa10', text: 'Alineación incorrecta (no mostrar línea recta)',                  val: 0.20 },
        { id: 'e2pa11', text: 'Falta de control al regresar al colchón de recepción',            val: 0.10 }
      ]
    },
    {
      name: '5. Posición de escuadra colgada, brazos extendidos — Mantener 2"',
      value: 0.60,
      deductions: [
        { id: 'e2pa12', text: 'Amplitud de piernas insuficiente', val: 0.30 },
        { id: 'e2pa13', text: 'No mantener 2 segundos',           val: 0.20 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// PARALELAS — E3
// 5 elementos — orden LIBRE — VP 10.00
// ═══════════════════════════════════════════════════════════════════════════
const PARALELAS_E3 = {
  baseScore: 10.00,
  nota: 'Orden libre. Mismas especificaciones de equipamiento que E1A.',
  elements: [
    {
      name: '1. Entrada: Vuelta pajarito',
      value: 0.80,
      deductions: [
        { id: 'e3pa1', text: 'Paso / brinco / salto adicional antes de la vuelta pajarito', fixed: true, val: 0.10, nota: 'Cada vez' },
        { id: 'e3pa2', text: 'No levantar ambas piernas al mismo tiempo (despegue de 1 pie)', fixed: true, val: 0.30 },
        { id: 'e3pa3', text: 'Apoyo complementario — barbilla en barra antes del levantamiento', fixed: true, val: 0.30 },
        { id: 'e3pa4', text: 'No terminar en apoyo frontal extendido',                        val: 0.10 }
      ]
    },
    {
      name: '2. Flotante al apoyo',
      value: 0.60,
      deductions: [
        { id: 'e3pa5', text: 'Alineación incorrecta (no mostrar línea recta)', val: 0.20 },
        { id: 'e3pa6', text: 'Falta de control al regresar a la barra',        val: 0.10 }
      ]
    },
    {
      name: '3. Vuelta atrás',
      value: 0.60,
      deductions: [
        { id: 'e3pa7',  text: 'No mantener posición neutra de la cabeza',                              val: 0.10 },
        { id: 'e3pa8',  text: 'No mantener posición recta y ahuecada del cuerpo en todo momento',      val: 0.20 },
        { id: 'e3pa9',  text: 'No mantener contacto de cadera / muslos con la barra en todo momento',  val: 0.20 },
        { id: 'e3pa10', text: 'Falta de continuidad del círculo',                                      val: 0.10 }
      ]
    },
    {
      name: '4. Pasaje de una pierna a toma palmar — Mantener 1" — Volver la pierna atrás',
      value: 0.80,
      deductions: [
        { id: 'e3pa11', text: 'Alineación incorrecta (no mantener cuerpo ahuecado)', val: 0.20 },
        { id: 'e3pa12', text: 'Falta de control al pasar la pierna adelante',        val: 0.10 },
        { id: 'e3pa13', text: 'Falta de control al regresar la pierna atrás',        val: 0.10 },
        { id: 'e3pa14', text: 'No mostrar la toma palmar',                           fixed: true, val: 0.30 },
        { id: 'e3pa15', text: 'No mantener 1 segundo',                               val: 0.20 }
      ]
    },
    {
      name: '5. Piso-Piso — cuclillas en barra — Salida de salto extendido',
      value: 0.60,
      deductions: [
        { id: 'e3pa16', text: 'No mostrar posición recta y ahuecada del cuerpo en el vuelo', val: 0.20 },
        { id: 'e3pa17', text: 'Tocar la barra superior',                                     fixed: true, val: 0.50 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// VIGA — E1A
// 6 elementos + salida — ORDEN OBLIGATORIO — VP 10.00
// Puede comenzar desde cualquier parte de la viga
// La salida DEBE realizarse en el extremo de la viga
// ═══════════════════════════════════════════════════════════════════════════
const VIGA_E1A = {
  baseScore: 10.00,
  nota: 'ORDEN OBLIGATORIO. Puede comenzar desde cualquier parte de la viga. La salida debe realizarse en el extremo.',
  elements: [
    {
      name: '1. Entrada a horcajada (0.20) — Cuclillas (0.20) — Posición de pie',
      value: 0.40,
      deductions: [
        { id: 'e1v1', text: 'Falta de continuidad de sentada a cuclillas', val: 0.10 },
        { id: 'e1v2', text: 'No mantener 1 segundo en cuclillas',          val: 0.10 }
      ]
    },
    {
      name: '2. Passé con una pierna al frente — Mantener 1" — Brazos en cintura (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1v3',  text: 'No colocar los brazos en la cintura',             fixed: true, val: 0.10 },
        { id: 'e1v4',  text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e1v5',  text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '2b. Passé con la otra pierna al frente — Mantener 1" — Brazos en cintura (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1v3b', text: 'No colocar los brazos en la cintura',             fixed: true, val: 0.10 },
        { id: 'e1v4b', text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e1v5b', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '3. Dos pasos en relevé — Brazos en 2da posición (0.10 c/u)',
      value: 0.20,
      deductions: [
        { id: 'e1v6', text: 'Falta de precisión (cada paso)',            fixed: true, val: 0.10 },
        { id: 'e1v7', text: 'No colocar los brazos en 2da. posición',   fixed: true, val: 0.10 }
      ]
    },
    {
      name: '4. Salto en extensión',
      value: 0.60,
      deductions: [
        { id: 'e1v8',  text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 },
        { id: 'e1v9',  text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e1v10', text: 'Falta de altura en el salto',                    val: 0.20 }
      ]
    },
    {
      name: '5. Cuclillas — Mantener 1" — Vuelta a posición de pie',
      value: 0.20,
      deductions: [
        { id: 'e1v11', text: 'Falta de precisión',    val: 0.10 },
        { id: 'e1v12', text: 'No mantener 1 segundo', val: 0.10 }
      ]
    },
    {
      name: '6. Salida: Salto en extensión desde el extremo de la viga',
      value: 0.40,
      deductions: [
        { id: 'e1v13', text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 },
        { id: 'e1v14', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e1v15', text: 'Falta de altura en el salto',                    val: 0.20 },
        { id: 'e1v16', text: 'No salir por el extremo de la viga',             fixed: true, val: 0.10 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// VIGA — E2
// 8 elementos — ORDEN LIBRE — VP 10.00
// ═══════════════════════════════════════════════════════════════════════════
const VIGA_E2 = {
  baseScore: 10.00,
  nota: 'PUEDE cambiar el orden de los elementos.',
  elements: [
    {
      name: '1. Entrada a horcajada (0.20) — Cuclillas (0.20) — Posición de pie',
      value: 0.40,
      deductions: [
        { id: 'e2v1', text: 'Falta de continuidad de sentada a cuclillas', fixed: true, val: 0.10 },
        { id: 'e2v2', text: 'No mantener 1 segundo en cuclillas',          fixed: true, val: 0.10 }
      ]
    },
    {
      name: '2. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e2v3', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e2v4', text: 'No alternar las piernas',                    fixed: true, val: 0.30 },
        { id: 'e2v5', text: 'Falta de altura en el salto',                val: 0.20 }
      ]
    },
    {
      name: '3. Battement al frente con una pierna',
      value: 0.40,
      deductions: [
        { id: 'e2v6', text: 'No llegar la pierna a la horizontal', val: 0.20 }
      ]
    },
    {
      name: '4. Arabesque con la otra pierna (30°)',
      value: 0.40,
      deductions: [
        { id: 'e2v7', text: 'No levantar la pierna libre a mínimo 30° por arriba de la viga', val: 0.10 },
        { id: 'e2v8', text: 'No marcar la posición',                                          fixed: true, val: 0.05 },
        { id: 'e2v9', text: 'No mantener 1 segundo',                                          val: 0.10 }
      ]
    },
    {
      name: '5. Passé con una pierna — Mantener 1" — Brazos en cintura (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e2v10',  text: 'No colocar los brazos en la cintura',             fixed: true, val: 0.10 },
        { id: 'e2v11',  text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e2v12',  text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '5b. Passé con la otra pierna — Mantener 1" — Brazos en cintura (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e2v10b', text: 'No colocar los brazos en la cintura',             fixed: true, val: 0.10 },
        { id: 'e2v11b', text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e2v12b', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '6. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e2v13', text: 'No realiza mínimo 2 movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '7. ¼ giro sobre dos pies — Brazos en cintura',
      value: 0.20,
      deductions: [
        { id: 'e2v14', text: 'Falta de precisión', fixed: true, val: 0.10 }
      ]
    },
    {
      name: '8. Salida: Salto en extensión por el lateral de la viga',
      value: 0.40,
      deductions: [
        { id: 'e2v15', text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 },
        { id: 'e2v16', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e2v17', text: 'Falta de altura en el salto',                    val: 0.20 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// VIGA — E3
// 8 elementos — ORDEN LIBRE — VP 10.00
// ═══════════════════════════════════════════════════════════════════════════
const VIGA_E3 = {
  baseScore: 10.00,
  nota: 'PUEDE cambiar el orden de los elementos. La salida debe realizarse en el extremo de la viga.',
  elements: [
    {
      name: '1. Entrada a horcajada (0.20) — Escuadra piernas abiertas (0.40) — Mantener 2"',
      value: 0.60,
      deductions: [
        { id: 'e3v1', text: 'Falta de continuidad hasta el mantenimiento',   val: 0.10 },
        { id: 'e3v2', text: 'No mantener 2 segundos en la escuadra',         fixed: true, val: 0.20 }
      ]
    },
    {
      name: '2. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e3v3', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e3v4', text: 'No alternar las piernas',                    fixed: true, val: 0.30 },
        { id: 'e3v5', text: 'Falta de altura en el salto',                val: 0.20 }
      ]
    },
    {
      name: '3. Battement de pierna al frente',
      value: 0.40,
      deductions: [
        { id: 'e3v6', text: 'No llegar la pierna a la horizontal', val: 0.20 }
      ]
    },
    {
      name: '4. Paloma — Mantener 1" (horizontal)',
      value: 0.40,
      deductions: [
        { id: 'e3v7', text: 'No levantar la pierna libre a mínimo la horizontal', val: 0.20 },
        { id: 'e3v8', text: 'No mantener 1 segundo',                              val: 0.10 }
      ]
    },
    {
      name: '5. Vertical a 30°',
      value: 0.60,
      deductions: [
        { id: 'e3v9',  text: 'No lograr la vertical a 30°',                 val: 0.30 },
        { id: 'e3v10', text: 'No cerrar las piernas en la vertical',         fixed: true, val: 0.10 },
        { id: 'e3v11', text: 'Colocación incorrecta de manos (alternadas)',  fixed: true, val: 0.10 }
      ]
    },
    {
      name: '6. Dos ½ (180°) giros sobre dos pies — Brazos en corona (0.40 c/u)',
      value: 0.80,
      deductions: [
        { id: 'e3v12', text: 'Falta de precisión (cada giro)', val: 0.10, nota: 'Cada vez, hasta 0.10' }
      ]
    },
    {
      name: '7. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e3v13', text: 'No realiza mínimo 2 movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '8. Salida: Salto en extensión por el extremo de la viga',
      value: 0.40,
      deductions: [
        { id: 'e3v14', text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 },
        { id: 'e3v15', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e3v16', text: 'Falta de altura en el salto',                    val: 0.20 },
        { id: 'e3v17', text: 'No salir por el extremo de la viga',             fixed: true, val: 0.10 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// SUELO — E1A y E1B
// 10 elementos — ORDEN OBLIGATORIO — VP 10.00
// ═══════════════════════════════════════════════════════════════════════════
const SUELO_E1 = {
  baseScore: 10.00,
  nota: 'ORDEN OBLIGATORIO. No se puede cambiar el orden de los elementos.',
  elements: [
    {
      name: '1. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e1s1', text: 'No realiza mínimo 2 movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '2. Passé con una pierna — Mantener 1" — Brazos en cintura (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1s2', text: 'No colocar los brazos en la cintura',             fixed: true, val: 0.10 },
        { id: 'e1s3', text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e1s4', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '2b. Passé con la otra pierna — Mantener 1" — Brazos en cintura (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1s2b', text: 'No colocar los brazos en la cintura',             fixed: true, val: 0.10 },
        { id: 'e1s3b', text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e1s4b', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '3. Dos pasos en relevé — Brazos en 5ta posición (0.10 c/u)',
      value: 0.20,
      deductions: [
        { id: 'e1s5', text: 'Falta de precisión (cada paso)',             fixed: true, val: 0.10 },
        { id: 'e1s6', text: 'No colocar los brazos en 5ta. posición',    fixed: true, val: 0.10 }
      ]
    },
    {
      name: '4. Rol adelante agrupado',
      value: 0.60,
      deductions: [
        { id: 'e1s7', text: 'Levantarse del rol con piernas / pies cruzados',            val: 0.30 },
        { id: 'e1s8', text: 'Empujar el suelo con las manos para llegar a cuclillas',    fixed: true, val: 0.30 }
      ]
    },
    {
      name: '5. Continuado — Salto en extensión',
      value: 0.40,
      deductions: [
        { id: 'e1s9',  text: 'No aterrizar con los dos pies al mismo tiempo',        fixed: true, val: 0.10 },
        { id: 'e1s10', text: 'No aterrizar con los pies cerrados',                   val: 0.10 },
        { id: 'e1s11', text: 'Falta de altura en el salto',                          val: 0.20 },
        { id: 'e1s12', text: 'No realizar el salto continuado al rol adelante',      val: 0.20 }
      ]
    },
    {
      name: '6. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e1s13', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e1s14', text: 'No alternar las piernas',                    fixed: true, val: 0.30 },
        { id: 'e1s15', text: 'Falta de altura en el salto',                val: 0.20 }
      ]
    },
    {
      name: '7. Vertical (parada de manos)',
      value: 0.60,
      deductions: [
        { id: 'e1s16', text: 'No lograr la vertical',                              val: 0.30 },
        { id: 'e1s17', text: 'No cerrar las piernas en la vertical',               fixed: true, val: 0.10 },
        { id: 'e1s18', text: 'Colocación incorrecta de manos (alternadas)',         fixed: true, val: 0.10 },
        { id: 'e1s19', text: 'Patada extra a vertical',                            fixed: true, val: 0.50 }
      ]
    },
    {
      name: '8. Cuclillas — Mantener 1"',
      value: 0.20,
      deductions: [
        { id: 'e1s20', text: 'Falta de precisión',                                    val: 0.10 },
        { id: 'e1s21', text: 'No mantener 1 segundo',                                 val: 0.10 },
        { id: 'e1s22', text: 'Empujar el suelo con las manos para llegar a cuclillas', fixed: true, val: 0.30 }
      ]
    },
    {
      name: '9. Vela',
      value: 0.40,
      deductions: [
        { id: 'e1s23', text: 'No mantener posición agrupada cuando glúteos tocan el suelo', val: 0.20 },
        { id: 'e1s24', text: 'Apoyar las manos para ayudar a bajar',                        fixed: true, val: 0.30 }
      ]
    },
    {
      name: '10. Sapo — Mantener 1"',
      value: 0.40,
      deductions: [
        { id: 'e1s25', text: 'No mantener 1 segundo',                              val: 0.10 },
        { id: 'e1s26', text: 'No llegar con el pecho al suelo (falta de plegado)', val: 0.20 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// SUELO — E2
// 11 elementos — ORDEN LIBRE — VP 10.00
// ═══════════════════════════════════════════════════════════════════════════
const SUELO_E2 = {
  baseScore: 10.00,
  nota: 'PUEDE cambiar el orden de los elementos.',
  elements: [
    {
      name: '1. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e2s1', text: 'No realiza mínimo 2 movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '2. Dos ½ (180°) giros sobre dos pies — Brazos en corona (0.40 c/u)',
      value: 0.80,
      deductions: [
        { id: 'e2s2', text: 'Falta de precisión (cada giro)', val: 0.10, nota: 'Cada vez, hasta 0.10' }
      ]
    },
    {
      name: '3. Passé — Développé (0.20) — Passé — Développé (0.20)',
      value: 0.40,
      deductions: [
        { id: 'e2s3', text: 'No mantener brazos en 2da. posición en el passé',       fixed: true, val: 0.10 },
        { id: 'e2s4', text: 'No mantener brazos en 5ta. posición en el développé',   fixed: true, val: 0.10 },
        { id: 'e2s5', text: 'No mantener 1 segundo',                                 val: 0.10 },
        { id: 'e2s6', text: 'No levantar la rodilla a la altura de la cadera',       val: 0.20 }
      ]
    },
    {
      name: '4. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e2s7', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e2s8', text: 'No alternar las piernas',                    fixed: true, val: 0.30 },
        { id: 'e2s9', text: 'Falta de altura en el salto',                val: 0.20 }
      ]
    },
    {
      name: '5. Vertical (parada de manos)',
      value: 0.60,
      deductions: [
        { id: 'e2s10', text: 'No lograr la vertical',                              val: 0.30 },
        { id: 'e2s11', text: 'No cerrar las piernas en la vertical',               fixed: true, val: 0.10 },
        { id: 'e2s12', text: 'Colocación incorrecta de manos (alternadas)',         fixed: true, val: 0.10 },
        { id: 'e2s13', text: 'Patada extra a vertical',                            fixed: true, val: 0.50 }
      ]
    },
    {
      name: '6. Rol adelante agrupado',
      value: 0.60,
      deductions: [
        { id: 'e2s14', text: 'Empujar el suelo con las manos para llegar a cuclillas', fixed: true, val: 0.30 },
        { id: 'e2s15', text: 'Levantarse del rol con piernas / pies cruzados',         val: 0.30 }
      ]
    },
    {
      name: '7. Medialuna',
      value: 0.60,
      deductions: [
        { id: 'e2s16', text: 'Colocación incorrecta de las manos (simultánea)',  fixed: true, val: 0.10 },
        { id: 'e2s17', text: 'No pasar por la vertical',                          val: 0.30 },
        { id: 'e2s18', text: 'No mantener la alineación de la cabeza',            val: 0.10 }
      ]
    },
    {
      name: '8. Arabesque (30°) — Mantener 2"',
      value: 0.40,
      deductions: [
        { id: 'e2s19', text: 'No levantar la pierna libre a mínimo 30°', val: 0.10 },
        { id: 'e2s20', text: 'No mantener 2 segundos',                   val: 0.20 }
      ]
    },
    {
      name: '9. Cuclillas — Mantener 1"',
      value: 0.20,
      deductions: [
        { id: 'e2s21', text: 'Falta de precisión',                                    val: 0.10 },
        { id: 'e2s22', text: 'No mantener 1 segundo',                                 val: 0.10 },
        { id: 'e2s23', text: 'Empujar el suelo con las manos para llegar a cuclillas', fixed: true, val: 0.30 }
      ]
    },
    {
      name: '10. Vela',
      value: 0.40,
      deductions: [
        { id: 'e2s24', text: 'No mantener posición agrupada cuando glúteos tocan el suelo', val: 0.20 },
        { id: 'e2s25', text: 'Apoyar las manos para ayudar a bajar',                        fixed: true, val: 0.30 }
      ]
    },
    {
      name: '11. Sapo — Mantener 1"',
      value: 0.40,
      deductions: [
        { id: 'e2s26', text: 'No mantener 1 segundo',                              val: 0.10 },
        { id: 'e2s27', text: 'No llegar con el pecho al suelo (falta de plegado)', val: 0.20 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// SUELO — E3
// 11 elementos — ORDEN LIBRE — VP 10.00
// ═══════════════════════════════════════════════════════════════════════════
const SUELO_E3 = {
  baseScore: 10.00,
  nota: 'PUEDE cambiar el orden de los elementos.',
  elements: [
    {
      name: '1. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e3s1', text: 'No realiza mínimo 2 movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '2. ½ giro en passé sobre 1 pie (0.40) — ½ giro en passé sobre 2 pies (0.40)',
      value: 0.80,
      deductions: [
        { id: 'e3s2', text: 'Piernas en posición incorrecta (no en passé al frente)', fixed: true, val: 0.10 },
        { id: 'e3s3', text: 'No bajar el talón al terminar el giro',                  fixed: true, val: 0.05 }
      ]
    },
    {
      name: '3. Jeté a dos piernas (90°)',
      value: 0.60,
      deductions: [
        { id: 'e3s4', text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 },
        { id: 'e3s5', text: 'Separación desigual de las piernas',             val: 0.20 }
      ]
    },
    {
      name: '4. Continuado — Salto en extensión',
      value: 0.40,
      deductions: [
        { id: 'e3s6', text: 'No aterrizar con los dos pies al mismo tiempo',   fixed: true, val: 0.10 },
        { id: 'e3s7', text: 'No aterrizar con los pies cerrados',              val: 0.10 },
        { id: 'e3s8', text: 'Falta de altura en el salto',                     val: 0.20 },
        { id: 'e3s9', text: 'No realizar el salto continuado al Jeté',         val: 0.20 }
      ]
    },
    {
      name: '5. Medialuna',
      value: 0.60,
      deductions: [
        { id: 'e3s10', text: 'Colocación incorrecta de las manos (simultánea)', fixed: true, val: 0.10 },
        { id: 'e3s11', text: 'No pasar por la vertical',                         val: 0.30 },
        { id: 'e3s12', text: 'No mantener la alineación de la cabeza',           val: 0.10 }
      ]
    },
    {
      name: '6. Vertical rol',
      value: 0.60,
      deductions: [
        { id: 'e3s13', text: 'No pasar por la vertical',                                   val: 0.30 },
        { id: 'e3s14', text: 'Brazos flexionados',                                         val: 0.20 },
        { id: 'e3s15', text: 'No cerrar (juntar) las piernas en la vertical',              fixed: true, val: 0.10 },
        { id: 'e3s16', text: 'No mantener la parada de manos por 1 segundo',               val: 0.10 },
        { id: 'e3s17', text: 'Empujar el suelo con las manos para llegar a cuclillas',     fixed: true, val: 0.30 },
        { id: 'e3s18', text: 'Levantarse del rol con piernas / pies cruzados',             val: 0.30 }
      ]
    },
    {
      name: '7. Salto en extensión con ½ giro',
      value: 0.40,
      deductions: [
        { id: 'e3s19', text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 },
        { id: 'e3s20', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e3s21', text: 'Falta de altura en el salto',                    val: 0.20 }
      ]
    },
    {
      name: '8. Rol atrás agrupado O extendido',
      value: 0.60,
      deductions: [
        { id: 'e3s22', text: 'Colocar manos en el suelo durante la fase de sentada antes de rodar (si agrupado)', fixed: true, val: 0.30 },
        { id: 'e3s23', text: 'Flexión de piernas (si realiza rol extendido)',                                      val: 0.20 }
      ]
    },
    {
      name: '9. Rondo',
      value: 0.60,
      deductions: [
        { id: 'e3s24', text: 'No pasar por la vertical',                      val: 0.30 },
        { id: 'e3s25', text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 }
      ]
    },
    {
      name: '10. Continuado — Salto en extensión',
      value: 0.40,
      deductions: [
        { id: 'e3s26', text: 'No aterrizar con los dos pies al mismo tiempo', fixed: true, val: 0.10 },
        { id: 'e3s27', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e3s28', text: 'Falta de altura en el salto',                    val: 0.20 },
        { id: 'e3s29', text: 'No realizar el salto continuado al Rondo',       val: 0.20 }
      ]
    },
    {
      name: '11. Enlace coreográfico en contacto con el suelo torso/espalda',
      value: 0.20,
      deductions: [
        { id: 'e3s30', text: 'No combina movimientos tocando suelo con torso/espalda (mín. 2 movimientos)', val: 0.20 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// ENSAMBLADO FINAL
// ═══════════════════════════════════════════════════════════════════════════
window.EVAL_LEVEL_DETAILS = {
  'E1A': {
    label: 'Nivel E1 A — CAG 2026',
    nota: '4 aparatos. Orden obligatorio en Viga y Suelo.',
    aparatos: {
      'SALTO':     SALTO_E1,
      'PARALELAS': PARALELAS_E1A,
      'VIGA':      VIGA_E1A,
      'SUELO':     SUELO_E1
    }
  },
  'E1B': {
    label: 'Nivel E1 B — CAG 2026',
    nota: '2 aparatos: Salto y Suelo únicamente. Orden obligatorio en Suelo.',
    aparatos: {
      'SALTO': SALTO_E1,
      'SUELO': SUELO_E1
    }
  },
  'E2': {
    label: 'Nivel E2 — CAG 2026',
    nota: '4 aparatos. Orden libre en todos. Salto: 2 elementos (extensión + vertical caída dorsal).',
    aparatos: {
      'SALTO':     SALTO_E2,
      'PARALELAS': PARALELAS_E2,
      'VIGA':      VIGA_E2,
      'SUELO':     SUELO_E2
    }
  },
  'E3': {
    label: 'Nivel E3 — CAG 2026',
    nota: '4 aparatos. Orden libre en todos. Salto: Pre-Mini igual E2; Mini+ Vuelo Mortero.',
    aparatos: {
      'SALTO':     SALTO_E3,
      'PARALELAS': PARALELAS_E3,
      'VIGA':      VIGA_E3,
      'SUELO':     SUELO_E3
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// DEDUCCIONES GENERALES
// Aplican a Barras Asimétricas, Viga de Equilibrio y Suelo
// Fuente: Tabla general pág. 73-79 del reglamento CAG 2026
// ═══════════════════════════════════════════════════════════════════════════
window.GLOBAL_DEDUCTIONS = {
  'EXECUTION': [
    // Ejecución específica
    { id: 'ge1',  text: 'Pies flexionados/relajados en elementos principales (c/vez)',          fixed: true, val: 0.05 },
    { id: 'ge2',  text: 'Separación de piernas o rodillas',                                     val: 0.20 },
    { id: 'ge3',  text: 'Alineación/postura incorrecta del cuerpo en elementos principales',    val: 0.20 },
    { id: 'ge4',  text: 'Brazos flexionados en el apoyo (90° o más = máx 0.30)',                val: 0.30 },
    { id: 'ge5',  text: 'Pierna(s) flexionada(s) (90° o más = máx 0.30)',                       val: 0.30 },
    { id: 'ge6',  text: 'Errores de equilibrio — pequeños, medianos, grandes',                  val: 0.30 },
    { id: 'ge7',  text: 'Brazos no cubren orejas al entrar/salir de elementos acro (c/vez)',    fixed: true, val: 0.05 },
    { id: 'ge8',  text: 'No marcar posición de passé en relevé al completar giros',             fixed: true, val: 0.05 },
    // Ritmo y pausas
    { id: 'ge9',  text: 'Pausa de concentración 2 seg (VI) / 2 seg o más (SU)',                 fixed: true, val: 0.10, nota: 'Cada vez' },
    { id: 'ge10', text: 'Pausa de concentración más de 2 seg (VI)',                             fixed: true, val: 0.20, nota: 'Cada vez' },
    { id: 'ge11', text: 'Parar entre elementos mayores en diagonal acrobática (SU)',             fixed: true, val: 0.30 },
    { id: 'ge12', text: 'Falta de sincronización del movimiento con música (SU)',               val: 0.30 },
    { id: 'ge13', text: 'Tomar la viga para evitar una caída (VI)',                             fixed: true, val: 0.30 },
    // Presentación artística
    { id: 'ge14', text: 'Presentación artística — calidad de movimientos',                     val: 0.15 },
    { id: 'ge15', text: 'Presentación artística — calidad de expresión/proyección',            val: 0.15 },
    // Amplitud
    { id: 'ge16', text: 'Amplitud insuficiente (cuerpo interior) en posiciones extendidas (BA)', val: 0.20 },
    { id: 'ge17', text: 'Amplitud insuficiente lejos de la barra (BA)',                          val: 0.20 },
    { id: 'ge18', text: 'Altura insuficiente (levantamiento de cadera) en saltos (VI/SU)',       val: 0.20 }
  ],
  'LANDING': [
    { id: 'gl1', text: 'Pie(s) se deslizan para juntar talones (paso pequeño)',                  val: 0.10 },
    { id: 'gl2', text: 'Pies separados a cadera sin juntar talones (salidas BA/VI)',             fixed: true, val: 0.05 },
    { id: 'gl3', text: 'Brinco pequeño / ajuste / pies escalonados en aterrizaje',              val: 0.10 },
    { id: 'gl4', text: 'Pies más separados que el ancho de la cadera',                          fixed: true, val: 0.10 },
    { id: 'gl5', text: 'Balanceo de brazo(s) para mantener equilibrio',                         val: 0.10 },
    { id: 'gl6', text: 'Desviación de la dirección recta en el aterrizaje',                     val: 0.10 },
    { id: 'gl7', text: 'Pasos pequeños/medianos en aterrizaje (c/vez, máx 0.40)',               fixed: true, val: 0.15, nota: '0.10–0.15 c/vez, máx 0.40' },
    { id: 'gl8', text: 'Salto o paso largo en aterrizaje (~1m o más, c/vez, máx 0.40)',         fixed: true, val: 0.20, nota: 'Cada vez, máx 0.40' },
    { id: 'gl9', text: 'Movimientos adicionales de tronco para mantener equilibrio',            val: 0.20 },
    { id: 'gl10', text: 'Postura incorrecta del cuerpo en el aterrizaje',                       val: 0.20 },
    { id: 'gl11', text: 'Sentadilla en aterrizaje (cadera ≤ rodillas)',                          val: 0.30 },
    { id: 'gl12', text: 'Rozar/tocar aparato/colchón con manos (no apoyo)',                     val: 0.30 },
    { id: 'gl13', text: 'Apoyo en aparato/colchón con una o dos manos',                         fixed: true, val: 0.50 },
    { id: 'gl14', text: 'Caída contra aparato o sobre colchón en rodilla(s) o cadera',         fixed: true, val: 0.50 }
  ],
  'FALL': { id: 'fall', text: 'Caída en o desde el aparato', fixed: true, val: 0.50 }
};
