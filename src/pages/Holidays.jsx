import { useState } from 'react';
import { getColombianHolidays } from '../utils/holidays';
import { useCalendarContext } from '../context/CalendarContext';
import HolidayModal from '../components/HolidayModal';

export default function Holidays() {
  const { selectedYear, setIsYearModalOpen } = useCalendarContext();
  const holidays = getColombianHolidays(selectedYear);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      {/* Modal de Detalle e Historia del Festivo */}
      <HolidayModal
        holiday={selectedHoliday}
        isOpen={!!selectedHoliday}
        onClose={() => setSelectedHoliday(null)}
      />

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-3">
          <button
            type="button"
            onClick={() => setIsYearModalOpen(true)}
            className="px-3.5 py-1 bg-secondary/15 dark:bg-secondary-fixed/20 hover:bg-secondary/25 text-secondary dark:text-secondary-fixed font-bold text-[14px] rounded-full border border-secondary/30 transition-all hover:scale-105 flex items-center gap-1 cursor-pointer"
            title="Clic para cambiar de año"
          >
            <span>Año {selectedYear}</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
        <h2 className="font-display-lg text-[32px] md:text-[40px] font-bold text-secondary dark:text-secondary-fixed mb-2 drop-shadow-sm leading-tight">
          Festivos Nacionales de Colombia
        </h2>
        <p className="font-body-md text-[15px] text-on-surface-variant dark:text-inverse-primary max-w-md mx-auto">
          {holidays.length} días feriados oficiales. Haz clic en cualquiera para conocer su historia, significado y origen legal.
        </p>
      </div>
      
      <div className="space-y-3 relative z-10 max-w-2xl mx-auto pb-16">
        {holidays.map((h, i) => (
          <div
            key={i}
            onClick={() => setSelectedHoliday(h)}
            className="flex items-center gap-4 p-4 bg-surface-container-lowest dark:bg-primary-container rounded-2xl border-2 border-border-muted dark:border-outline shadow-sm hover:border-secondary dark:hover:border-secondary-fixed transition-all hover:-translate-y-0.5 cursor-pointer group"
          >
            {/* Date Badge */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-surface-bright dark:bg-inverse-surface rounded-xl shadow-xs border border-secondary dark:border-secondary-fixed group-hover:scale-105 transition-transform">
              <span className="text-[11px] font-bold text-accent-red uppercase">{monthNames[h.date.getMonth()]}</span>
              <span className="text-[20px] font-bold text-secondary dark:text-secondary-fixed leading-none mt-0.5">{h.date.getDate()}</span>
            </div>

            {/* Holiday Title and Type */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-headline-md text-[16px] md:text-[18px] font-semibold text-on-surface dark:text-inverse-on-surface leading-snug group-hover:text-secondary dark:group-hover:text-secondary-fixed transition-colors truncate">
                  {h.name}
                </h4>
              </div>
              <p className="text-[12px] text-on-surface-variant dark:text-outline-variant flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>{h.type}</span>
                {h.isEmiliani && <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">(Ley Emiliani)</span>}
              </p>
            </div>

            {/* Action / Information Icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 dark:bg-secondary-fixed/15 text-secondary dark:text-secondary-fixed flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">info</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
