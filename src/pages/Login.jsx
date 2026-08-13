import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="bg-[#001233] text-white h-[100dvh] flex items-center justify-center relative overflow-hidden w-full">
      {/* Decorative Butterflies could go here if implemented as components */}
      <main className="w-full max-w-md p-[16px] z-10 relative">
        <div className="bg-[#00113a]/80 backdrop-blur-md rounded-xl border-4 border-[#e1c566] p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[95vh] overflow-y-auto no-scrollbar">
          {/* Subtle internal decoration */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#fee17f]/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#CE1126]/10 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-[32px] relative z-10">
            <img 
              alt="Logo Colomdario Mariposa" 
              className="w-24 h-24 mx-auto mb-[8px] object-contain drop-shadow-md" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7qgzlDkApyJaoz-n6XBNEBbRy0FPQw3DXAE2vL9tCJfmDtxLGUKXBLMv3uO4bESD_hesLdQqsvQNt-M-pAITxfyHmNje5YwuDYlpap8pCXsrxIPLWWR3x7XmayPDl_pxpV0umdb94VwVJOjsdIYE51TfjmjMpBqcIsYxIc2oXFTfFbugeu9mFk-JKH1y6T9DoeN6fYlhr7mOh9mdYXyW4JMLWbVk66W6tueQ3K2V3nSwlbJn_1rfIg7_FokTXZmGaLA" 
            />
            <h1 className="text-[48px] leading-[56px] font-bold text-[#fee17f] tracking-tight">COLOMDARIO</h1>
            <p className="text-[16px] text-[#b3c5ff] mt-2">Tu calendario, a lo colombiano.</p>
          </div>
          
          <form className="space-y-[16px] relative z-10">
            <div>
              <label className="block text-[14px] text-[#b3c5ff] mb-2 ml-1" htmlFor="email">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#e1c566]/70">mail</span>
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-3 bg-[#435c9e]/20 border-2 border-[#e1c566]/50 rounded-lg text-white placeholder-[#b3c5ff]/50 focus:outline-none focus:ring-2 focus:ring-[#fee17f] focus:border-[#fee17f] transition-colors text-[16px]" 
                  id="email" 
                  name="email" 
                  placeholder="tu@correo.com.co" 
                  required 
                  type="email" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[14px] text-[#b3c5ff] mb-2 ml-1" htmlFor="password">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#e1c566]/70">lock</span>
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-3 bg-[#435c9e]/20 border-2 border-[#e1c566]/50 rounded-lg text-white placeholder-[#b3c5ff]/50 focus:outline-none focus:ring-2 focus:ring-[#fee17f] focus:border-[#fee17f] transition-colors text-[16px]" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password" 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input 
                  className="h-5 w-5 rounded border-2 border-[#e1c566] text-[#fee17f] focus:ring-[#fee17f] bg-[#435c9e]/20" 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                />
                <label className="ml-2 block text-[14px] text-[#b3c5ff]" htmlFor="remember-me">
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a className="text-[14px] text-[#fee17f] hover:text-[#e1c566] transition-colors underline decoration-2 underline-offset-2" href="#">¿Olvidaste tu contraseña?</a>
              </div>
            </div>
            
            <div className="pt-[8px]">
              <Link to="/select-month" className="w-full flex justify-center py-4 px-4 border-2 border-transparent rounded-lg shadow-sm text-[20px] font-semibold text-[#231b00] bg-[#fee17f] hover:bg-[#e1c566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#001233] focus:ring-[#fee17f] transition-all active:scale-95 border-b-4 border-b-[#564500]">
                Entrar a Colomdario
              </Link>
            </div>
          </form>
          
          <div className="mt-[32px] text-center relative z-10">
            <p className="text-[14px] text-[#b3c5ff]">
              ¿No tienes cuenta aún?
              <Link to="/register" className="text-[20px] font-semibold text-[#fee17f] hover:text-[#e1c566] transition-colors ml-1 underline decoration-2 underline-offset-2">Crear cuenta</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
