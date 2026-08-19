import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { isDarkMode, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [weekStart, setWeekStart] = useState('Monday');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('weekStart');
    if (saved) setWeekStart(saved);
  }, []);

  const handleWeekStartChange = (val) => {
    setWeekStart(val);
    localStorage.setItem('weekStart', val);
    showSuccessToast();
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    showSuccessToast();
  };

  const showSuccessToast = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogout = async () => {
    if (signOut) {
      await signOut();
    }
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <div className="bg-surface-container-lowest dark:bg-primary-container border-2 border-border-muted dark:border-outline rounded-2xl p-6 md:p-8 shadow-sm">
        
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border-muted dark:border-outline/50">
          <div className="w-20 h-20 bg-secondary/20 dark:bg-secondary-fixed/20 rounded-2xl flex items-center justify-center text-[40px] text-secondary dark:text-secondary-fixed border border-secondary/30">
            <span className="material-symbols-outlined text-[40px]">person</span>
          </div>
          <div>
            <h2 className="font-display-lg text-[28px] md:text-[32px] font-bold text-on-surface dark:text-inverse-on-surface leading-tight">
              Mi Perfil
            </h2>
            <p className="text-[14px] text-on-surface-variant dark:text-outline-variant mt-0.5">
              Personaliza tu experiencia, preferencias de calendario y apariencia.
            </p>
          </div>
        </div>

        {/* Success message */}
        {savedSuccess && (
          <div className="mb-6 p-3 bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed rounded-xl font-semibold text-[14px] flex items-center gap-2 border border-secondary">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            ¡Preferencias actualizadas correctamente!
          </div>
        )}

        <div className="space-y-8">
          
          {/* User Details */}
          <section className="space-y-4">
            <h3 className="font-headline-sm text-[18px] font-semibold text-on-surface dark:text-inverse-on-surface">
              Información de la Cuenta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium mb-1.5 text-on-surface-variant dark:text-outline-variant">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  defaultValue={user?.user_metadata?.full_name || "Usuario Colomdario"}
                  className="w-full p-3 rounded-xl border border-border-muted bg-surface-bright dark:bg-inverse-surface dark:border-outline focus:border-secondary-fixed outline-none text-on-surface dark:text-inverse-on-surface text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1.5 text-on-surface-variant dark:text-outline-variant">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || "usuario@ejemplo.com"}
                  disabled
                  className="w-full p-3 rounded-xl border border-border-muted bg-surface-variant/40 dark:bg-inverse-surface/40 text-on-surface-variant dark:text-outline-variant cursor-not-allowed text-[14px]"
                />
              </div>
            </div>
          </section>

          {/* Theme Selector (Moved from Top Header) */}
          <section className="space-y-4 pt-4 border-t border-border-muted dark:border-outline/50">
            <div>
              <h3 className="font-headline-sm text-[18px] font-semibold text-on-surface dark:text-inverse-on-surface">
                Tema y Apariencia
              </h3>
              <p className="text-[13px] text-on-surface-variant dark:text-outline-variant">
                Selecciona cómo deseas ver la aplicación en tu dispositivo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              <button
                type="button"
                onClick={() => handleThemeChange('light')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  !isDarkMode
                    ? 'border-secondary bg-secondary/15 dark:bg-secondary-fixed/20 shadow-sm font-bold text-secondary dark:text-secondary-fixed'
                    : 'border-border-muted dark:border-outline bg-surface-bright dark:bg-inverse-surface text-on-surface-variant hover:border-secondary/50'
                }`}
              >
                <span className="material-symbols-outlined text-[28px] text-amber-500">light_mode</span>
                <span className="text-[14px]">Modo Claro</span>
                {!isDarkMode && (
                  <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full font-bold">Activo</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleThemeChange('dark')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'border-secondary-fixed bg-secondary-fixed/20 shadow-sm font-bold text-secondary-fixed'
                    : 'border-border-muted dark:border-outline bg-surface-bright dark:bg-inverse-surface text-on-surface-variant hover:border-secondary/50'
                }`}
              >
                <span className="material-symbols-outlined text-[28px] text-indigo-400">dark_mode</span>
                <span className="text-[14px]">Modo Oscuro</span>
                {isDarkMode && (
                  <span className="text-[10px] bg-secondary-fixed text-primary px-2 py-0.5 rounded-full font-bold">Activo</span>
                )}
              </button>
            </div>
          </section>

          {/* Calendar Week Start Preference */}
          <section className="space-y-4 pt-4 border-t border-border-muted dark:border-outline/50">
            <div>
              <h3 className="font-headline-sm text-[18px] font-semibold text-on-surface dark:text-inverse-on-surface">
                Primer Día de la Semana
              </h3>
              <p className="text-[13px] text-on-surface-variant dark:text-outline-variant">
                Determina qué día encabeza las columnas de tu calendario.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              <button
                type="button"
                onClick={() => handleWeekStartChange('Monday')}
                className={`p-3.5 rounded-xl border-2 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  weekStart === 'Monday'
                    ? 'border-secondary bg-secondary/15 dark:bg-secondary-fixed/20 font-bold text-secondary dark:text-secondary-fixed shadow-sm'
                    : 'border-border-muted dark:border-outline bg-surface-bright dark:bg-inverse-surface text-on-surface-variant hover:border-secondary/50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">calendar_view_week</span>
                <span>Lunes</span>
              </button>

              <button
                type="button"
                onClick={() => handleWeekStartChange('Sunday')}
                className={`p-3.5 rounded-xl border-2 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  weekStart === 'Sunday'
                    ? 'border-secondary bg-secondary/15 dark:bg-secondary-fixed/20 font-bold text-secondary dark:text-secondary-fixed shadow-sm'
                    : 'border-border-muted dark:border-outline bg-surface-bright dark:bg-inverse-surface text-on-surface-variant hover:border-secondary/50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">calendar_view_week</span>
                <span>Domingo</span>
              </button>
            </div>
          </section>

          {/* Logout Section */}
          <div className="pt-6 border-t border-border-muted dark:border-outline/50 flex justify-between items-center">
            <button
              type="button"
              onClick={handleLogout}
              className="text-accent-red hover:bg-accent-red/10 px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 text-[14px]"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Cerrar Sesión
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
