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

export function getColombianHolidays(year) {
  const easter = getEasterDate(year);
  
  const holidays = [
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

  // Sort chronologically
  holidays.sort((a, b) => a.date - b.date);
  
  return holidays;
}
