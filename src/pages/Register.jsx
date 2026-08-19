import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import mariposaAmarilla from '../assets/mariposa-amarilla.png';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/calendar');
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
      <main className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm flex flex-col justify-center">
          
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-[32px] font-display-lg font-bold text-secondary dark:text-secondary-fixed leading-tight">Colomdario</h1>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-[28px] font-headline-md font-bold text-on-surface">Crea tu cuenta</h2>
            <p className="text-[14px] text-on-surface-variant mt-1">Únete a Colomdario para organizar tu tiempo.</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-[14px]">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
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
