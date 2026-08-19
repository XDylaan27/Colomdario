export function getEasterDate(year) {
  const f = Math.floor,
        G = year % 19,
        C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40) / 44),
        day = L + 28 - 31 * f(month / 4);
  return new Date(year, month - 1, day);
}

function nextMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  if (day !== 1) { // 1 is Monday
    const diff = (day === 0 ? 1 : 8 - day);
    d.setDate(d.getDate() + diff);
  }
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export const holidayDetails = {
  "Año Nuevo": {
    type: "Civil / Internacional",
    originalDate: "1 de Enero",
    isEmiliani: false,
    history: "Marca el primer día del año en el calendario gregoriano, instaurado originalmente en el año 45 a.C. por Julio César y adoptado por la cultura hispanoamericana desde la época colonial.",
    whyHoliday: "Es una jornada universal para la unión familiar, el balance del año que culmina y la bienvenida a nuevos proyectos y metas con optimismo.",
    sinceWhen: "Festivo oficial en Colombia desde la promulgación de la Ley 35 de 1939 y ratificado por la Ley 51 de 1983 como feriado inamovible."
  },
  "Día de los Reyes Magos": {
    type: "Religioso (Epifanía)",
    originalDate: "6 de Enero",
    isEmiliani: true,
    history: "Conmemora la adoración del Niño Jesús por parte de los tres Reyes Magos de Oriente (Melchor, Gaspar y Baltasar), quienes guiados por una estrella llevaron como ofrendas oro, incienso y mirra.",
    whyHoliday: "Simboliza la manifestación de Jesucristo a toda la humanidad y marca tradicionalmente el cierre de la temporada de fiestas navideñas en Colombia.",
    sinceWhen: "Es festivo nacional de descanso remunerado en Colombia desde la Ley 51 de 1983 (Ley Emiliani), que trasladó su descanso al lunes siguiente."
  },
  "Día de San José": {
    type: "Religioso",
    originalDate: "19 de Marzo",
    isEmiliani: true,
    history: "Homenaje a San José, esposo de la Virgen María y padre terrenal de Jesús. En la tradición católica es considerado el patrono de los trabajadores, los carpinteros y protector universal de la familia.",
    whyHoliday: "Reconoce los valores del trabajo honesto, la paternidad responsable, la dedicación y el cuidado del núcleo familiar.",
    sinceWhen: "Instituido en el calendario festivo colombiano por la Ley 51 de 1983 (Ley Emiliani), moviéndose al siguiente lunes."
  },
  "Jueves Santo": {
    type: "Religioso (Semana Santa)",
    originalDate: "Jueves previo al Domingo de Resurrección",
    isEmiliani: false,
    history: "Conmemora la Última Cena de Jesús con sus doce apóstoles, donde se instituyó la Eucaristía, el sacramento del orden sacerdotal y el mandato del amor fraterno mediante el lavatorio de los pies.",
    whyHoliday: "Día de recogimiento, reflexión espiritual y visita a los siete monumentos sagrados en la tradición colombiana.",
    sinceWhen: "Feriado oficial inamovible en Colombia desde la Ley 35 de 1939 y amparado por el Concordato de 1887 y 1973."
  },
  "Viernes Santo": {
    type: "Religioso (Semana Santa)",
    originalDate: "Viernes previo al Domingo de Resurrección",
    isEmiliani: false,
    history: "Recuerda la Pasión, juicio, crucifixión y muerte de Jesús de Nazaret en el monte Calvario para la redención de los pecados según la fe cristiana.",
    whyHoliday: "Es el día más solemne de la Semana Santa. Se vive con silencio, procesiones del Santo Sepulcro, viacrucis y reflexión comunitaria.",
    sinceWhen: "Feriado sagrado inamovible en Colombia desde las primeras leyes de la República y ratificado por la Ley 35 de 1939 y la Ley 51 de 1983."
  },
  "Día del Trabajo": {
    type: "Internacional / Laboral",
    originalDate: "1 de Mayo",
    isEmiliani: false,
    history: "Rinde tributo a los 'Mártires de Chicago' de 1886, sindicalistas que iniciaron una huelga histórica para exigir la jornada laboral justa de 8 horas diarias.",
    whyHoliday: "Reconoce los derechos fundamentales de los trabajadores, la justicia social y el esfuerzo de la clase obrera en el desarrollo del país.",
    sinceWhen: "Declarado día festivo oficial en Colombia por la Ley 57 de 1905 y reafirmado como festivo inamovible por la Ley 51 de 1983."
  },
  "Ascensión del Señor": {
    type: "Religioso",
    originalDate: "40 días después del Domingo de Resurrección",
    isEmiliani: true,
    history: "Celebra la elevación de Jesús al cielo en cuerpo y alma en presencia de sus apóstoles en el Monte de los Olivos, cuarenta días después de resucitar.",
    whyHoliday: "Representa para los creyentes la promesa de la vida eterna y el envío del Espíritu Santo a los discípulos.",
    sinceWhen: "Establecido como festivo trasladable al lunes siguiente en Colombia gracias a la Ley 51 de 1983 (Ley Emiliani)."
  },
  "Corpus Christi": {
    type: "Religioso",
    originalDate: "60 días después del Domingo de Resurrección",
    isEmiliani: true,
    history: "Fiesta instituida en el siglo XIII para proclamar solemnemente la presencia real de Jesucristo en la Sagrada Eucaristía (Cuerpo y Sangre de Cristo).",
    whyHoliday: "En varias regiones de Colombia (como Anolaima o Mogotes) se celebra con coloridas alfombras de flores, arcos de frutas y procesiones patronales.",
    sinceWhen: "Feriado nacional de descanso obligatorio trasladado al lunes siguiente según la Ley 51 de 1983."
  },
  "Sagrado Corazón de Jesús": {
    type: "Religioso / Tradición Nacional",
    originalDate: "68 días después del Domingo de Resurrección",
    isEmiliani: true,
    history: "Celebra el amor y la misericordia divina del Corazón de Jesús. Colombia fue consagrada formalmente al Sagrado Corazón de Jesús en 1902 por el presidente José Manuel Marroquín tras el fin de la Guerra de los Mil Días buscando la paz nacional.",
    whyHoliday: "Guarda un profundo significado histórico y cultural de unión y esperanza en la historia republicana de Colombia.",
    sinceWhen: "Respaldado por el Decreto 820 de 1902 y ratificado como festivo con traslado al lunes por la Ley 51 de 1983."
  },
  "San Pedro y San Pablo": {
    type: "Religioso",
    originalDate: "29 de Junio",
    isEmiliani: true,
    history: "Honra a San Pedro, primer Papa y líder de los apóstoles, y a San Pablo, el gran apóstol de las naciones. Ambos sufrieron el martirio en Roma en el siglo I.",
    whyHoliday: "Es la fiesta patronal de los pilares de la Iglesia y coincide en Colombia con las grandes fiestas folclóricas del Bambuco en Huila y San Juan y San Pedro en Tolima.",
    sinceWhen: "Incorporado al régimen de feriados trasladables al lunes por la Ley 51 de 1983."
  },
  "Día de la Independencia": {
    type: "Patrio / Cívico Nacional",
    originalDate: "20 de Julio",
    isEmiliani: false,
    history: "El 20 de julio de 1810, tras el célebre incidente del Florero de Llorente en Santafé de Bogotá, los criollos conformaron la Junta Suprema de Gobierno, firmando el Acta de Independencia del dominio español.",
    whyHoliday: "Es la máxima fiesta patria cívica de Colombia. Se celebran desfiles militares, izadas de bandera nacional y se instala la nueva legislatura del Congreso de la República.",
    sinceWhen: "Declarado fiesta nacional inamovible por la Ley 60 del 8 de mayo de 1873."
  },
  "Batalla de Boyacá": {
    type: "Patrio / Cívico Nacional",
    originalDate: "7 de Agosto",
    isEmiliani: false,
    history: "El 7 de agosto de 1819, el ejército libertador comandado por Simón Bolívar y Francisco de Paula Santander derrotó decisivamente a las tropas realistas en el Puente de Boyacá, sellando la independencia definitiva de la Nueva Granada.",
    whyHoliday: "Conmemora la victoria libertadora definitiva y el Día del Ejército Nacional de Colombia. Además, cada cuatro años es la fecha constitucional de posesión presidencial.",
    sinceWhen: "Establecido como fiesta nacional y día patrio inamovible por la Ley 72 de 1881 y la Ley 51 de 1983."
  },
  "Asunción de la Virgen": {
    type: "Religioso",
    originalDate: "15 de Agosto",
    isEmiliani: true,
    history: "Celebra el dogma católico según el cual la Virgen María, al culminar su vida terrenal, fue elevada en cuerpo y alma a la gloria celestial.",
    whyHoliday: "Festividad mariana de amplia devoción en las parroquias y pueblos de Colombia.",
    sinceWhen: "Festivo con descanso remunerado trasladable al lunes por la Ley 51 de 1983 (Ley Emiliani)."
  },
  "Día de la Raza": {
    type: "Cultural / Diversidad Étnica",
    originalDate: "12 de Octubre",
    isEmiliani: true,
    history: "Conmemora el 12 de octubre de 1492, cuando la expedición de Cristóbal Colón llegó a América. En Colombia hoy se conmemora como el 'Día de la Diversidad Étnica y Cultural'.",
    whyHoliday: "Homenajea la rica herencia pluriétnica de Colombia, reconociendo el aporte de pueblos indígenas, afrodescendientes, raizales, rom y mestizos.",
    sinceWhen: "Instituido inicialmente por la Ley 35 de 1939 y trasladado al lunes siguiente por la Ley 51 de 1983."
  },
  "Todos los Santos": {
    type: "Religioso",
    originalDate: "1 de Noviembre",
    isEmiliani: true,
    history: "Jornada instituida para recordar a todos los santos conocidos y anónimos que han alcanzado la gloria divina según la tradición cristiana.",
    whyHoliday: "Tiempo de recuerdo espiritual, unión familiar y visita respetuosa a los cementerios en memoria de los seres queridos.",
    sinceWhen: "Festivo trasladado al lunes siguiente mediante la Ley 51 de 1983."
  },
  "Independencia de Cartagena": {
    type: "Patrio / Cívico Regional",
    originalDate: "11 de Noviembre",
    isEmiliani: true,
    history: "El 11 de noviembre de 1811, la provincia de Cartagena de Indias declaró su absoluta independencia de la Corona Española, convirtiéndose en el primer territorio colombiano libre y soberano (la 'Ciudad Heroica').",
    whyHoliday: "Conmemora la valentía emancipadora cartagenera y es el marco tradicional del Concurso Nacional de Belleza y las Fiestas de Independencia.",
    sinceWhen: "Reconocido por la Ley 35 de 1939 y trasladable al lunes por la Ley 51 de 1983."
  },
  "Inmaculada Concepción": {
    type: "Religioso / Tradición Popular",
    originalDate: "8 de Diciembre",
    isEmiliani: false,
    history: "Proclama que la Virgen María estuvo libre de todo pecado desde el primer instante de su concepción. En Colombia se acompaña en la víspera (7 de diciembre) con la mágica 'Noche de las Velitas'.",
    whyHoliday: "Es una de las tradiciones más queridas del país, llenando las calles y hogares de velas, faroles e inaugurando oficialmente el alumbrado navideño.",
    sinceWhen: "Feriado nacional inamovible desde la Ley 35 de 1939 y la Ley 51 de 1983."
  },
  "Navidad": {
    type: "Religioso / Universal",
    originalDate: "25 de Diciembre",
    isEmiliani: false,
    history: "Celebra el nacimiento de Jesucristo en Belén de Judea, acontecimiento central del cristianismo.",
    whyHoliday: "Día de regocijo universal, paz, entrega de regalos, cena navideña y reencuentro de las familias colombianas.",
    sinceWhen: "Festivo inamovible de descanso obligatorio en Colombia desde la fundación de la República y ratificado en la Ley 51 de 1983."
  }
};

export function getColombianHolidays(year) {
  const easter = getEasterDate(year);
  
  const rawHolidays = [
    // Fijos
    { date: new Date(year, 0, 1), name: "Año Nuevo" },
    { date: new Date(year, 4, 1), name: "Día del Trabajo" },
    { date: new Date(year, 6, 20), name: "Día de la Independencia" },
    { date: new Date(year, 7, 7), name: "Batalla de Boyacá" },
    { date: new Date(year, 11, 8), name: "Inmaculada Concepción" },
    { date: new Date(year, 11, 25), name: "Navidad" },

    // Ley Emiliani (Se trasladan al lunes)
    { date: nextMonday(new Date(year, 0, 6)), name: "Día de los Reyes Magos" },
    { date: nextMonday(new Date(year, 2, 19)), name: "Día de San José" },
    { date: nextMonday(new Date(year, 5, 29)), name: "San Pedro y San Pablo" },
    { date: nextMonday(new Date(year, 7, 15)), name: "Asunción de la Virgen" },
    { date: nextMonday(new Date(year, 9, 12)), name: "Día de la Raza" },
    { date: nextMonday(new Date(year, 10, 1)), name: "Todos los Santos" },
    { date: nextMonday(new Date(year, 10, 11)), name: "Independencia de Cartagena" },

    // Relativos a Semana Santa
    { date: addDays(easter, -3), name: "Jueves Santo" },
    { date: addDays(easter, -2), name: "Viernes Santo" },
    { date: nextMonday(addDays(easter, 39)), name: "Ascensión del Señor" },
    { date: nextMonday(addDays(easter, 60)), name: "Corpus Christi" },
    { date: nextMonday(addDays(easter, 68)), name: "Sagrado Corazón de Jesús" },
  ];

  // Enrich with detailed historical context
  const holidays = rawHolidays.map(h => {
    const details = holidayDetails[h.name] || {
      type: "Feriado Oficial",
      originalDate: `${h.date.getDate()} de ${h.date.toLocaleString('es-CO', { month: 'long' })}`,
      isEmiliani: false,
      history: "Día feriado nacional oficial en la República de Colombia.",
      whyHoliday: "Día de descanso remunerado para todos los ciudadanos.",
      sinceWhen: "Establecido por la legislación laboral colombiana."
    };

    return {
      ...h,
      ...details
    };
  });

  // Sort chronologically
  holidays.sort((a, b) => a.date - b.date);
  
  return holidays;
}
