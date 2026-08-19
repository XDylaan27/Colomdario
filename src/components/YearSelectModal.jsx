import { useEffect, useRef, useState } from 'react';
import { useCalendarContext } from '../context/CalendarContext';

export default function YearSelectModal() {
  const { isYearModalOpen, setIsYearModalOpen, selectedYear, setSelectedYear } = useCalendarContext();
  const currentRealYear = new Date().getFullYear();
  const activeYearRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Generate range from 1950 to 2060
  const startYear = 1950;
  const endYear = 2060;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const filteredYears = searchTerm
    ? years.filter(y => y.toString().includes(searchTerm))
    : years;

  useEffect(() => {
    if (isYearModalOpen) {
      // Auto-scroll to selected year
      const timer = setTimeout(() => {
        if (activeYearRef.current) {
          activeYearRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isYearModalOpen, selectedYear]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isYearModalOpen) {
        setIsYearModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isYearModalOpen, setIsYearModalOpen]);

  if (!isYearModalOpen) return null;

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setIsYearModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-primary-container w-full max-w-lg rounded-2xl shadow-2xl border-2 border-border-muted dark:border-outline flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 md:p-6 border-b border-border-muted dark:border-outline/60 flex items-center justify-between flex-shrink-0 bg-surface-container-lowest dark:bg-primary-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 dark:bg-secondary-fixed/20 text-secondary dark:text-secondary-fixed flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">calendar_today</span>
            </div>
            <div>
              <h3 className="font-display-lg text-[22px] font-bold text-on-surface dark:text-inverse-on-surface leading-tight">
                Seleccionar Año
              </h3>
              <p className="text-[13px] text-on-surface-variant dark:text-outline-variant">
                Año seleccionado actual: <span className="font-bold text-secondary dark:text-secondary-fixed">{selectedYear}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsYearModalOpen(false)}
            aria-label="Cerrar modal"
            className="p-2 rounded-full hover:bg-surface-bright dark:hover:bg-inverse-surface text-on-surface-variant dark:text-outline-variant transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
            </svg>
          </button>
        </div>

        {/* Quick Actions & Search */}
        <div className="px-4 md:px-6 py-3 border-b border-border-muted dark:border-outline/40 flex items-center gap-3 bg-surface-bright/50 dark:bg-inverse-surface/10 flex-shrink-0">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar año..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-[14px] rounded-lg border border-border-muted dark:border-outline bg-surface-bright dark:bg-inverse-surface text-on-surface dark:text-inverse-on-surface outline-none focus:border-secondary-fixed"
            />
          </div>

          <button
            type="button"
            onClick={() => handleSelectYear(currentRealYear)}
            className="px-3 py-1.5 text-[13px] font-semibold bg-secondary/15 dark:bg-secondary-fixed/20 text-secondary dark:text-secondary-fixed hover:bg-secondary/25 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-accent-red"></span>
            Año actual ({currentRealYear})
          </button>
        </div>

        {/* Years Grid / Scroll Area */}
        <div
          ref={scrollContainerRef}
          className="p-4 md:p-6 overflow-y-auto flex-1 grid grid-cols-3 sm:grid-cols-4 gap-2.5"
        >
          {filteredYears.map((year) => {
            const isSelected = year === selectedYear;
            const isCurrent = year === currentRealYear;

            let btnClasses = "py-3 px-2 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-150 relative cursor-pointer ";

            if (isSelected) {
              btnClasses += "bg-secondary text-primary dark:bg-secondary-fixed dark:text-primary font-bold shadow-md ring-2 ring-secondary dark:ring-secondary-fixed ";
            } else if (isCurrent) {
              btnClasses += "bg-surface-bright dark:bg-inverse-surface border-2 border-accent-red text-on-surface dark:text-inverse-on-surface font-semibold hover:border-secondary ";
            } else {
              btnClasses += "bg-surface-bright dark:bg-inverse-surface border border-border-muted dark:border-outline text-on-surface dark:text-inverse-on-surface font-medium hover:border-secondary-fixed hover:bg-secondary/10 ";
            }

            return (
              <button
                key={year}
                ref={isSelected ? activeYearRef : null}
                type="button"
                onClick={() => handleSelectYear(year)}
                className={btnClasses}
              >
                <span className="text-[16px] leading-tight">{year}</span>
                {isCurrent && (
                  <span className="text-[10px] text-accent-red font-bold uppercase mt-0.5 leading-none">
                    Hoy
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border-muted dark:border-outline/60 flex items-center justify-between text-[12px] text-on-surface-variant dark:text-outline-variant bg-surface-container-lowest dark:bg-primary-container flex-shrink-0">
          <span>Rango disponible: {startYear} - {endYear}</span>
          <button
            onClick={() => setIsYearModalOpen(false)}
            className="px-4 py-1.5 rounded-lg border border-border-muted dark:border-outline hover:bg-surface-bright dark:hover:bg-inverse-surface text-on-surface dark:text-inverse-on-surface font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
