import { Link, useSearchParams } from 'react-router-dom';
import { getColombianHolidays } from '../utils/holidays';

export default function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentYear = 2026;
  const monthParam = searchParams.get('month');
  const initialMonth = monthParam ? parseInt(monthParam, 10) - 1 : 0; // Default to Enero
  
  const month = (initialMonth >= 0 && initialMonth <= 11) ? initialMonth : 0;
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
  const firstDay = new Date(currentYear, month, 1).getDay(); // 0 = Sun, 1 = Mon
  const startingDay = firstDay === 0 ? 6 : firstDay - 1; // Make Monday = 0
  const emptyCells = Array.from({ length: startingDay }, (_, i) => i);
  
  const allHolidays = getColombianHolidays(currentYear);
  const monthHolidays = allHolidays.filter(h => h.date.getMonth() === month);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(currentYear, month, day);
    const holiday = monthHolidays.find(h => h.date.getDate() === day);
    
    return {
      day,
      isHoliday: !!holiday,
      holidayName: holiday ? holiday.name : null,
      desc: holiday ? 'Festivo Nacional' : null,
      isWeekend: date.getDay() === 0 || date.getDay() === 6
    };
  });

  const handleNext = () => {
    const next = month === 11 ? 1 : month + 2;
    setSearchParams({ month: next.toString().padStart(2, '0') });
  };

  const handlePrev = () => {
    const prev = month === 0 ? 12 : month;
    setSearchParams({ month: prev.toString().padStart(2, '0') });
  };

  return (
    <div className="flex flex-col relative">
      {/* Calendar Sub-Header */}
      <div className="bg-surface-container-lowest dark:bg-primary-container border-b-2 border-border-muted px-4 md:px-8 py-3 sticky top-[72px] z-40 w-full shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex justify-center md:justify-start items-center gap-6">
            <div className="flex items-center gap-4">
              <button onClick={handlePrev} aria-label="Mes anterior" className="p-2 rounded-full hover:bg-surface-bright dark:hover:bg-inverse-surface hover:text-accent-red transition-colors text-on-surface-variant dark:text-outline-variant">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
              </button>
              <h2 className="text-[20px] md:text-[24px] font-semibold text-on-surface dark:text-inverse-on-surface w-40 md:w-48 text-center tracking-wide">{monthNames[month]} {currentYear}</h2>
              <button onClick={handleNext} aria-label="Mes siguiente" className="p-2 rounded-full hover:bg-surface-bright dark:hover:bg-inverse-surface hover:text-accent-red transition-colors text-on-surface-variant dark:text-outline-variant">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
              </button>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-4">
            <button className="hidden md:block px-5 py-2.5 bg-surface-bright dark:bg-inverse-surface border-2 border-border-muted text-on-surface-variant dark:text-outline-variant font-headline-sm rounded-xl hover:border-secondary-fixed transition-colors shadow-sm">
              Selección Múltiple
            </button>
            <button className="px-5 py-2.5 bg-primary dark:bg-secondary-fixed text-on-primary dark:text-primary font-headline-sm rounded-xl hover:bg-primary-container dark:hover:bg-secondary-fixed-dim transition-colors shadow-sm">
              Nueva Nota
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 p-[16px] md:p-[32px] items-start relative z-10">
        <section aria-label="Cuadrícula del calendario" className="flex-1 relative w-full">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 md:gap-3 mb-2">
            <div className="text-center text-[12px] md:text-[16px] text-secondary uppercase tracking-widest py-2 font-headline-sm">Lun</div>
            <div className="text-center text-[12px] md:text-[16px] text-secondary uppercase tracking-widest py-2 font-headline-sm">Mar</div>
            <div className="text-center text-[12px] md:text-[16px] text-secondary uppercase tracking-widest py-2 font-headline-sm">Mié</div>
            <div className="text-center text-[12px] md:text-[16px] text-secondary uppercase tracking-widest py-2 font-headline-sm">Jue</div>
            <div className="text-center text-[12px] md:text-[16px] text-secondary uppercase tracking-widest py-2 font-headline-sm">Vie</div>
            <div className="text-center text-[12px] md:text-[16px] text-secondary uppercase tracking-widest py-2 font-headline-sm">Sáb</div>
            <div className="text-center text-[12px] md:text-[16px] text-accent-red uppercase tracking-widest py-2 font-headline-sm">Dom</div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-3 relative z-10">
            {emptyCells.map(c => (
              <article key={`empty-${c}`} className="min-h-[80px] md:min-h-[120px] bg-transparent rounded-xl p-2 md:p-3 flex flex-col opacity-40">
              </article>
            ))}
            {days.map((d) => (
              d.isHoliday ? (
                <article key={d.day} className="min-h-[80px] md:min-h-[120px] transition-all duration-200 hover:shadow-md group relative bg-secondary-container dark:bg-on-secondary-fixed-variant border-4 border-secondary dark:border-secondary-fixed rounded-xl p-[8px] md:p-[12px] flex flex-col overflow-hidden shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[18px] md:text-[24px] font-semibold text-on-secondary-container dark:text-secondary-fixed">{d.day}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-accent-red hover:bg-white rounded-full bg-white/50" title="Añadir nota">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
                    </button>
                  </div>
                  <div className="mt-auto hidden md:block">
                    <p className="text-[14px] font-semibold text-on-secondary-container dark:text-secondary-fixed leading-tight">{d.holidayName}</p>
                  </div>
                </article>
              ) : (
                <article key={d.day} className="min-h-[80px] md:min-h-[120px] transition-all duration-200 hover:shadow-md group relative bg-surface-container-lowest dark:bg-primary-container border-2 border-border-muted dark:border-outline hover:border-primary-fixed dark:hover:border-primary-fixed rounded-xl p-[8px] md:p-[12px] flex flex-col">
                  <div className="flex justify-between items-start">
                    <span className={`text-[16px] md:text-[20px] font-semibold ${d.isWeekend ? 'text-accent-red' : 'text-on-surface dark:text-inverse-on-surface'}`}>{d.day}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-secondary dark:text-secondary-fixed hover:bg-surface-bright dark:hover:bg-inverse-surface rounded-full" title="Añadir nota">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
                    </button>
                  </div>
                </article>
              )
            ))}
          </div>
        </section>

        {/* Sidebar Section */}
        <aside aria-label="Barra lateral de utilidades" className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-36">
          <section className="bg-surface-container-lowest dark:bg-primary-container border-2 border-border-muted dark:border-outline rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <svg className="w-6 h-6 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
              <h3 className="text-[20px] font-semibold text-on-surface dark:text-inverse-on-surface">Festivos del Mes</h3>
            </div>
            {monthHolidays.length > 0 ? (
              <ul className="space-y-4 relative z-10">
                {monthHolidays.map((h, i) => (
                  <li key={i} className="flex items-start gap-4 p-3 bg-secondary-container dark:bg-on-secondary-fixed-variant rounded-lg border-2 border-secondary dark:border-secondary-fixed">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-surface-bright dark:bg-inverse-surface rounded-lg shadow-sm border-2 border-secondary dark:border-secondary-fixed">
                      <span className="text-[12px] font-semibold text-accent-red uppercase">{monthNames[month].substring(0, 3)}</span>
                      <span className="text-[24px] font-semibold text-on-surface dark:text-inverse-on-surface leading-none mt-0.5">{h.date.getDate()}</span>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-on-secondary-container dark:text-secondary-fixed">{h.name}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-on-surface-variant dark:text-outline-variant text-[14px]">No hay festivos en este mes.</p>
            )}
            <Link to="/holidays" className="block text-center w-full mt-4 py-2 text-[14px] font-semibold text-accent-red hover:underline transition-colors border-t-2 border-border-muted dark:border-outline pt-4 relative z-10">
              Ver todos los festivos
            </Link>
          </section>
        </aside>
      </main>
    </div>
  );
}
