import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HolidayModal({ holiday, isOpen, onClose }) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !holiday) return null;

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const formattedDate = `${holiday.date.getDate()} de ${monthNames[holiday.date.getMonth()]} de ${holiday.date.getFullYear()}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 select-none">
        
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className="relative bg-surface-container-lowest dark:bg-primary-container w-full max-w-lg rounded-3xl shadow-2xl border-2 border-border-muted dark:border-outline flex flex-col max-h-[88vh] overflow-hidden z-10"
        >
          {/* Top Decorative Header */}
          <div className="relative p-6 bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent dark:from-secondary-fixed/20 dark:via-primary-container dark:to-primary-container border-b border-border-muted dark:border-outline/60 flex items-start justify-between gap-4 flex-shrink-0">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary dark:bg-secondary-fixed text-primary flex flex-col items-center justify-center shadow-md flex-shrink-0 border-2 border-secondary-fixed">
                <span className="text-[10px] font-extrabold uppercase tracking-wider leading-none">
                  {monthNames[holiday.date.getMonth()].substring(0, 3)}
                </span>
                <span className="text-[22px] font-black leading-none mt-1">
                  {holiday.date.getDate()}
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/20 dark:bg-secondary-fixed/25 text-secondary dark:text-secondary-fixed font-bold text-[11px] uppercase tracking-wide mb-1.5 border border-secondary/30">
                  <span className="material-symbols-outlined text-[14px]">celebration</span>
                  {holiday.type || 'Festivo Oficial'}
                </div>
                <h3 className="font-display-lg text-[22px] md:text-[26px] font-bold text-on-surface dark:text-inverse-on-surface leading-tight">
                  {holiday.name}
                </h3>
                <p className="text-[13px] text-on-surface-variant dark:text-outline-variant font-medium mt-0.5">
                  Fecha celebrada: <span className="font-semibold text-secondary dark:text-secondary-fixed">{formattedDate}</span>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-2 rounded-full hover:bg-surface-bright dark:hover:bg-inverse-surface text-on-surface-variant dark:text-outline-variant transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* Emiliani Transfer Notice */}
            {holiday.isEmiliani && (
              <div className="p-3 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 rounded-2xl flex items-start gap-2.5 text-[12px] text-amber-800 dark:text-amber-300">
                <span className="material-symbols-outlined text-[18px] flex-shrink-0 text-amber-600 dark:text-amber-400">info</span>
                <p>
                  <strong>Ley Emiliani:</strong> Su fecha conmemorativa original es el <strong>{holiday.originalDate}</strong>, pero el descanso remunerado se traslada al lunes para fomentar el turismo y descanso familiar.
                </p>
              </div>
            )}

            {/* Section 1: ¿Qué pasó este día? */}
            <div className="p-4 rounded-2xl bg-surface-bright dark:bg-inverse-surface border border-border-muted dark:border-outline space-y-2">
              <div className="flex items-center gap-2 text-secondary dark:text-secondary-fixed font-bold text-[14px]">
                <span className="material-symbols-outlined text-[20px]">history_edu</span>
                <h4>¿Qué pasó este día? (Historia)</h4>
              </div>
              <p className="text-[13px] md:text-[14px] text-on-surface dark:text-inverse-on-surface leading-relaxed font-normal">
                {holiday.history}
              </p>
            </div>

            {/* Section 2: ¿Por qué es festivo? */}
            <div className="p-4 rounded-2xl bg-surface-bright dark:bg-inverse-surface border border-border-muted dark:border-outline space-y-2">
              <div className="flex items-center gap-2 text-secondary dark:text-secondary-fixed font-bold text-[14px]">
                <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
                <h4>¿Por qué es festivo? (Significado)</h4>
              </div>
              <p className="text-[13px] md:text-[14px] text-on-surface dark:text-inverse-on-surface leading-relaxed font-normal">
                {holiday.whyHoliday}
              </p>
            </div>

            {/* Section 3: ¿Desde cuándo es festivo? */}
            <div className="p-4 rounded-2xl bg-surface-bright dark:bg-inverse-surface border border-border-muted dark:border-outline space-y-2">
              <div className="flex items-center gap-2 text-secondary dark:text-secondary-fixed font-bold text-[14px]">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
                <h4>¿Desde cuándo es festivo en Colombia?</h4>
              </div>
              <p className="text-[13px] md:text-[14px] text-on-surface dark:text-inverse-on-surface leading-relaxed font-normal">
                {holiday.sinceWhen}
              </p>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-border-muted dark:border-outline/60 flex items-center justify-end bg-surface-container-lowest dark:bg-primary-container flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-secondary dark:bg-secondary-fixed text-primary font-bold text-[14px] hover:bg-secondary/90 dark:hover:bg-secondary-fixed-dim transition-all shadow-sm cursor-pointer"
            >
              Entendido
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
