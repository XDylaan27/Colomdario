import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import mariposaAmarilla from '../assets/mariposa-amarilla.png';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/calendar');
    }
  };

  return (
    <div className="bg-surface h-[100dvh] w-full flex overflow-hidden">
      {/* Decorative Left Panel (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary-container relative flex-col justify-center items-center p-12 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #e1c566 0%, transparent 50%), radial-gradient(circle at 80% 80%, #002465 0%, transparent 50%)' }}></div>
        <img 
          alt="Colomdario" 
          className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl animate-pulse-slow" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7qgzlDkApyJaoz-n6XBNEBbRy0FPQw3DXAE2vL9tCJfmDtxLGUKXBLMv3uO4bESD_hesLdQqsvQNt-M-pAITxfyHmNje5YwuDYlpap8pCXsrxIPLWWR3x7XmayPDl_pxpV0umdb94VwVJOjsdIYE51TfjmjMpBqcIsYxIc2oXFTfFbugeu9mFk-JKH1y6T9DoeN6fYlhr7mOh9mdYXyW4JMLWbVk66W6tueQ3K2V3nSwlbJn_1rfIg7_FokTXZmGaLA" 
        />
        <h1 className="text-[64px] font-display-lg font-bold text-on-secondary-container mt-8 relative z-10 text-center leading-none">Colomdario</h1>
        <p className="text-[24px] font-headline-sm text-on-secondary-container mt-4 relative z-10 text-center opacity-80">Tu calendario, a lo colombiano.</p>
        
        {/* Floating yellow butterflies */}
        <img alt="" className="absolute top-20 right-20 w-16 opacity-40 rotate-12" src={mariposaAmarilla} />
        <img alt="" className="absolute bottom-32 left-16 w-24 opacity-40 -rotate-12" src={mariposaAmarilla} />
      </div>

      {/* Right Panel (Form) */}
      <main className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm flex flex-col justify-center">
          
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <img 
              alt="Logo" 
              className="w-16 h-16 mx-auto mb-2 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7qgzlDkApyJaoz-n6XBNEBbRy0FPQw3DXAE2vL9tCJfmDtxLGUKXBLMv3uO4bESD_hesLdQqsvQNt-M-pAITxfyHmNje5YwuDYlpap8pCXsrxIPLWWR3x7XmayPDl_pxpV0umdb94VwVJOjsdIYE51TfjmjMpBqcIsYxIc2oXFTfFbugeu9mFk-JKH1y6T9DoeN6fYlhr7mOh9mdYXyW4JMLWbVk66W6tueQ3K2V3nSwlbJn_1rfIg7_FokTXZmGaLA" 
            />
            <h1 className="text-[32px] font-display-lg font-bold text-secondary leading-tight">Colomdario</h1>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-[28px] font-headline-md font-bold text-on-surface">Bienvenido de nuevo</h2>
            <p className="text-[14px] text-on-surface-variant mt-1">Ingresa tus datos para continuar.</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-[14px]">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-[12px] font-semibold text-on-surface uppercase tracking-wider mb-1.5" htmlFor="email">Correo Electrónico</label>
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
              <label className="block text-[12px] font-semibold text-on-surface uppercase tracking-wider mb-1.5" htmlFor="password">Contraseña</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">lock</span>
                <input 
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border-2 border-border-muted rounded-lg text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors text-[14px]" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-1 pb-4">
              <div className="flex items-center gap-2">
                <input 
                  className="w-4 h-4 rounded border-2 border-border-muted text-secondary focus:ring-secondary bg-surface-bright" 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                />
                <label className="text-[12px] text-on-surface-variant" htmlFor="remember-me">
                  Recordarme
                </label>
              </div>
              <a className="text-[12px] font-semibold text-secondary hover:underline transition-all" href="#">¿Olvidaste tu contraseña?</a>
            </div>
            
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-secondary rounded-lg shadow-sm text-[16px] font-semibold text-on-secondary-container bg-secondary-container hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50">
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-[14px] text-on-surface-variant">
              ¿No tienes cuenta aún?
              <Link to="/register" className="font-semibold text-secondary hover:underline transition-all ml-1">Crear cuenta</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
