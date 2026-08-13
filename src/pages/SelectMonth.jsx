import { Link } from 'react-router-dom';

const months = [
  { id: '01', name: 'Enero', color: 'bg-accent-red' },
  { id: '02', name: 'Febrero', color: 'bg-secondary' },
  { id: '03', name: 'Marzo', color: 'bg-primary' },
  { id: '04', name: 'Abril', color: 'bg-accent-red' },
  { id: '05', name: 'Mayo', color: 'bg-secondary' },
  { id: '06', name: 'Junio', color: 'bg-primary' },
  { id: '07', name: 'Julio', color: 'bg-accent-red' },
  { id: '08', name: 'Agosto', color: 'bg-secondary' },
  { id: '09', name: 'Septiembre', color: 'bg-primary' },
  { id: '10', name: 'Octubre', color: 'bg-accent-red' },
  { id: '11', name: 'Noviembre', color: 'bg-secondary' },
  { id: '12', name: 'Diciembre', color: 'bg-primary' }
];

export default function SelectMonth() {
  return (
    <main className="max-w-7xl mx-auto px-[24px] py-[32px] relative overflow-hidden">
      {/* Decorative Butterflies */}
      <img alt="Butterfly decoration top left" className="absolute top-0 left-0 w-24 h-24 opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 rotate-12" src="https://lh3.googleusercontent.com/aida/AP1WRLtw4xPwNqJEgLqy0F4HzoPCvnFp5FlLLWkFLJIwS4N1pHZ_3E6_Gin8pcGd6_aVCUSyHYGZXdJ-k1MLxdHXOsCHBsBlL2CUvGsW3PiCq4P1WTyQz9byB2bfRIlLw5tmxQUBdwq9S6_tMF0lrjoDJ06f2QhPzrFsNpEf1u_5nR9-wHFN9u_RLYWO0bOWoopVByd-dKqbLgWGuL_roPaFTpNASq8f5nOosAHzvnNcH-PIH50uEyZaWpWEYDw" />
      <img alt="Butterfly decoration top right" className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3 -rotate-12" src="https://lh3.googleusercontent.com/aida/AP1WRLtw4xPwNqJEgLqy0F4HzoPCvnFp5FlLLWkFLJIwS4N1pHZ_3E6_Gin8pcGd6_aVCUSyHYGZXdJ-k1MLxdHXOsCHBsBlL2CUvGsW3PiCq4P1WTyQz9byB2bfRIlLw5tmxQUBdwq9S6_tMF0lrjoDJ06f2QhPzrFsNpEf1u_5nR9-wHFN9u_RLYWO0bOWoopVByd-dKqbLgWGuL_roPaFTpNASq8f5nOosAHzvnNcH-PIH50uEyZaWpWEYDw" />
      
      {/* Logo & Header */}
      <div className="flex flex-col items-center justify-center mb-[32px] relative z-10 text-center">
        <h2 className="font-display-lg text-[48px] font-bold text-secondary-fixed mb-[8px] drop-shadow-md mt-4">Selecciona un Mes</h2>
        <p className="font-body-lg text-[16px] text-on-surface-variant dark:text-inverse-primary max-w-md mx-auto">Explora las festividades y fechas importantes de Colombia a lo largo del año.</p>
      </div>

      {/* Month Grid (Bento Style) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[12px] relative z-10">
        {months.map((month) => (
          <Link to={`/calendar?month=${month.id}`} key={month.id} className="group bg-surface-container-lowest dark:bg-primary-container hover:bg-surface-container-high dark:hover:bg-primary-container/80 transition-colors rounded-xl border-2 border-border-muted hover:border-primary-fixed dark:hover:border-primary-fixed hover:shadow-sm p-[12px] flex flex-col items-center justify-center aspect-square relative overflow-hidden">
            <span className="font-display-lg text-[48px] font-bold text-primary dark:text-secondary-fixed mb-1">{month.id}</span>
            <span className="font-headline-md text-[24px] font-semibold text-on-surface dark:text-inverse-on-surface">{month.name}</span>
            <div className={`w-8 h-1 ${month.color} mt-2 rounded-full opacity-50 group-hover:opacity-100 transition-opacity`}></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
