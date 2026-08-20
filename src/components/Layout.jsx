import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import mariposaAmarilla from '../assets/mariposa-amarilla.png';
import { useCalendarContext } from '../context/CalendarContext';
import YearSelectModal from './YearSelectModal';
import FloatingNavBar from './FloatingNavBar';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    selectedYear,
    setSelectedYear,
    isYearModalOpen,
    setIsYearModalOpen,
    isMultiSelect,
    setIsMultiSelect,
    setIsNoteModalOpen,
    activeMonth,
    setActiveMonth,
    monthNames
  } = useCalendarContext();

  const isCalendar = location.pathname.startsWith('/calendar');

  const currentRealDate = new Date();
  const currentMonthNum = String(currentRealDate.getMonth() + 1).padStart(2, '0');
  const currentDayNum = currentRealDate.getDate();

  // Click on Colomdario logo/name -> Go to current year, current month and current date
  const handleLogoClick = (e) => {
    e.preventDefault();
    const realYear = currentRealDate.getFullYear();
    const realMonth = currentRealDate.getMonth();
    setSelectedYear(realYear);
    setActiveMonth(realMonth);
    navigate(`/calendar?year=${realYear}&month=${currentMonthNum}&day=${currentDayNum}`);
  };

  // Click on "Nueva Nota" button in header
  const handleAddNoteClick = () => {
    if (!user) {
      navigate('/register');
      return;
    }
    if (!isCalendar) {
      const activeMonthNum = String(activeMonth + 1).padStart(2, '0');
      navigate(`/calendar?month=${activeMonthNum}`);
    }
    setIsNoteModalOpen(true);
  };

  // Click on "Selección Múltiple" in header
  const handleToggleMultiSelect = () => {
    if (!isCalendar) {
      const activeMonthNum = String(activeMonth + 1).padStart(2, '0');
      navigate(`/calendar?month=${activeMonthNum}`);
    }
    setIsMultiSelect(prev => !prev);
  };

  return (
    <div className={`bg-surface dark:bg-primary font-body-md text-[14px] text-on-surface dark:text-on-primary selection:bg-secondary selection:text-primary w-full flex flex-col relative ${isCalendar ? 'h-screen overflow-hidden' : 'min-h-screen pb-32'}`}>
      
      {/* Year Selection Modal */}
      <YearSelectModal />

      {/* Decorative Yellow Butterflies Background */}
      <img alt="" className="fixed top-20 left-10 w-24 opacity-20 pointer-events-none z-0 rotate-12" src={mariposaAmarilla} />
      <img alt="" className="fixed bottom-32 right-16 w-32 opacity-20 pointer-events-none z-0 -rotate-12" src={mariposaAmarilla} />
      <img alt="" className="fixed top-1/2 left-3/4 w-20 opacity-10 pointer-events-none z-0 rotate-45" src={mariposaAmarilla} />
      <img alt="" className="fixed bottom-1/4 left-1/4 w-28 opacity-15 pointer-events-none z-0 -rotate-45" src={mariposaAmarilla} />

      {/* Top Navigation */}
      <header className="bg-surface-container-lowest dark:bg-primary px-4 md:px-8 py-3 w-full sticky top-0 z-50 border-b-4 border-primary dark:border-secondary-fixed-dim shadow-sm flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo, Name & Year Selector */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <button
            onClick={handleLogoClick}
            type="button"
            className="flex items-center gap-2 text-left group hover:opacity-90 transition-opacity"
            title="Ir a la fecha actual de hoy"
          >
            <img
              alt="Colomdario Logo"
              className="w-9 h-9 md:w-10 md:h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw1alPM8XBP3cFx2wkDrBIx_r2oFWyFT4UJq-GZbIQxcQValY4ejZBA7PfiOFI5FyI5foXh-Zz01fZhqCcJu4_0X532UqxyWK498djDumaZiAmyeXlZxc-bUL4B1gmmUJTQR_V9Kr9zuBibJWQaJ6vZSycrZ4xh3Gkczu3vWQxZQvuZYrzbJB_eDg0HxNtoDKKXXbg80XVDusMpOimcrgV6BSjoyvOXin_tF1JHaQnhlihopbnBtjzbtk7pzk3_N-zyw"
            />
            <span className="font-display-lg font-brand text-[28px] md:text-[34px] leading-none font-bold text-secondary dark:text-secondary-fixed m-0 tracking-tight">
              Colomdario
            </span>
          </button>

          {/* Year Selector Chip Button (only in calendar view) */}
          {isCalendar && (
            <button
              type="button"
              onClick={() => setIsYearModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary/15 dark:bg-secondary-fixed/20 hover:bg-secondary/25 text-secondary dark:text-secondary-fixed font-bold text-[14px] md:text-[15px] border border-secondary/30 transition-all hover:scale-105 shadow-xs cursor-pointer overflow-hidden"
              title="Cambiar año"
            >
              <motion.span
                key={selectedYear}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: [1, 1.35, 0.9, 1.15, 1],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                {selectedYear}
              </motion.span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          )}
        </div>

        {/* Right Side: Calendar Controls (only in calendar view) & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 text-secondary dark:text-secondary-fixed">
          
          {isCalendar && (
            <>
              {/* Active Month Switcher Controls with Fixed Stable Width */}
              <div className="flex items-center bg-surface-bright dark:bg-inverse-surface border-2 border-border-muted dark:border-outline hover:border-secondary-fixed rounded-xl p-0.5 md:p-1 shadow-sm transition-colors">
                <button
                  type="button"
                  onClick={() => {
                    if (activeMonth === 0) {
                      const newYear = selectedYear - 1;
                      setSelectedYear(newYear);
                      setActiveMonth(11);
                      navigate(`/calendar?year=${newYear}&month=12`);
                    } else {
                      const prevMonth = activeMonth - 1;
                      setActiveMonth(prevMonth);
                      navigate(`/calendar?month=${String(prevMonth + 1).padStart(2, '0')}`);
                    }
                  }}
                  aria-label="Mes anterior"
                  className="p-1 md:p-1.5 rounded-lg hover:bg-secondary/15 text-secondary dark:text-secondary-fixed transition-colors flex items-center justify-center cursor-pointer"
                  title="Mes anterior"
                >
                  <span className="material-symbols-outlined text-[20px] md:text-[22px]">chevron_left</span>
                </button>

                <Link
                  to="/select-month"
                  className="w-28 sm:w-32 md:w-36 text-center py-0.5 md:py-1 text-secondary dark:text-secondary-fixed font-bold text-[15px] md:text-[17px] tracking-tight hover:opacity-80 transition-opacity truncate inline-block"
                  title="Ver todos los meses"
                >
                  {monthNames[activeMonth]}
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (activeMonth === 11) {
                      const newYear = selectedYear + 1;
                      setSelectedYear(newYear);
                      setActiveMonth(0);
                      navigate(`/calendar?year=${newYear}&month=01`);
                    } else {
                      const nextMonth = activeMonth + 1;
                      setActiveMonth(nextMonth);
                      navigate(`/calendar?month=${String(nextMonth + 1).padStart(2, '0')}`);
                    }
                  }}
                  aria-label="Mes siguiente"
                  className="p-1 md:p-1.5 rounded-lg hover:bg-secondary/15 text-secondary dark:text-secondary-fixed transition-colors flex items-center justify-center cursor-pointer"
                  title="Mes siguiente"
                >
                  <span className="material-symbols-outlined text-[20px] md:text-[22px]">chevron_right</span>
                </button>
              </div>

              {/* Multiple Selection Toggle Button */}
              <button
                type="button"
                onClick={handleToggleMultiSelect}
                aria-label="Selección Múltiple"
                className={`p-2 rounded-xl transition-all active:scale-95 flex items-center justify-center border shadow-xs ${
                  isMultiSelect
                    ? 'bg-secondary text-primary dark:bg-secondary-fixed dark:text-primary border-secondary font-bold ring-2 ring-secondary/30'
                    : 'bg-surface-bright dark:bg-inverse-surface hover:bg-surface-container-highest dark:hover:bg-primary-container border-border-muted dark:border-outline text-secondary dark:text-secondary-fixed'
                }`}
                title={isMultiSelect ? "Desactivar selección múltiple" : "Activar selección múltiple"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isMultiSelect ? 'checklist_rtl' : 'checklist'}
                </span>
              </button>

              {/* New Note Button */}
              <button
                type="button"
                onClick={handleAddNoteClick}
                aria-label="Nueva Nota"
                className="p-2 rounded-xl bg-secondary/15 dark:bg-secondary-fixed/20 hover:bg-secondary/25 border border-secondary/30 text-secondary dark:text-secondary-fixed transition-all active:scale-95 flex items-center justify-center shadow-xs"
                title="Agregar nueva nota"
              >
                <span className="material-symbols-outlined text-[20px]">note_add</span>
              </button>
            </>
          )}

          {/* Profile Link */}
          <Link
            to="/profile"
            aria-label="Perfil"
            className="p-2 rounded-xl hover:bg-surface-container-highest dark:hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center"
            title="Mi perfil y ajustes"
          >
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area with Smooth Page Transition */}
      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname.split('?')[0]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Global Animated Floating Navigation */}
      <FloatingNavBar />
    </div>
  );
}
