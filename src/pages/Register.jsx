import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import mariposaAmarilla from '../assets/mariposa-amarilla.png';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect straight to calendar
  useEffect(() => {
    if (user) {
      navigate('/calendar');
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    
    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/calendar');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-surface dark:bg-primary h-[100dvh] w-full flex overflow-hidden flex-row-reverse">
      {/* Decorative Right Panel (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary-container dark:bg-on-secondary-fixed-variant relative flex-col justify-center items-center p-12 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, #e1c566 0%, transparent 50%), radial-gradient(circle at 20% 80%, #002465 0%, transparent 50%)' }}></div>
        <img 
          alt="Colomdario" 
          className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl animate-pulse-slow" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7qgzlDkApyJaoz-n6XBNEBbRy0FPQw3DXAE2vL9tCJfmDtxLGUKXBLMv3uO4bESD_hesLdQqsvQNt-M-pAITxfyHmNje5YwuDYlpap8pCXsrxIPLWWR3x7XmayPDl_pxpV0umdb94VwVJOjsdIYE51TfjmjMpBqcIsYxIc2oXFTfFbugeu9mFk-JKH1y6T9DoeN6fYlhr7mOh9mdYXyW4JMLWbVk66W6tueQ3K2V3nSwlbJn_1rfIg7_FokTXZmGaLA" 
        />
        <h1 className="text-[64px] font-display-lg font-bold text-on-secondary-container dark:text-secondary-fixed mt-8 relative z-10 text-center leading-none">Colomdario</h1>
        <p className="text-[24px] font-headline-sm text-on-secondary-container dark:text-secondary-fixed mt-4 relative z-10 text-center opacity-80">Únete para celebrar cada día.</p>
        
        {/* Floating yellow butterflies */}
        <img alt="" className="absolute top-32 left-20 w-16 opacity-40 -rotate-12" src={mariposaAmarilla} />
        <img alt="" className="absolute bottom-20 right-16 w-24 opacity-40 rotate-45" src={mariposaAmarilla} />
      </div>

      {/* Left Panel (Form) */}
      <main className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-sm flex flex-col justify-center">
          
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-[32px] font-display-lg font-bold text-secondary dark:text-secondary-fixed leading-tight">Colomdario</h1>
          </div>

          <div className="text-center lg:text-left mb-6">
            <h2 className="text-[28px] font-headline-md font-bold text-on-surface">Crea tu cuenta</h2>
            <p className="text-[14px] text-on-surface-variant mt-1">Únete a Colomdario para organizar tu tiempo.</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-[14px]">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border-2 border-border-muted hover:border-secondary rounded-lg shadow-xs hover:bg-neutral-50 text-neutral-800 font-semibold text-[14px] transition-all active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continuar con Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="border-t border-border-muted w-full"></div>
            <span className="bg-surface px-3 text-[12px] text-on-surface-variant uppercase font-semibold">o</span>
            <div className="border-t border-border-muted w-full"></div>
          </div>

          <form className="space-y-3.5" onSubmit={handleRegister}>
            <div>
              <label className="block text-[12px] font-semibold text-on-surface dark:text-inverse-on-surface uppercase tracking-wider mb-1" htmlFor="fullname">Nombre Completo</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">person</span>
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-surface-bright dark:bg-inverse-surface border-2 border-border-muted dark:border-outline rounded-lg text-on-surface dark:text-inverse-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary dark:focus:ring-secondary-fixed dark:focus:border-secondary-fixed transition-colors text-[14px]" 
                  id="fullname" 
                  name="fullname" 
                  placeholder="Juan Pérez" 
                  required 
                  type="text" 
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-on-surface dark:text-inverse-on-surface uppercase tracking-wider mb-1" htmlFor="email">Correo Electrónico</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">mail</span>
                <input 
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border-2 border-border-muted rounded-lg text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors text-[14px]" 
                  id="email" 
                  name="email" 
                  placeholder="tu@correo.com.co" 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[12px] font-semibold text-on-surface dark:text-inverse-on-surface uppercase tracking-wider mb-1" htmlFor="password">Contraseña</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">lock</span>
                <input 
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border-2 border-border-muted rounded-lg text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors text-[14px]" 
                  id="password" 
                  name="password" 
                  placeholder="Mínimo 8 caracteres" 
                  required 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-on-surface dark:text-inverse-on-surface uppercase tracking-wider mb-1" htmlFor="confirm-password">Confirmar Contraseña</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">lock</span>
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-surface-bright dark:bg-inverse-surface border-2 border-border-muted dark:border-outline rounded-lg text-on-surface dark:text-inverse-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary dark:focus:ring-secondary-fixed dark:focus:border-secondary-fixed transition-colors text-[14px]" 
                  id="confirm-password" 
                  name="confirm-password" 
                  placeholder="••••••••" 
                  required 
                  type="password" 
                />
              </div>
            </div>
            
            <div className="pt-2 pb-2">
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-secondary rounded-lg shadow-sm text-[16px] font-semibold text-on-secondary-container bg-secondary-container hover:opacity-90 transition-all active:scale-[0.98] mt-2 disabled:opacity-50">
                <span>{loading ? 'Creando cuenta...' : 'Crear cuenta'}</span>
                <span className="material-symbols-outlined text-[20px]">person_add</span>
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[14px] text-on-surface-variant dark:text-outline-variant">
              ¿Ya tienes una cuenta?
              <Link to="/" className="font-semibold text-secondary dark:text-secondary-fixed hover:underline transition-all ml-1">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
