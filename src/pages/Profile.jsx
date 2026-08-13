export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-[24px] py-[32px]">
      <div className="bg-surface-container-lowest dark:bg-primary-container border-2 border-border-muted rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-primary-fixed-dim rounded-full flex items-center justify-center text-[48px] text-on-primary-fixed">
            <span className="material-symbols-outlined text-[48px]">person</span>
          </div>
          <div>
            <h2 className="font-display-lg text-[32px] font-bold text-on-surface dark:text-inverse-on-surface">Mi Perfil</h2>
            <p className="text-[16px] text-on-surface-variant dark:text-outline-variant">Gestiona tu cuenta y preferencias.</p>
          </div>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block font-headline-sm text-[16px] mb-2 text-on-surface dark:text-inverse-on-surface">Nombre Completo</label>
            <input type="text" defaultValue="Juan Pérez" className="w-full md:w-1/2 p-3 rounded-lg border-2 border-border-muted bg-surface-bright dark:bg-inverse-surface dark:border-outline focus:border-secondary-fixed outline-none text-on-surface dark:text-inverse-on-surface transition-colors" />
          </div>
          <div>
            <label className="block font-headline-sm text-[16px] mb-2 text-on-surface dark:text-inverse-on-surface">Correo Electrónico</label>
            <input type="email" defaultValue="juan@ejemplo.com" disabled className="w-full md:w-1/2 p-3 rounded-lg border-2 border-border-muted bg-surface-variant/50 dark:bg-inverse-surface/50 text-on-surface-variant dark:text-outline-variant cursor-not-allowed transition-colors" />
          </div>
          <div className="pt-4">
            <button type="button" className="bg-secondary-fixed text-primary px-6 py-3 rounded-lg font-headline-sm hover:bg-secondary-fixed-dim transition-colors border-2 border-secondary font-semibold">Guardar Cambios</button>
          </div>
        </form>
        
        <div className="mt-12 pt-8 border-t-2 border-border-muted">
          <button className="text-accent-red font-headline-sm hover:underline transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
