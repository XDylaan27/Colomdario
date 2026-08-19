import { Link, useNavigate } from 'react-router-dom';
import { getColombianHolidays } from '../utils/holidays';
import { useCalendarContext } from '../context/CalendarContext';

export default function SelectMonth() {
  const navigate = useNavigate();
  const { selectedYear, setIsYearModalOpen, monthNames } = useCalendarContext();
  const weekStart = localStorage.getItem('weekStart') || 'Monday';
  const isMondayStart = weekStart === 'Monday';

  const allHolidays = getColombianHolidays(selectedYear);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const isCurrentYear = today.getFullYear() === selectedYear;

  const weekdays = isMondayStart
    ? [
        { label: 'L', full: 'Lun', isSun: false },
        { label: 'M', full: 'Mar', isSun: false },
        { label: 'M', full: 'Mié', isSun: false },
        { label: 'J', full: 'Jue', isSun: false },
        { label: 'V', full: 'Vie', isSun: false },
        { label: 'S', full: 'Sáb', isSun: false },
        { label: 'D', full: 'Dom', isSun: true }
      ]
    : [
        { label: 'D', full: 'Dom', isSun: true },
        { label: 'L', full: 'Lun', isSun: false },
        { label: 'M', full: 'Mar', isSun: false },
        { label: 'M', full: 'Mié', isSun: false },
        { label: 'J', full: 'Jue', isSun: false },
        { label: 'V', full: 'Vie', isSun: false },
        { label: 'S', full: 'Sáb', isSun: false }
      ];

  const monthsData = Array.from({ length: 12 }, (_, mIndex) => {
    const monthId = String(mIndex + 1).padStart(2, '0');
    const monthName = monthNames[mIndex];
    const daysInMonth = new Date(selectedYear, mIndex + 1, 0).getDate();
    const firstDay = new Date(selectedYear, mIndex, 1).getDay(); // 0 = Sun, 1 = Mon

    const startingOffset = isMondayStart
      ? (firstDay === 0 ? 6 : firstDay - 1)
      : firstDay;

    const monthHolidays = allHolidays.filter(h => h.date.getMonth() === mIndex);

    const days = Array.from({ length: daysInMonth }, (_, dIndex) => {
      const day = dIndex + 1;
      const date = new Date(selectedYear, mIndex, day);
      const holiday = monthHolidays.find(h => h.date.getDate() === day);
      const isSunday = date.getDay() === 0;
      const isToday = isCurrentYear && mIndex === currentMonth && day === currentDay;

      return {
        day,
        isHoliday: !!holiday,
        holidayName: holiday ? holiday.name : null,
        isSunday,
        isToday
      };
    });

    return {
      monthId,
      monthName,
      startingOffset,
      days,
      holidayCount: monthHolidays.length,
      isCurrentMonth: isCurrentYear && mIndex === currentMonth
    };
  });

  const handleDayClick = (monthId, dayNumber) => {
    navigate(`/calendar?month=${monthId}&day=${dayNumber}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-border-muted dark:border-outline/50 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              type="button"
              onClick={() => setIsYearModalOpen(true)}
              className="px-3 py-1 bg-secondary/15 dark:bg-secondary-fixed/20 hover:bg-secondary/25 text-secondary dark:text-secondary-fixed font-bold text-[14px] rounded-full border border-secondary/30 transition-all hover:scale-105 flex items-center gap-1 cursor-pointer"
              title="Clic para cambiar de año"
            >
              <span>Año {selectedYear}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            {isCurrentYear && (
              <span className="flex items-center gap-1.5 text-on-surface-variant dark:text-inverse-primary text-[14px]">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-accent-red"></span>
                Hoy: {currentDay} de {monthNames[currentMonth]}
              </span>
            )}
          </div>
          <h2 className="font-display-lg text-[32px] md:text-[40px] font-bold text-secondary dark:text-secondary-fixed tracking-tight leading-none">
            Vista Anual
          </h2>
          <p className="font-body-md text-[14px] md:text-[15px] text-on-surface-variant dark:text-inverse-primary mt-1.5">
            Haz clic en cualquier día para abrir el calendario y consultar o añadir notas.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-[13px] text-on-surface dark:text-inverse-on-surface bg-surface-container-lowest dark:bg-primary-container p-3 rounded-xl border border-border-muted dark:border-outline shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 dark:bg-amber-400 flex items-center justify-center text-[9px] text-white font-bold">●</span>
            <span className="font-medium text-amber-700 dark:text-amber-400">Festivo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-accent-red flex items-center justify-center text-[9px] text-white font-bold">●</span>
            <span>Domingo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full border-2 border-accent-red flex items-center justify-center text-[10px] font-bold text-on-surface dark:text-inverse-on-surface">14</span>
            <span>Hoy</span>
          </div>
        </div>
      </div>

      {/* 12 Months Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10 pb-16">
        {monthsData.map((m) => (
          <div
            key={m.monthId}
            className={`bg-surface-container-lowest dark:bg-primary-container rounded-2xl p-4 border-2 hover:shadow-md ${
              m.isCurrentMonth
                ? 'border-secondary dark:border-secondary-fixed shadow-sm'
                : 'border-border-muted dark:border-outline'
            }`}
          >
            {/* Month Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-muted dark:border-outline/50">
              <Link
                to={`/calendar?month=${m.monthId}`}
                className="group flex items-baseline gap-2 hover:opacity-80"
              >
                <h3 className="text-[17px] font-bold text-on-surface dark:text-inverse-on-surface group-hover:text-secondary dark:group-hover:text-secondary-fixed">
                  {m.monthName}
                </h3>
                <span className="text-[12px] font-semibold text-on-surface-variant dark:text-outline-variant">
                  {m.monthId}
                </span>
              </Link>

              {m.holidayCount > 0 && (
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30"
                  title={`${m.holidayCount} festivo(s)`}
                >
                  {m.holidayCount} festivo{m.holidayCount > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
              {weekdays.map((w, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-bold uppercase py-0.5 ${
                    w.isSun ? 'text-accent-red' : 'text-secondary dark:text-outline-variant'
                  }`}
                  title={w.full}
                >
                  {w.label}
                </span>
              ))}
            </div>

            {/* Days Mini Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty leading cells */}
              {Array.from({ length: m.startingOffset }).map((_, emptyIdx) => (
                <div key={`empty-${emptyIdx}`} className="aspect-square" />
              ))}

              {/* Month Days */}
              {m.days.map((d) => {
                let cellClasses = "aspect-square flex flex-col items-center justify-center text-[12px] rounded-full cursor-pointer relative group ";

                if (d.isToday) {
                  // Today: enclosed in red circle with normal text color
                  cellClasses += "border-2 border-accent-red font-bold text-on-surface dark:text-inverse-on-surface hover:bg-accent-red/10 ";
                } else if (d.isHoliday) {
                  // Holiday: gold / amber color
                  cellClasses += "text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-500/15 ";
                } else if (d.isSunday) {
                  // Sunday: red text
                  cellClasses += "text-accent-red font-medium hover:bg-surface-bright dark:hover:bg-inverse-surface ";
                } else {
                  // Normal day: regular text
                  cellClasses += "text-on-surface dark:text-inverse-on-surface hover:bg-surface-bright dark:hover:bg-inverse-surface ";
                }

                return (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => handleDayClick(m.monthId, d.day)}
                    className={cellClasses}
                    title={d.holidayName ? `${d.day} de ${m.monthName}: ${d.holidayName}` : `${d.day} de ${m.monthName}`}
                  >
                    <span>{d.day}</span>
                    {d.isHoliday && !d.isToday && (
                      <span className="w-1 h-1 rounded-full bg-amber-500 dark:bg-amber-400 absolute bottom-1"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
