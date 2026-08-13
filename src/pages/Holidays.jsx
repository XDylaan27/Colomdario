import { getColombianHolidays } from '../utils/holidays';

export default function Holidays() {
  const currentYear = 2026;
  const holidays = getColombianHolidays(currentYear);
  
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  return (
    <div className="max-w-4xl mx-auto px-[24px] py-[32px]">
      <div className="text-center mb-12">
        <h2 className="font-display-lg text-[40px] font-bold text-secondary-fixed mb-[8px] drop-shadow-md">Festivos Nacionales</h2>
        <p className="font-body-lg text-[16px] text-on-surface-variant dark:text-inverse-primary max-w-md mx-auto">Fechas importantes y feriados en Colombia.</p>
      </div>
      
      <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
        {holidays.map((h, i) => (
          <div key={i} className="flex items-start gap-6 p-6 bg-surface-container-lowest dark:bg-primary-container rounded-xl border-2 border-border-muted shadow-sm hover:border-primary-fixed transition-colors">
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-surface-bright dark:bg-inverse-surface rounded-lg shadow-sm border-2 border-secondary">
              <span className="text-[14px] font-semibold text-accent-red uppercase">{monthNames[h.date.getMonth()]}</span>
              <span className="text-[32px] font-bold text-secondary dark:text-secondary-fixed leading-none mt-1">{h.date.getDate()}</span>
            </div>
            <div className="flex-1 py-2">
              <h4 className="font-headline-md text-[24px] font-semibold text-on-surface dark:text-inverse-on-surface">{h.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
