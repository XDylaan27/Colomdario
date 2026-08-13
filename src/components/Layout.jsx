import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check initial preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { path: '/select-month', icon: 'today', label: 'Meses' },
    { path: '/calendar', icon: 'calendar_month', label: 'Calendario', fill: true },
    { path: '/holidays', icon: 'celebration', label: 'Festivos' },
    { path: '/profile', icon: 'person', label: 'Perfil' },
  ];

  return (
    <div className="bg-surface dark:bg-primary min-h-screen font-body-md text-[14px] text-on-surface dark:text-on-primary selection:bg-secondary selection:text-primary w-full pb-32 flex flex-col transition-colors duration-300 relative">
      
      {/* Decorative Yellow Butterflies Background */}
      <img alt="" className="fixed top-20 left-10 w-24 opacity-20 pointer-events-none z-0 rotate-12" style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(87%) saturate(3065%) hue-rotate(345deg) brightness(101%) contrast(106%)' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcVpCSmUOLf8RE-RauJLTkI5nuPYnmOLukfYzHuCE2xX1jRMEi2hywVFox4ViWhOgUDvkhUcVAuhsKK5oHl-RupwUJK_d7nD34l2yKeyBuqO098DfdXIDoeoAXC44jV5ey2pluWigVtadSaRV7N2yzbidRf52xmTuu4APUaB7bxydq4vuKaizyOEvXcDPmKjSn-jchshCLUlPrbq4S9YtB6cRSNE_NYhxDWchFgb7zXNIeg40VdCt6-eVPFguPrRjjag" />
      <img alt="" className="fixed bottom-32 right-16 w-32 opacity-20 pointer-events-none z-0 -rotate-12" style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(87%) saturate(3065%) hue-rotate(345deg) brightness(101%) contrast(106%)' }} src="https://lh3.googleusercontent.com/aida/AP1WRLtw4xPwNqJEgLqy0F4HzoPCvnFp5FlLLWkFLJIwS4N1pHZ_3E6_Gin8pcGd6_aVCUSyHYGZXdJ-k1MLxdHXOsCHBsBlL2CUvGsW3PiCq4P1WTyQz9byB2bfRIlLw5tmxQUBdwq9S6_tMF0lrjoDJ06f2QhPzrFsNpEf1u_5nR9-wHFN9u_RLYWO0bOWoopVByd-dKqbLgWGuL_roPaFTpNASq8f5nOosAHzvnNcH-PIH50uEyZaWpWEYDw" />
      <img alt="" className="fixed top-1/2 left-3/4 w-20 opacity-10 pointer-events-none z-0 rotate-45" style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(87%) saturate(3065%) hue-rotate(345deg) brightness(101%) contrast(106%)' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcVpCSmUOLf8RE-RauJLTkI5nuPYnmOLukfYzHuCE2xX1jRMEi2hywVFox4ViWhOgUDvkhUcVAuhsKK5oHl-RupwUJK_d7nD34l2yKeyBuqO098DfdXIDoeoAXC44jV5ey2pluWigVtadSaRV7N2yzbidRf52xmTuu4APUaB7bxydq4vuKaizyOEvXcDPmKjSn-jchshCLUlPrbq4S9YtB6cRSNE_NYhxDWchFgb7zXNIeg40VdCt6-eVPFguPrRjjag" />
      <img alt="" className="fixed bottom-1/4 left-1/4 w-28 opacity-15 pointer-events-none z-0 -rotate-45" style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(87%) saturate(3065%) hue-rotate(345deg) brightness(101%) contrast(106%)' }} src="https://lh3.googleusercontent.com/aida/AP1WRLtw4xPwNqJEgLqy0F4HzoPCvnFp5FlLLWkFLJIwS4N1pHZ_3E6_Gin8pcGd6_aVCUSyHYGZXdJ-k1MLxdHXOsCHBsBlL2CUvGsW3PiCq4P1WTyQz9byB2bfRIlLw5tmxQUBdwq9S6_tMF0lrjoDJ06f2QhPzrFsNpEf1u_5nR9-wHFN9u_RLYWO0bOWoopVByd-dKqbLgWGuL_roPaFTpNASq8f5nOosAHzvnNcH-PIH50uEyZaWpWEYDw" />

      {/* Top Navigation */}
      <header className="bg-surface-container-lowest dark:bg-primary font-headline-sm text-[20px] font-semibold flex justify-between items-center px-[24px] py-[16px] w-full sticky top-0 z-50 border-b-4 border-primary dark:border-secondary-fixed-dim transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/select-month" className="flex items-center gap-2">
            <img alt="Colomdario Logo" className="w-10 h-10 object-contain drop-shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw1alPM8XBP3cFx2wkDrBIx_r2oFWyFT4UJq-GZbIQxcQValY4ejZBA7PfiOFI5FyI5foXh-Zz01fZhqCcJu4_0X532UqxyWK498djDumaZiAmyeXlZxc-bUL4B1gmmUJTQR_V9Kr9zuBibJWQaJ6vZSycrZ4xh3Gkczu3vWQxZQvuZYrzbJB_eDg0HxNtoDKKXXbg80XVDusMpOimcrgV6BSjoyvOXin_tF1JHaQnhlihopbnBtjzbtk7pzk3_N-zyw" />
            <h1 className="font-display-lg text-[32px] md:text-[40px] leading-tight font-bold text-secondary dark:text-secondary-fixed m-0 tracking-tight">Colomdario</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-secondary dark:text-secondary-fixed">
          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode" className="hover:opacity-80 active:scale-95 transition-all p-2 rounded-full hover:bg-surface-container-highest dark:hover:bg-primary-container">
            <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button aria-label="QR Code" className="hidden sm:block hover:opacity-80 active:scale-95 transition-all p-2 rounded-full hover:bg-surface-container-highest dark:hover:bg-primary-container">
            <span className="material-symbols-outlined">qr_code_2</span>
          </button>
          <Link to="/profile" aria-label="Profile" className="hover:opacity-80 active:scale-95 transition-all p-2 rounded-full hover:bg-surface-container-highest dark:hover:bg-primary-container">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative">
        <Outlet />
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden bg-surface-container-lowest dark:bg-primary font-label-caps text-[12px] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 border-t-4 border-primary dark:border-secondary-fixed-dim rounded-t-xl transition-colors duration-300 shadow-lg">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center p-2 transition-all duration-200 rounded-xl w-full ${isActive ? 'bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed -translate-y-1 shadow-sm' : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-primary-container'}`}>
              <span className="material-symbols-outlined mb-1" style={item.fill ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Global Desktop Navigation */}
      <nav className="hidden md:flex bg-surface-container-lowest dark:bg-primary font-label-caps text-[12px] fixed bottom-0 left-0 w-full z-50 justify-around items-center px-4 py-2 border-t-4 border-primary dark:border-secondary-fixed-dim rounded-t-xl max-w-sm mx-auto left-1/2 -translate-x-1/2 mb-[24px] shadow-xl transition-colors duration-300">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center p-2 px-6 transition-all duration-200 rounded-xl ${isActive ? 'bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed -translate-y-1 shadow-sm' : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-primary-container'}`}>
              <span className="material-symbols-outlined mb-1" style={item.fill ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
