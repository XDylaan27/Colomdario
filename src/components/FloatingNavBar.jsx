import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';

export default function FloatingNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const controls = useAnimationControls();

  const currentRealDate = new Date();
  const currentMonthNum = String(currentRealDate.getMonth() + 1).padStart(2, '0');

  const navItems = [
    { path: '/select-month', icon: 'today', label: 'Meses', basePath: '/select-month' },
    { path: `/calendar?month=${currentMonthNum}`, icon: 'calendar_month', label: 'Calendario', basePath: '/calendar' },
    { path: '/holidays', icon: 'celebration', label: 'Festivos', basePath: '/holidays' },
  ];

  // Ref to store the last known main navigation index (persisted when navigating to profile)
  const lastKnownIndexRef = useRef(() => {
    const saved = sessionStorage.getItem('colomdario_last_nav');
    const parsed = saved !== null ? parseInt(saved, 10) : NaN;
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 2) return parsed;
    const initialIdx = navItems.findIndex(item => location.pathname.startsWith(item.basePath));
    return initialIdx !== -1 ? initialIdx : 1;
  });

  const getIndexFromPath = (pathname) => {
    const idx = navItems.findIndex(item => pathname.startsWith(item.basePath));
    if (idx !== -1) {
      lastKnownIndexRef.current = idx;
      sessionStorage.setItem('colomdario_last_nav', String(idx));
      return idx;
    }
    // If on /profile or outside the main 3 routes, preserve the last known index
    return typeof lastKnownIndexRef.current === 'function' ? lastKnownIndexRef.current() : lastKnownIndexRef.current;
  };

  const [activeIndex, setActiveIndex] = useState(() => getIndexFromPath(location.pathname));
  const [displayedIndex, setDisplayedIndex] = useState(() => getIndexFromPath(location.pathname));
  const [direction, setDirection] = useState(1); // 1 = moving right, -1 = moving left
  const isAnimatingRef = useRef(false);

  // Position calculation for 3 items with 10px gap
  const getLeftPosition = (index) => {
    return `calc(${index} * ((100% - 20px) / 3 + 10px))`;
  };

  // Sync activeIndex and displayedIndex if location changes externally
  useEffect(() => {
    const targetIdx = getIndexFromPath(location.pathname);
    if (targetIdx !== activeIndex && !isAnimatingRef.current) {
      setDirection(targetIdx > activeIndex ? 1 : -1);
      setActiveIndex(targetIdx);
      setDisplayedIndex(targetIdx);
      controls.set({
        left: getLeftPosition(targetIdx),
        y: -6,
        boxShadow: '0 8px 0 0 rgba(40, 30, 0, 0.8), 0 12px 18px rgba(0, 0, 0, 0.45)',
      });
    }
  }, [location.pathname]);

  // Initial indicator position
  useEffect(() => {
    const initialIdx = getIndexFromPath(location.pathname);
    controls.set({
      left: getLeftPosition(initialIdx),
      y: -6,
      boxShadow: '0 8px 0 0 rgba(40, 30, 0, 0.8), 0 12px 18px rgba(0, 0, 0, 0.45)',
    });
  }, []);

  const handleTabClick = async (targetIndex, itemPath) => {
    if (isAnimatingRef.current) return;
    const isOnProfile = location.pathname.startsWith('/profile');

    if (targetIndex === activeIndex) {
      // If we are on /profile and click the currently selected tab, navigate back to it!
      if (isOnProfile) {
        navigate(itemPath);
      }
      
      // Quick tactile press feedback
      await controls.start({
        y: 0,
        boxShadow: '0 0px 0 0 rgba(0, 0, 0, 0), 0 0px 0px rgba(0, 0, 0, 0)',
        transition: { duration: 0.1, ease: 'easeOut' },
      });
      await controls.start({
        y: -6,
        boxShadow: '0 8px 0 0 rgba(40, 30, 0, 0.8), 0 12px 18px rgba(0, 0, 0, 0.45)',
        transition: { duration: 0.14, ease: 'easeOut' },
      });
      return;
    }

    isAnimatingRef.current = true;
    const dir = targetIndex > activeIndex ? 1 : -1;
    setDirection(dir);

    const distance = Math.abs(targetIndex - activeIndex);
    const travelDuration = distance === 1 ? 0.30 : 0.45; // 300ms adjacent, 450ms cross-end

    // --- PASO 1: HUNDIRSE (150ms) ---
    // Pierde su sombra 3D y desciende al nivel del riel (y: 0) simulando presión física
    await controls.start({
      y: 0,
      boxShadow: '0 0px 0 0 rgba(0, 0, 0, 0), 0 0px 0px rgba(0, 0, 0, 0)',
      transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
    });

    // Cambiamos el texto para que transicione suavemente durante el trayecto
    setDisplayedIndex(targetIndex);

    // --- PASO 2: VIAJAR (300ms / 450ms) ---
    // Deslizarse a la nueva posición mientras permanece a ras
    await controls.start({
      left: getLeftPosition(targetIndex),
      y: 0,
      boxShadow: '0 0px 0 0 rgba(0, 0, 0, 0), 0 0px 0px rgba(0, 0, 0, 0)',
      transition: { duration: travelDuration, ease: [0.25, 1, 0.5, 1] },
    });

    navigate(itemPath);
    setActiveIndex(targetIndex);
    lastKnownIndexRef.current = targetIndex;
    sessionStorage.setItem('colomdario_last_nav', String(targetIndex));

    // --- PASO 3: LEVANTARSE (150ms) ---
    // Al llegar a la posición, se eleva a y: -6px y recupera su gran sombra 3D con rebote
    await controls.start({
      y: -6,
      boxShadow: '0 8px 0 0 rgba(40, 30, 0, 0.8), 0 12px 18px rgba(0, 0, 0, 0.45)',
      transition: { duration: 0.15, ease: [0.175, 0.885, 0.32, 1.275] },
    });

    isAnimatingRef.current = false;
  };

  return (
    <nav
      aria-label="Barra de navegación principal"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-5 z-50 max-w-[360px] sm:max-w-[380px] w-[94%] mx-auto bg-[#6b6205] dark:bg-[#fedf76] p-2.5 rounded-[26px] shadow-2xl dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] border-t border-[#8c8209]/40 dark:border-[#fef08a] select-none transition-colors duration-300"
    >
      <div className="relative w-full flex items-center justify-between gap-2.5">
        
        {/* Animated 3D Raised Button Pill (Yellow in light mode, clean white/cream in dark mode with dark borders & 8px 3D shadow) */}
        <motion.div
          animate={controls}
          initial={{
            left: getLeftPosition(activeIndex),
            y: -6,
            boxShadow: '0 8px 0 0 rgba(40, 30, 0, 0.8), 0 12px 18px rgba(0, 0, 0, 0.45)',
          }}
          style={{ width: 'calc((100% - 20px) / 3)' }}
          className="absolute top-0 bottom-0 rounded-2xl bg-[#fedf76] dark:bg-[#ffffff] border-2 border-[#352500] dark:border-[#2b1f00] z-20 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Smooth Directional Crossfade Transition for Text and Icon during travel */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={displayedIndex}
              custom={direction}
              variants={{
                enter: (d) => ({
                  opacity: 0,
                  x: d * 16,
                  scale: 0.9,
                }),
                center: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    duration: 0.22,
                    ease: [0.25, 1, 0.5, 1],
                  },
                },
                exit: (d) => ({
                  opacity: 0,
                  x: -d * 16,
                  scale: 0.9,
                  transition: {
                    duration: 0.16,
                    ease: [0.4, 0, 1, 1],
                  },
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center justify-center text-[#352500] dark:text-[#2b1f00] font-bold"
            >
              <span
                className="material-symbols-outlined text-[24px] mb-0.5 leading-none"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {navItems[displayedIndex].icon}
              </span>
              <span className="text-[13px] tracking-tight leading-none whitespace-nowrap">
                {navItems[displayedIndex].label}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 3 Sunken Wells / Buttons */}
        {navItems.map((item, index) => {
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => handleTabClick(index, item.path)}
              className="relative z-10 flex-1 h-[58px] rounded-2xl bg-[#443e02] dark:bg-[#d4a813] border border-black/25 dark:border-[#a88204] shadow-[inset_0_4px_7px_rgba(0,0,0,0.6),inset_0_-1px_2px_rgba(255,255,255,0.06)] dark:shadow-[inset_0_3px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 group"
            >
              {/* Inactive Content (Visible when slot is empty / sunken) */}
              <div className="flex flex-col items-center justify-center text-white/95 dark:text-[#3b2b00] group-hover:text-white dark:group-hover:text-[#1c1400] transition-colors">
                <span className="material-symbols-outlined text-[23px] mb-0.5 leading-none opacity-90 group-hover:opacity-100">
                  {item.icon}
                </span>
                <span className="text-[12px] font-semibold tracking-tight leading-none opacity-90 group-hover:opacity-100">
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
