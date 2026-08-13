import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="bg-primary h-[100dvh] flex items-center justify-center p-[16px] relative overflow-hidden w-full">
      <main className="w-full max-w-md bg-surface-container-low dark:bg-surface-tint border-4 border-secondary-fixed-dim rounded-xl p-[24px] shadow-xl relative z-10 max-h-[95vh] overflow-y-auto no-scrollbar">
        <header className="text-center mb-stack-lg">
          <div className="flex justify-center mb-stack-sm">
            <img 
              alt="Colomdario Logo" 
              className="w-48 h-48 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ynR7wOwj3xqy9nHtzUF4YsehdgIRN4Xf-PgnVWhdodPGJ5UbF4VgG4dx3L485iwU4jTOZPCDsdGUH_0tM9B2qkG1__NFRr2oIsQDZtBQUynvdcsJlfIPW-_B1A3pR5Il3DabN_0tnFDJ6CPigK41NRtOyLpMt9aUlvtO1VMnV6h6jQiZZP6CAddtigrPqauFp2DErk1UjfdclBvpdoIH9OjWYcgt2kRir_vwfnV4ratCwOAsTsU23aS6wIEd-y4jZg" 
            />
          </div>
          <h1 className="font-display-lg text-[48px] leading-[56px] text-secondary-fixed mb-stack-sm font-bold">Colomdario</h1>
          <p className="font-body-lg text-[16px] text-inverse-on-surface">Crea tu cuenta para celebrar cada día.</p>
        </header>
        
        <form className="space-y-[16px] flex flex-col">
          <div className="flex flex-col gap-2">
            <label className="font-headline-sm text-[20px] font-semibold text-inverse-on-surface" htmlFor="fullname">Nombre Completo</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline-variant">person</span>
              <input 
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-border-muted bg-surface-bright dark:bg-inverse-surface dark:border-outline focus:border-secondary-fixed focus:ring-2 focus:ring-secondary-fixed outline-none transition-colors text-[16px] text-on-surface dark:text-inverse-on-surface placeholder:text-outline-variant" 
                id="fullname" 
                placeholder="Juan Pérez" 
                type="text" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-headline-sm text-[20px] font-semibold text-inverse-on-surface" htmlFor="email">Correo Electrónico</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline-variant">mail</span>
              <input 
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-border-muted bg-surface-bright dark:bg-inverse-surface dark:border-outline focus:border-secondary-fixed focus:ring-2 focus:ring-secondary-fixed outline-none transition-colors text-[16px] text-on-surface dark:text-inverse-on-surface placeholder:text-outline-variant" 
                id="email" 
                placeholder="juan@ejemplo.com" 
                type="email" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-headline-sm text-[20px] font-semibold text-inverse-on-surface" htmlFor="password">Contraseña</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline-variant">lock</span>
              <input 
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-border-muted bg-surface-bright dark:bg-inverse-surface dark:border-outline focus:border-secondary-fixed focus:ring-2 focus:ring-secondary-fixed outline-none transition-colors text-[16px] text-on-surface dark:text-inverse-on-surface placeholder:text-outline-variant" 
                id="password" 
                placeholder="••••••••" 
                type="password" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-headline-sm text-[20px] font-semibold text-inverse-on-surface" htmlFor="confirm-password">Confirmar Contraseña</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline-variant">lock</span>
              <input 
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-border-muted bg-surface-bright dark:bg-inverse-surface dark:border-outline focus:border-secondary-fixed focus:ring-2 focus:ring-secondary-fixed outline-none transition-colors text-[16px] text-on-surface dark:text-inverse-on-surface placeholder:text-outline-variant" 
                id="confirm-password" 
                placeholder="••••••••" 
                type="password" 
              />
            </div>
          </div>
          
          <Link to="/select-month" className="mt-stack-lg w-full bg-secondary-fixed hover:bg-secondary-fixed-dim text-primary border-2 border-secondary font-headline-md text-[24px] font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span>Registrarse</span>
            <span className="material-symbols-outlined">how_to_reg</span>
          </Link>
        </form>
        
        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-[14px] text-inverse-on-surface mb-2">¿Ya tienes una cuenta?</p>
          <Link to="/" className="font-headline-sm text-[20px] font-semibold text-secondary-fixed hover:text-secondary-fixed-dim underline decoration-2 underline-offset-4 transition-colors">Volver a Iniciar Sesión</Link>
        </div>
      </main>
    </div>
  );
}
