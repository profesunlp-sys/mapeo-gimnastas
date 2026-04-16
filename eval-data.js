/**
 * EVAL-DATA.JS
 * Datos técnicos de evaluación — Programa CAG 2026 (Niveles E)
 * Fuente: "Ejercicios Obligatorios de Nivel Escuela GAF — Programa 2026"
 * Deducciones tomadas directamente de las tablas del reglamento oficial.
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

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E1 A y E1 B — SALTO
// Valor de partida: 10.00 pts
// Elemento único: Salto en extensión hacia colchones
// ─────────────────────────────────────────────────────────────────────────────

const SALTO_E1A_E1B = {
  baseScore: 10.00,
  elements: [
    {
      name: 'Salto en extensión hacia colchones',
      value: 10.00,
      deductions: [
        // Faltas generales
        { id: 'sv_c2',   text: 'Carrera vacía #2',                                    val: 1.00 },
        { id: 'sv_c3',   text: 'Carrera vacía #3',                                    val: 3.00 },
        { id: 'sv_din',  text: 'Dinamismo insuficiente (velocidad/potencia)',          val: 0.30 },
        { id: 'sv_ay1',  text: 'Ayuda durante el salto extendido',                    val: 2.00 },
        { id: 'sv_ay2',  text: 'Ayuda durante el aterrizaje',                         val: 0.50 },
        { id: 'sv_caid', text: 'Caída posterior a la ayuda (adicional)',               val: 0.50 },
        // Carrera y contacto con la tabla
        { id: 'sv_vel',  text: 'No mantener velocidad horizontal de la carrera',      val: 0.30 },
        { id: 'sv_inc',  text: 'Inclinación excesiva hacia adelante al contacto',     val: 0.30 },
        { id: 'sv_reb',  text: 'Brinco/doble rebote — pique alternado — pica un pie', val: 0.30 },
        // Salto en extensión
        { id: 'sv_alt',  text: 'Falta de altura en el salto',                         val: 0.50 },
        { id: 'sv_pie',  text: 'Pies flexionados o relajados',                        val: 0.10 },
        { id: 'sv_sep',  text: 'Piernas separadas',                                   val: 0.20 },
        { id: 'sv_dob',  text: 'Piernas dobladas',                                    val: 0.30 },
        { id: 'sv_cab',  text: 'No mantener posición neutra de la cabeza',            val: 0.30 },
        { id: 'sv_arq',  text: 'Cuerpo arqueado durante el salto',                    val: 0.30 },
        { id: 'sv_car',  text: 'Cuerpo carpado durante el salto',                     val: 0.50 },
        { id: 'sv_des',  text: 'Desviación de la dirección recta',                    val: 0.30 },
        { id: 'sv_dem',  text: 'No aterrizar en demi-plié controlado',                val: 0.50 },
        { id: 'sv_cf',   text: 'Caída (manos/rodillas/cadera) tras aterrizaje',       val: 0.50 },
        // Fase de aterrizaje
        { id: 'sv_at1',  text: 'Pie(s) se deslizan para juntar talones',              val: 0.10 },
        { id: 'sv_at2',  text: 'Aterrizar pies separados a la cadera sin juntar',     val: 0.05 },
        { id: 'sv_at3',  text: 'Brinco pequeño / ajuste / pies escalonados',          val: 0.10 },
        { id: 'sv_at4',  text: 'Pies más separados que el ancho de la cadera',        val: 0.10 },
        { id: 'sv_at5',  text: 'Balanceo de brazo(s) para mantener equilibrio',       val: 0.10 },
        { id: 'sv_at6',  text: 'Desviación dirección recta en aterrizaje',            val: 0.10 },
        { id: 'sv_pas',  text: 'Paso en aterrizaje (c/u, máx 4 pasos)',               val: 0.10 },
        { id: 'sv_sal',  text: 'Salto/paso largo en aterrizaje (~1m o más)',           val: 0.20 },
        { id: 'sv_tro',  text: 'Movimientos adicionales de tronco',                   val: 0.20 },
        { id: 'sv_pos',  text: 'Postura incorrecta del cuerpo al aterrizar',          val: 0.20 },
        { id: 'sv_snt',  text: 'Sentadilla (cadera a la altura de rodillas o abajo)', val: 0.30 },
        { id: 'sv_roz',  text: 'Rozar/tocar el colchón con manos (no apoyo)',         val: 0.30 },
        { id: 'sv_apo',  text: 'Apoyo en colchón con una o dos manos',                val: 0.50 },
        { id: 'sv_rod',  text: 'Caída sobre rodilla(s) o cadera',                     val: 0.50 },
        { id: 'sv_nop',  text: 'No aterrizar con los pies primero',                   val: 2.00 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E2 — SALTO
// 2 saltos: Salto en extensión (5.00 p) + Vertical caída dorsal (5.00 p)
// ─────────────────────────────────────────────────────────────────────────────

const SALTO_E2 = {
  baseScore: 10.00,
  elements: [
    {
      name: 'Salto en extensión hacia colchones (5.00 pts)',
      value: 5.00,
      deductions: [
        { id: 'e2sv_c2',  text: 'Carrera vacía #2',                                   val: 1.00 },
        { id: 'e2sv_c3',  text: 'Carrera vacía #3',                                   val: 3.00 },
        { id: 'e2sv_din', text: 'Dinamismo insuficiente',                              val: 0.30 },
        { id: 'e2sv_ay1', text: 'Ayuda durante el salto extendido',                   val: 2.00 },
        { id: 'e2sv_vel', text: 'No mantener velocidad horizontal de la carrera',     val: 0.30 },
        { id: 'e2sv_inc', text: 'Inclinación excesiva al contacto con la tabla',      val: 0.30 },
        { id: 'e2sv_reb', text: 'Brinco/doble rebote — pique alternado',              val: 0.30 },
        { id: 'e2sv_alt', text: 'Falta de altura',                                    val: 0.50 },
        { id: 'e2sv_pie', text: 'Pies flexionados/relajados',                         val: 0.10 },
        { id: 'e2sv_sep', text: 'Piernas separadas',                                  val: 0.20 },
        { id: 'e2sv_dob', text: 'Piernas dobladas',                                   val: 0.30 },
        { id: 'e2sv_arq', text: 'Cuerpo arqueado',                                    val: 0.30 },
        { id: 'e2sv_car', text: 'Cuerpo carpado',                                     val: 0.50 },
        { id: 'e2sv_dem', text: 'No aterrizar en demi-plié controlado',               val: 0.50 },
        { id: 'e2sv_pas', text: 'Paso(s) en aterrizaje (c/u, máx 4)',                 val: 0.10 },
        { id: 'e2sv_tro', text: 'Movimientos adicionales de tronco',                  val: 0.20 },
        { id: 'e2sv_snt', text: 'Sentadilla en aterrizaje',                           val: 0.30 },
        { id: 'e2sv_apo', text: 'Apoyo con manos en colchón',                         val: 0.50 },
        { id: 'e2sv_nop', text: 'No aterrizar con los pies primero',                  val: 2.00 }
      ]
    },
    {
      name: 'Vertical — Caída dorsal sobre colchones (5.00 pts)',
      value: 5.00,
      deductions: [
        { id: 'e2vcd_pat',  text: 'Patada adicional a parada de manos',               val: 0.50 },
        { id: 'e2vcd_ay2',  text: 'Ayuda del entrenador tras apoyo de manos',         val: 2.00 },
        { id: 'e2vcd_bra',  text: 'No mantener brazos junto a orejas al llegar',      val: 0.20 },
        { id: 'e2vcd_mp',   text: 'Colocación adicional de manos (pasos con manos)',  val: 0.10 },
        { id: 'e2vcd_pie2', text: 'Pies flexionados/relajados',                       val: 0.10 },
        { id: 'e2vcd_cab',  text: 'No mantener posición neutra de la cabeza',         val: 0.30 },
        { id: 'e2vcd_arq2', text: 'Cuerpo arqueado en vertical',                      val: 0.30 },
        { id: 'e2vcd_car2', text: 'Cuerpo carpado en vertical',                       val: 0.50 },
        { id: 'e2vcd_sep2', text: 'Piernas separadas',                                val: 0.20 },
        { id: 'e2vcd_dob2', text: 'Piernas dobladas',                                 val: 0.30 },
        { id: 'e2vcd_hom',  text: 'Alineación incorrecta de hombros (<180°)',         val: 0.30 },
        { id: 'e2vcd_brz',  text: 'Brazos doblados',                                  val: 0.50 },
        { id: 'e2vcd_at',   text: 'No aterrizar en extensión en espalda',             val: 1.00 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E3 — SALTO
// PRE-MINI: Igual que E2 (Salto extensión + Vertical caída dorsal)
// MINI en adelante: Vuelo Mortero — Recepción acostada sobre colchones
// ─────────────────────────────────────────────────────────────────────────────

const SALTO_E3 = {
  baseScore: 10.00,
  elements: [
    {
      name: 'Salto en extensión hacia colchones — Pre-Mini (5.00 pts)',
      value: 5.00,
      deductions: [
        { id: 'e3sv_c2',  text: 'Carrera vacía #2',                  val: 1.00 },
        { id: 'e3sv_c3',  text: 'Carrera vacía #3',                  val: 3.00 },
        { id: 'e3sv_din', text: 'Dinamismo insuficiente',             val: 0.30 },
        { id: 'e3sv_alt', text: 'Falta de altura',                   val: 0.50 },
        { id: 'e3sv_sep', text: 'Piernas separadas',                 val: 0.20 },
        { id: 'e3sv_dob', text: 'Piernas dobladas',                  val: 0.30 },
        { id: 'e3sv_arq', text: 'Cuerpo arqueado',                   val: 0.30 },
        { id: 'e3sv_car', text: 'Cuerpo carpado',                    val: 0.50 },
        { id: 'e3sv_dem', text: 'No aterrizar en demi-plié',         val: 0.50 },
        { id: 'e3sv_nop', text: 'No aterrizar con los pies primero', val: 2.00 }
      ]
    },
    {
      name: 'Vuelo Mortero — Recepción acostada sobre colchones (Mini en adelante, 10.00 pts)',
      value: 10.00,
      deductions: [
        { id: 'e3m_c2',   text: 'Carrera vacía #2',                                         val: 3.00 },
        { id: 'e3m_din',  text: 'Dinamismo insuficiente',                                    val: 0.30 },
        { id: 'e3m_ay',   text: 'Ayuda del entrenador tras apoyo de manos',                  val: 2.00 },
        { id: 'e3m_vel',  text: 'No mantener velocidad horizontal',                          val: 0.30 },
        { id: 'e3m_inc',  text: 'Inclinación excesiva al contacto con la tabla',             val: 0.30 },
        { id: 'e3m_reb',  text: 'Brinco adicional en el botador',                            val: 0.30 },
        { id: 'e3m_cab',  text: 'No mantener posición neutra de la cabeza (c/fase)',         val: 0.10 },
        { id: 'e3m_pie',  text: 'Pies flexionados/relajados (c/fase)',                       val: 0.10 },
        { id: 'e3m_sep',  text: 'Piernas separadas (c/fase)',                                val: 0.20 },
        { id: 'e3m_dob',  text: 'Piernas dobladas (c/fase)',                                 val: 0.30 },
        { id: 'e3m_arq',  text: 'Cuerpo arqueado (c/fase)',                                  val: 0.30 },
        { id: 'e3m_car',  text: 'Cuerpo carpado (c/fase)',                                   val: 0.50 },
        { id: 'e3m_hom',  text: 'Alineación incorrecta de hombros',                         val: 0.30 },
        { id: 'e3m_brz',  text: 'Brazos doblados en el apoyo',                              val: 0.50 },
        { id: 'e3m_brz2', text: 'Brazos completamente doblados (cabeza toca colchón)',       val: 2.00 },
        { id: 'e3m_ver',  text: 'No mostrar posición vertical invertida (rol adelante)',     val: 2.00 },
        { id: 'e3m_v45',  text: 'Contacto de manos 1°-45° más allá de la vertical',         val: 0.50 },
        { id: 'e3m_v89',  text: 'Contacto de manos 46°-89° más allá de la vertical',        val: 1.00 },
        { id: 'e3m_cin',  text: 'Ambas manos más allá de la línea de cinta (80cm)',          val: 0.50 },
        { id: 'e3m_mp',   text: 'Colocación adicional de manos (pasos con manos, c/vez)',    val: 0.10 },
        { id: 'e3m_1m',   text: 'Solo una mano toca el colchón',                            val: 3.00 },
        { id: 'e3m_at',   text: 'No terminar en extensión acostada en la espalda',          val: 1.00 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E1 A — PARALELAS ASIMÉTRICAS / BARROTE METODOLÓGICO BAJO
// Valor de partida: 10.00 pts
// ─────────────────────────────────────────────────────────────────────────────

const PARALELAS_E1A = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Entrada: Salto al apoyo sin ayuda',
      value: 1.00,
      deductions: [
        { id: 'e1ap1', text: 'Alineación incorrecta del cuerpo', val: 0.20 }
      ]
    },
    {
      name: '2. Flotante',
      value: 0.60,
      deductions: [
        { id: 'e1ap2', text: 'Alineación incorrecta del cuerpo (no mostrar línea recta)', val: 0.20 },
        { id: 'e1ap3', text: 'Falta de control al regresar a la barra',                   val: 0.10 }
      ]
    },
    {
      name: '3. Media vuelta adelante brazos flexionados — Descenso',
      value: 0.60,
      deductions: [
        { id: 'e1ap4', text: 'No mantener posición neutra de la cabeza',     val: 0.10 },
        { id: 'e1ap5', text: 'No dejar los brazos flexionados',              val: 0.20 },
        { id: 'e1ap6', text: 'No bajar ambas piernas al mismo tiempo',       val: 0.30 },
        { id: 'e1ap7', text: 'Apoyo del mentón en la barra al descender',    val: 0.30 },
        { id: 'e1ap8', text: 'No descender en forma controlada las piernas', val: 0.20 },
        { id: 'e1ap9', text: 'No mostrar la toma dorsal',                    val: 0.30 }
      ]
    },
    {
      name: '4. Posición de escuadra colgada — Mantener 2"',
      value: 0.60,
      deductions: [
        { id: 'e1ap10', text: 'Amplitud de piernas insuficiente', val: 0.30 },
        { id: 'e1ap11', text: 'No mantener 2 segundos',           val: 0.20 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E2 — PARALELAS ASIMÉTRICAS
// ─────────────────────────────────────────────────────────────────────────────

const PARALELAS_E2 = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Entrada: Salto al apoyo sin ayuda',
      value: 1.00,
      deductions: [
        { id: 'e2ap1', text: 'Alineación incorrecta del cuerpo', val: 0.20 }
      ]
    },
    {
      name: '2. Flotante',
      value: 0.60,
      deductions: [
        { id: 'e2ap2', text: 'Alineación incorrecta del cuerpo (no mostrar línea recta)', val: 0.20 },
        { id: 'e2ap3', text: 'Falta de control al regresar a la barra',                   val: 0.10 }
      ]
    },
    {
      name: '3. Pasaje de una pierna a toma palmar — Mantener 1" — Volver la pierna atrás',
      value: 0.80,
      deductions: [
        { id: 'e2ap4', text: 'Alineación incorrecta del cuerpo (no mantener ahuecado)', val: 0.20 },
        { id: 'e2ap5', text: 'Falta de control al pasar la pierna adelante',            val: 0.10 },
        { id: 'e2ap6', text: 'Falta de control al regresar la pierna atrás',            val: 0.10 },
        { id: 'e2ap7', text: 'No mostrar la toma palmar',                               val: 0.30 },
        { id: 'e2ap8', text: 'No mantener 1 segundo',                                   val: 0.20 }
      ]
    },
    {
      name: '4. Flotante atrás a posición de pie',
      value: 0.60,
      deductions: [
        { id: 'e2ap9',  text: 'Balanceo insuficiente de piernas hacia atrás',                    val: 0.10 },
        { id: 'e2ap10', text: 'Alineación incorrecta del cuerpo (no mostrar línea recta)',        val: 0.20 },
        { id: 'e2ap11', text: 'Falta de control al regresar al colchón de recepción',            val: 0.10 }
      ]
    },
    {
      name: '5. Posición de escuadra colgada — Mantener 2"',
      value: 0.60,
      deductions: [
        { id: 'e2ap12', text: 'Amplitud de piernas insuficiente', val: 0.30 },
        { id: 'e2ap13', text: 'No mantener 2 segundos',           val: 0.20 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E3 — PARALELAS ASIMÉTRICAS
// ─────────────────────────────────────────────────────────────────────────────

const PARALELAS_E3 = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Entrada: Vuelta pajarito',
      value: 0.80,
      deductions: [
        { id: 'e3ap1', text: 'Paso/brinco/salto adicional antes de la vuelta pajarito', val: 0.10 },
        { id: 'e3ap2', text: 'No levantar ambas piernas al mismo tiempo (despegue 1 pie)', val: 0.30 },
        { id: 'e3ap3', text: 'Apoyo complementario (barbilla en barra)',                 val: 0.30 },
        { id: 'e3ap4', text: 'No terminar en apoyo frontal extendido',                   val: 0.10 }
      ]
    },
    {
      name: '2. Flotante al apoyo',
      value: 0.60,
      deductions: [
        { id: 'e3ap5', text: 'Alineación incorrecta del cuerpo (no mostrar línea recta)', val: 0.20 },
        { id: 'e3ap6', text: 'Falta de control al regresar a la barra',                   val: 0.10 }
      ]
    },
    {
      name: '3. Vuelta atrás',
      value: 0.60,
      deductions: [
        { id: 'e3ap7', text: 'No mantener posición neutra de la cabeza',                       val: 0.10 },
        { id: 'e3ap8', text: 'No mantener posición recta y ahuecada del cuerpo',               val: 0.20 },
        { id: 'e3ap9', text: 'No mantener contacto de cadera/muslos con la barra en todo momento', val: 0.20 },
        { id: 'e3ap10', text: 'Falta de continuidad del círculo',                              val: 0.10 }
      ]
    },
    {
      name: '4. Pasaje de una pierna a toma palmar — Mantener 1" — Volver la pierna atrás',
      value: 0.80,
      deductions: [
        { id: 'e3ap11', text: 'Alineación incorrecta del cuerpo (no mantener ahuecado)', val: 0.20 },
        { id: 'e3ap12', text: 'Falta de control al pasar la pierna adelante',            val: 0.10 },
        { id: 'e3ap13', text: 'Falta de control al regresar la pierna atrás',            val: 0.10 },
        { id: 'e3ap14', text: 'No mostrar la toma palmar',                               val: 0.30 },
        { id: 'e3ap15', text: 'No mantener 1 segundo',                                   val: 0.20 }
      ]
    },
    {
      name: '5. Piso-Piso — cuclillas en barra — Salida de salto extendido',
      value: 0.60,
      deductions: [
        { id: 'e3ap16', text: 'No mostrar posición recta y ahuecada del cuerpo en el vuelo', val: 0.20 },
        { id: 'e3ap17', text: 'Tocar la barra superior',                                     val: 0.50 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E1 A — VIGA DE EQUILIBRIO
// ORDEN OBLIGATORIO — No puede cambiar el orden de los elementos
// ─────────────────────────────────────────────────────────────────────────────

const VIGA_E1A = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Entrada a horcajada (0.20) — Cuclillas (0.20) — Posición de pie',
      value: 0.40,
      deductions: [
        { id: 'e1v1', text: 'Falta de continuidad de sentada a cuclillas', val: 0.10 },
        { id: 'e1v2', text: 'No mantener 1 segundo en cuclillas',           val: 0.10 }
      ]
    },
    {
      name: '2. Passé con una pierna — Mantener 1" (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1v3', text: 'No colocar los brazos en la cintura',         val: 0.10 },
        { id: 'e1v4', text: 'No mantener 1 segundo',                       val: 0.10 },
        { id: 'e1v5', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '2b. Passé con la otra pierna — Mantener 1" (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1v3b', text: 'No colocar los brazos en la cintura',            val: 0.10 },
        { id: 'e1v4b', text: 'No mantener 1 segundo',                          val: 0.10 },
        { id: 'e1v5b', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '3. Dos pasos en relevé (0.10 c/u)',
      value: 0.20,
      deductions: [
        { id: 'e1v6', text: 'Falta de precisión (c/paso)',              val: 0.10 },
        { id: 'e1v7', text: 'No colocar los brazos en 2da. posición',   val: 0.10 }
      ]
    },
    {
      name: '4. Salto en extensión',
      value: 0.60,
      deductions: [
        { id: 'e1v8',  text: 'No aterrizar con los dos pies al mismo tiempo', val: 0.10 },
        { id: 'e1v9',  text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e1v10', text: 'Falta de altura en el salto',                    val: 0.20 }
      ]
    },
    {
      name: '5. Cuclillas (mantener 1") — Vuelta a posición de pie',
      value: 0.20,
      deductions: [
        { id: 'e1v11', text: 'Falta de precisión',     val: 0.10 },
        { id: 'e1v12', text: 'No mantener 1 segundo',  val: 0.10 }
      ]
    },
    {
      name: '6. Salida: Salto en extensión desde el extremo de la viga',
      value: 0.40,
      deductions: [
        { id: 'e1v13', text: 'No aterrizar con los dos pies al mismo tiempo', val: 0.10 },
        { id: 'e1v14', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e1v15', text: 'Falta de altura en el salto',                    val: 0.20 },
        { id: 'e1v16', text: 'No salir por el extremo de la viga',             val: 0.10 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E2 — VIGA DE EQUILIBRIO
// PUEDE cambiar el orden de los elementos
// ─────────────────────────────────────────────────────────────────────────────

const VIGA_E2 = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Entrada a horcajada (0.20) — Cuclillas (0.20) — Posición de pie',
      value: 0.40,
      deductions: [
        { id: 'e2v1', text: 'Falta de continuidad de sentada a cuclillas', val: 0.10 },
        { id: 'e2v2', text: 'No mantener 1 segundo en cuclillas',           val: 0.10 }
      ]
    },
    {
      name: '2. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e2v3', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e2v4', text: 'No alternar las piernas',                    val: 0.30 },
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
        { id: 'e2v8', text: 'No marcar la posición',                                          val: 0.05 },
        { id: 'e2v9', text: 'No mantener 1 segundo',                                          val: 0.10 }
      ]
    },
    {
      name: '5. Passé con una pierna — Mantener 1" (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e2v10', text: 'No colocar los brazos en la cintura',            val: 0.10 },
        { id: 'e2v11', text: 'No mantener 1 segundo',                          val: 0.10 },
        { id: 'e2v12', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '5b. Passé con la otra pierna — Mantener 1" (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e2v10b', text: 'No colocar los brazos en la cintura',            val: 0.10 },
        { id: 'e2v11b', text: 'No mantener 1 segundo',                          val: 0.10 },
        { id: 'e2v12b', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '6. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e2v13', text: 'No realiza mínimo dos movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '7. ¼ giro sobre dos pies — Manos en la cintura',
      value: 0.20,
      deductions: [
        { id: 'e2v14', text: 'Falta de precisión', val: 0.10 }
      ]
    },
    {
      name: '8. Salida: Salto en extensión',
      value: 0.40,
      deductions: [
        { id: 'e2v15', text: 'No aterrizar con los dos pies al mismo tiempo', val: 0.10 },
        { id: 'e2v16', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e2v17', text: 'Falta de altura en el salto',                    val: 0.20 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E3 — VIGA DE EQUILIBRIO
// PUEDE cambiar el orden de los elementos
// ─────────────────────────────────────────────────────────────────────────────

const VIGA_E3 = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Entrada a horcajada (0.20) — Escuadra piernas abiertas (0.40) — Mantener 2"',
      value: 0.60,
      deductions: [
        { id: 'e3v1', text: 'Falta de continuidad hasta el mantenimiento', val: 0.10 },
        { id: 'e3v2', text: 'No mantener 2 segundos en la escuadra',       val: 0.20 }
      ]
    },
    {
      name: '2. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e3v3', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e3v4', text: 'No alternar las piernas',                    val: 0.30 },
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
        { id: 'e3v9',  text: 'No lograr la vertical a 30°',                  val: 0.30 },
        { id: 'e3v10', text: 'No cerrar las piernas en la vertical',          val: 0.10 },
        { id: 'e3v11', text: 'Colocación incorrecta de manos (alternadas)',   val: 0.10 }
      ]
    },
    {
      name: '6. Dos ½ (180°) giros sobre dos pies (0.40 c/u)',
      value: 0.80,
      deductions: [
        { id: 'e3v12', text: 'Falta de precisión (c/giro)', val: 0.10 }
      ]
    },
    {
      name: '7. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e3v13', text: 'No realiza mínimo dos movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '8. Salida: Salto en extensión por el extremo de la viga',
      value: 0.40,
      deductions: [
        { id: 'e3v14', text: 'No aterrizar con los dos pies al mismo tiempo', val: 0.10 },
        { id: 'e3v15', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e3v16', text: 'Falta de altura en el salto',                    val: 0.20 },
        { id: 'e3v17', text: 'No salir por el extremo de la viga',             val: 0.10 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E1 A y E1 B — SUELO
// ORDEN OBLIGATORIO — No puede cambiar el orden de los elementos
// ─────────────────────────────────────────────────────────────────────────────

const SUELO_E1A_E1B = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e1s1', text: 'No realiza mínimo dos movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '2. Passé con una pierna — Mantener 1" (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1s2', text: 'No colocar los brazos en la cintura',             val: 0.10 },
        { id: 'e1s3', text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e1s4', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '2b. Passé con la otra pierna — Mantener 1" (0.20)',
      value: 0.20,
      deductions: [
        { id: 'e1s2b', text: 'No colocar los brazos en la cintura',             val: 0.10 },
        { id: 'e1s3b', text: 'No mantener 1 segundo',                           val: 0.10 },
        { id: 'e1s4b', text: 'No levantar la rodilla a la altura de la cadera', val: 0.20 }
      ]
    },
    {
      name: '3. Dos pasos en relevé (0.10 c/u)',
      value: 0.20,
      deductions: [
        { id: 'e1s5', text: 'Falta de precisión (c/paso)',             val: 0.10 },
        { id: 'e1s6', text: 'No colocar los brazos en 5ta. posición',  val: 0.10 }
      ]
    },
    {
      name: '4. Rol adelante agrupado',
      value: 0.60,
      deductions: [
        { id: 'e1s7', text: 'Levantarse del rol con piernas/pies cruzados',          val: 0.30 },
        { id: 'e1s8', text: 'Empujar el suelo con las manos para llegar a cuclillas', val: 0.30 }
      ]
    },
    {
      name: '5. Continuado — Salto en extensión',
      value: 0.40,
      deductions: [
        { id: 'e1s9',  text: 'No aterrizar con los dos pies al mismo tiempo',         val: 0.10 },
        { id: 'e1s10', text: 'No aterrizar con los pies cerrados',                    val: 0.10 },
        { id: 'e1s11', text: 'Falta de altura en el salto',                           val: 0.20 },
        { id: 'e1s12', text: 'No realizar el salto continuado al rol adelante',       val: 0.20 }
      ]
    },
    {
      name: '6. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e1s13', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e1s14', text: 'No alternar las piernas',                    val: 0.30 },
        { id: 'e1s15', text: 'Falta de altura en el salto',                val: 0.20 }
      ]
    },
    {
      name: '7. Vertical',
      value: 0.60,
      deductions: [
        { id: 'e1s16', text: 'No lograr la vertical',                              val: 0.30 },
        { id: 'e1s17', text: 'No cerrar las piernas en la vertical',               val: 0.10 },
        { id: 'e1s18', text: 'Colocación incorrecta de manos (alternadas)',         val: 0.10 },
        { id: 'e1s19', text: 'Patada extra a vertical',                            val: 0.50 }
      ]
    },
    {
      name: '8. Cuclillas — Mantener 1"',
      value: 0.20,
      deductions: [
        { id: 'e1s20', text: 'Falta de precisión',                                val: 0.10 },
        { id: 'e1s21', text: 'No mantener 1 segundo',                             val: 0.10 },
        { id: 'e1s22', text: 'Empujar el suelo con las manos para llegar a cuclillas', val: 0.30 }
      ]
    },
    {
      name: '9. Vela',
      value: 0.40,
      deductions: [
        { id: 'e1s23', text: 'No mantener posición agrupada cuando glúteos tocan el suelo', val: 0.20 },
        { id: 'e1s24', text: 'Apoyar las manos para ayudar a bajar',                         val: 0.30 }
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

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E2 — SUELO
// PUEDE cambiar el orden de los elementos
// ─────────────────────────────────────────────────────────────────────────────

const SUELO_E2 = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e2s1', text: 'No realiza mínimo dos movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '2. Dos ½ (180°) giros sobre dos pies (0.40 c/u)',
      value: 0.80,
      deductions: [
        { id: 'e2s2', text: 'Falta de precisión (c/giro)', val: 0.10 }
      ]
    },
    {
      name: '3. Passé — Développé — Passé — Développé (0.20 c/u)',
      value: 0.40,
      deductions: [
        { id: 'e2s3', text: 'No mantener brazos en 2da. posición en el passé',       val: 0.10 },
        { id: 'e2s4', text: 'No mantener brazos en 5ta. posición en el développé',   val: 0.10 },
        { id: 'e2s5', text: 'No mantener 1 segundo',                                 val: 0.10 },
        { id: 'e2s6', text: 'No levantar la rodilla a la altura de la cadera',       val: 0.20 }
      ]
    },
    {
      name: '4. Salto gato',
      value: 0.40,
      deductions: [
        { id: 'e2s7', text: 'No elevar las rodillas sobre la horizontal', val: 0.20 },
        { id: 'e2s8', text: 'No alternar las piernas',                    val: 0.30 },
        { id: 'e2s9', text: 'Falta de altura en el salto',                val: 0.20 }
      ]
    },
    {
      name: '5. Vertical',
      value: 0.60,
      deductions: [
        { id: 'e2s10', text: 'No lograr la vertical',                              val: 0.30 },
        { id: 'e2s11', text: 'No cerrar las piernas en la vertical',               val: 0.10 },
        { id: 'e2s12', text: 'Colocación incorrecta de manos (alternadas)',         val: 0.10 },
        { id: 'e2s13', text: 'Patada extra a vertical',                            val: 0.50 }
      ]
    },
    {
      name: '6. Rol adelante agrupado',
      value: 0.60,
      deductions: [
        { id: 'e2s14', text: 'Empujar el suelo con las manos para llegar a cuclillas', val: 0.30 },
        { id: 'e2s15', text: 'Levantarse del rol con piernas/pies cruzados',            val: 0.30 }
      ]
    },
    {
      name: '7. Medialuna',
      value: 0.60,
      deductions: [
        { id: 'e2s16', text: 'Colocación incorrecta de las manos (simultánea)',     val: 0.10 },
        { id: 'e2s17', text: 'No pasar por la vertical',                             val: 0.30 },
        { id: 'e2s18', text: 'No mantener la alineación de la cabeza',               val: 0.10 }
      ]
    },
    {
      name: '8. Arabesque (30°) — Mantener 2"',
      value: 0.40,
      deductions: [
        { id: 'e2s19', text: 'No levantar la pierna libre a mínimo 30°',  val: 0.10 },
        { id: 'e2s20', text: 'No mantener 2 segundos',                    val: 0.20 }
      ]
    },
    {
      name: '9. Cuclillas — Mantener 1"',
      value: 0.20,
      deductions: [
        { id: 'e2s21', text: 'Falta de precisión',                                     val: 0.10 },
        { id: 'e2s22', text: 'No mantener 1 segundo',                                  val: 0.10 },
        { id: 'e2s23', text: 'Empujar el suelo con las manos para llegar a cuclillas', val: 0.30 }
      ]
    },
    {
      name: '10. Vela',
      value: 0.40,
      deductions: [
        { id: 'e2s24', text: 'No mantener posición agrupada cuando glúteos tocan el suelo', val: 0.20 },
        { id: 'e2s25', text: 'Apoyar las manos para ayudar a bajar',                         val: 0.30 }
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

// ─────────────────────────────────────────────────────────────────────────────
// NIVEL E3 — SUELO
// PUEDE cambiar el orden de los elementos
// ─────────────────────────────────────────────────────────────────────────────

const SUELO_E3 = {
  baseScore: 10.00,
  elements: [
    {
      name: '1. Enlace coreográfico',
      value: 0.20,
      deductions: [
        { id: 'e3s1', text: 'No realiza mínimo dos movimientos de brazos y/o piernas', val: 0.20 }
      ]
    },
    {
      name: '2. ½ giro en passé sobre 1 pie (0.40) — ½ giro en passé sobre 2 pies (0.40)',
      value: 0.80,
      deductions: [
        { id: 'e3s2', text: 'Piernas en posición incorrecta (no en passé al frente)', val: 0.10 },
        { id: 'e3s3', text: 'No bajar el talón al terminar el giro',                  val: 0.05 }
      ]
    },
    {
      name: '3. Jeté a dos piernas 90°',
      value: 0.60,
      deductions: [
        { id: 'e3s4', text: 'No aterrizar con los dos pies al mismo tiempo',  val: 0.10 },
        { id: 'e3s5', text: 'Separación desigual de las piernas',              val: 0.20 }
      ]
    },
    {
      name: '4. Continuado — Salto en extensión',
      value: 0.40,
      deductions: [
        { id: 'e3s6',  text: 'No aterrizar con los dos pies al mismo tiempo',  val: 0.10 },
        { id: 'e3s7',  text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e3s8',  text: 'Falta de altura en el salto',                    val: 0.20 },
        { id: 'e3s9',  text: 'No realizar el salto continuado al Jeté',        val: 0.20 }
      ]
    },
    {
      name: '5. Medialuna',
      value: 0.60,
      deductions: [
        { id: 'e3s10', text: 'Colocación incorrecta de las manos (simultánea)', val: 0.10 },
        { id: 'e3s11', text: 'No pasar por la vertical',                         val: 0.30 },
        { id: 'e3s12', text: 'No mantener la alineación de la cabeza',           val: 0.10 }
      ]
    },
    {
      name: '6. Vertical rol',
      value: 0.60,
      deductions: [
        { id: 'e3s13', text: 'No pasar por la vertical',                               val: 0.30 },
        { id: 'e3s14', text: 'Brazos flexionados',                                     val: 0.20 },
        { id: 'e3s15', text: 'No cerrar (juntar) las piernas en la vertical',          val: 0.10 },
        { id: 'e3s16', text: 'No mantener la parada de manos por un segundo',          val: 0.10 },
        { id: 'e3s17', text: 'Empujar el suelo con las manos para llegar a cuclillas', val: 0.30 },
        { id: 'e3s18', text: 'Levantarse del rol con piernas/pies cruzados',           val: 0.30 }
      ]
    },
    {
      name: '7. Salto en extensión con ½ giro',
      value: 0.40,
      deductions: [
        { id: 'e3s19', text: 'No aterrizar con los dos pies al mismo tiempo', val: 0.10 },
        { id: 'e3s20', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e3s21', text: 'Falta de altura en el salto',                    val: 0.20 }
      ]
    },
    {
      name: '8. Rol atrás agrupado o extendido',
      value: 0.60,
      deductions: [
        { id: 'e3s22', text: 'Colocar manos en el suelo durante la fase de sentada (si agrupado)', val: 0.30 },
        { id: 'e3s23', text: 'Flexión de piernas (si realiza rol extendido)',                       val: 0.20 }
      ]
    },
    {
      name: '9. Rondo',
      value: 0.60,
      deductions: [
        { id: 'e3s24', text: 'No pasar por la vertical',                      val: 0.30 },
        { id: 'e3s25', text: 'No aterrizar con los dos pies al mismo tiempo', val: 0.10 }
      ]
    },
    {
      name: '10. Continuado — Salto en extensión',
      value: 0.40,
      deductions: [
        { id: 'e3s26', text: 'No aterrizar con los dos pies al mismo tiempo',  val: 0.10 },
        { id: 'e3s27', text: 'No aterrizar con los pies cerrados',             val: 0.10 },
        { id: 'e3s28', text: 'Falta de altura en el salto',                    val: 0.20 },
        { id: 'e3s29', text: 'No realizar el salto continuado al Rondo',       val: 0.20 }
      ]
    },
    {
      name: '11. Enlace coreográfico en contacto con el suelo torso/espalda',
      value: 0.20,
      deductions: [
        { id: 'e3s30', text: 'No combina movimientos tocando el suelo con torso/espalda (mín. 2 movimientos)', val: 0.20 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// ENSAMBLADO FINAL POR NIVEL
// ─────────────────────────────────────────────────────────────────────────────

window.EVAL_LEVEL_DETAILS = {
  'E1A': {
    label: 'Nivel E1 A — CAG 2026',
    aparatos: {
      'SALTO':    SALTO_E1A_E1B,
      'PARALELAS': PARALELAS_E1A,
      'VIGA':     VIGA_E1A,
      'SUELO':    SUELO_E1A_E1B
    }
  },
  'E1B': {
    label: 'Nivel E1 B — CAG 2026',
    aparatos: {
      'SALTO':  SALTO_E1A_E1B,
      'SUELO':  SUELO_E1A_E1B
    }
  },
  'E2': {
    label: 'Nivel E2 — CAG 2026',
    aparatos: {
      'SALTO':    SALTO_E2,
      'PARALELAS': PARALELAS_E2,
      'VIGA':     VIGA_E2,
      'SUELO':    SUELO_E2
    }
  },
  'E3': {
    label: 'Nivel E3 — CAG 2026',
    aparatos: {
      'SALTO':    SALTO_E3,
      'PARALELAS': PARALELAS_E3,
      'VIGA':     VIGA_E3,
      'SUELO':    SUELO_E3
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DEDUCCIONES GENERALES (aplican a todos los aparatos y niveles)
// Fuente: "Faltas y Penalizaciones Generales — BA, VI y SU" (pág. 73-79 del reglamento)
// ─────────────────────────────────────────────────────────────────────────────

window.GLOBAL_DEDUCTIONS = {
  'EXECUTION': [
    { id: 'ge1',  text: 'Pies flexionados/relajados en elementos principales (c/vez)',   val: 0.05 },
    { id: 'ge2',  text: 'Separación de piernas o rodillas',                              val: 0.20 },
    { id: 'ge3',  text: 'Alineación/postura incorrecta del cuerpo en elementos principales', val: 0.20 },
    { id: 'ge4',  text: 'Brazos flexionados en el apoyo (hasta 90° = máx 0.30)',         val: 0.30 },
    { id: 'ge5',  text: 'Pierna(s) flexionada(s) (hasta 90° = máx 0.30)',               val: 0.30 },
    { id: 'ge6',  text: 'Errores de equilibrio — pequeños, medianos, grandes',          val: 0.30 },
    { id: 'ge7',  text: 'Brazos no cubren orejas al entrar/salir de elementos acro (c/vez)', val: 0.05 },
    { id: 'ge8',  text: 'No marcar posición de passé en relevé al completar giros',     val: 0.05 },
    { id: 'ge9',  text: 'Pausa de concentración (2 seg en VI — 2 seg o más en SU)',     val: 0.10 },
    { id: 'ge10', text: 'Pausa de concentración (más de 2 seg en VI)',                  val: 0.20 },
    { id: 'ge11', text: 'Tomar la viga para evitar una caída',                          val: 0.30 },
    { id: 'ge12', text: 'Falta de sincronización del movimiento con el ritmo musical (SU)', val: 0.30 },
    { id: 'ge13', text: 'Presentación artística insuficiente — calidad de movimiento',  val: 0.15 },
    { id: 'ge14', text: 'Presentación artística insuficiente — expresión/proyección',   val: 0.15 }
  ],
  'LANDING': [
    { id: 'gl1', text: 'Paso(s) pequeño/mediano en aterrizaje (c/vez, máx 4 pasos)',    val: 0.15 },
    { id: 'gl2', text: 'Salto o paso largo en aterrizaje (~1m o más, c/vez)',            val: 0.20 },
    { id: 'gl3', text: 'Sentadilla en aterrizaje (cadera a la altura de rodillas)',      val: 0.30 },
    { id: 'gl4', text: 'Balanceo de brazo(s) para mantener equilibrio',                 val: 0.10 },
    { id: 'gl5', text: 'Postura incorrecta del cuerpo en aterrizaje',                   val: 0.20 },
    { id: 'gl6', text: 'Movimientos adicionales de tronco en aterrizaje',               val: 0.20 },
    { id: 'gl7', text: 'Rozar/tocar aparato/colchón con manos (no apoyo)',              val: 0.30 },
    { id: 'gl8', text: 'Apoyo en aparato/colchón con una o dos manos',                  val: 0.50 },
    { id: 'gl9', text: 'Caída contra aparato o colchón en rodilla(s) o cadera',        val: 0.50 }
  ],
  'FALL': { id: 'fall', text: 'Caída en o desde el aparato', val: 0.50 }
};
