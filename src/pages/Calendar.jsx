import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getColombianHolidays } from '../utils/holidays';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useCalendarContext } from '../context/CalendarContext';
import NoteModal from '../components/NoteModal';
import NoteViewModal from '../components/NoteViewModal';
import HolidayModal from '../components/HolidayModal';

const formatLocal = (d) => {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
};

export default function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const {
    selectedYear,
    setSelectedYear,
    isMultiSelect,
    setIsMultiSelect,
    isNoteModalOpen,
    setIsNoteModalOpen,
    setActiveMonth,
    monthNames
  } = useCalendarContext();
  
  const todayReal = new Date();
  const monthParam = searchParams.get('month');
  const yearParam = searchParams.get('year');
  const dayParam = searchParams.get('day');
  
  // Default to CURRENT REAL MONTH when entering calendar
  const initialMonth = monthParam ? parseInt(monthParam, 10) - 1 : todayReal.getMonth();
  const month = (initialMonth >= 0 && initialMonth <= 11) ? initialMonth : todayReal.getMonth();

  // Sync year if specified in URL
  useEffect(() => {
    if (yearParam) {
      const yr = parseInt(yearParam, 10);
      if (!isNaN(yr) && yr >= 1900 && yr <= 2100 && yr !== selectedYear) {
        setSelectedYear(yr);
      }
    }
  }, [yearParam, selectedYear, setSelectedYear]);

  // Sync active month with context for header
  useEffect(() => {
    setActiveMonth(month);
  }, [month, setActiveMonth]);

  const weekStart = localStorage.getItem('weekStart') || 'Monday';
  const isMondayStart = weekStart === 'Monday';

  const [selectedDates, setSelectedDates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState([]);
  const [viewingNote, setViewingNote] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [sidebarPanel, setSidebarPanel] = useState('holidays');

  // Fetch notes for the selected month and year
  useEffect(() => {
    if (!user) return;
    const fetchNotes = async () => {
      const firstDay = formatLocal(new Date(selectedYear, month, 1));
      const lastDay = formatLocal(new Date(selectedYear, month + 1, 0));
      
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', firstDay)
        .lte('date', lastDay);
        
      if (!error && data) {
        setNotes(data);
      }
    };
    fetchNotes();
  }, [month, selectedYear, user]);

  const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();
  const firstDay = new Date(selectedYear, month, 1).getDay(); // 0 = Sun, 1 = Mon
  const startingDay = isMondayStart 
    ? (firstDay === 0 ? 6 : firstDay - 1)
    : firstDay;
  const emptyCells = Array.from({ length: startingDay }, (_, i) => i);
  
  // Calculate exact Colombian holidays for the selected year
  const allHolidays = getColombianHolidays(selectedYear);
  const monthHolidays = allHolidays.filter(h => h.date.getMonth() === month);
  
  const isCurrentMonthAndYear = todayReal.getMonth() === month && todayReal.getFullYear() === selectedYear;
  const currentDayNumber = todayReal.getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(selectedYear, month, day);
    const holiday = monthHolidays.find(h => h.date.getDate() === day);
    
    const dateStr = formatLocal(date);
    const dayNotes = notes.filter(n => n.date === dateStr);

    return {
      day,
      month,
      year: selectedYear,
      dateStr,
      isHoliday: !!holiday,
      holidayName: holiday ? holiday.name : null,
      desc: holiday ? 'Festivo Nacional' : null,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isSaturday: date.getDay() === 6,
      isSunday: date.getDay() === 0,
      isToday: isCurrentMonthAndYear && day === currentDayNumber,
      notes: dayNotes
    };
  });

  // Notes for the currently selected day (single selection only)
  const selectedDayNotes = (!isMultiSelect && selectedDates.length === 1) 
    ? notes.filter(n => n.date === selectedDates[0].dateStr) 
    : [];

  // Auto-select day if provided in URL (e.g. from SelectMonth view or logo click)
  useEffect(() => {
    if (dayParam) {
      const dNum = parseInt(dayParam, 10);
      const found = days.find(d => d.day === dNum);
      if (found) {
        setSelectedDates([found]);
        setSidebarPanel('notes');
      }
    }
  }, [dayParam, month, selectedYear]);

  const handleNext = () => {
    const next = month === 11 ? 1 : month + 2;
    setSearchParams({ month: next.toString().padStart(2, '0') });
  };

  const handlePrev = () => {
    const prev = month === 0 ? 12 : month;
    setSearchParams({ month: prev.toString().padStart(2, '0') });
  };

  // Click on a day = select it (show its notes in sidebar). NOT create a note.
  const handleDayClick = (d) => {
    if (isMultiSelect) {
      const isSelected = selectedDates.some(sd => sd.day === d.day);
      if (isSelected) {
        setSelectedDates(selectedDates.filter(sd => sd.day !== d.day));
      } else {
        setSelectedDates([...selectedDates, d]);
      }
    } else {
      // Single select — toggle: click same day again to deselect
      if (selectedDates.length === 1 && selectedDates[0].day === d.day) {
        setSelectedDates([]);
        setSidebarPanel('holidays');
      } else {
        setSelectedDates([d]);
        setSidebarPanel('notes');
      }
      setViewingNote(null);
    }
  };

  // "Nueva Nota" button opens the modal
  const handleNuevaNota = () => {
    if (!user) {
      navigate('/register');
      return;
    }
    
    if (selectedDates.length === 0) {
      if (isMultiSelect) {
        alert("Selecciona al menos un día en el calendario.");
        return;
      } else {
        const targetDay = isCurrentMonthAndYear ? currentDayNumber : 1;
        const d = days.find(day => day.day === targetDay);
        if (d) setSelectedDates([d]);
      }
    }
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = async (content) => {
    if (!user) return;
    setIsSaving(true);
    
    const inserts = selectedDates.map(d => ({
      user_id: user.id,
      date: d.dateStr,
      content: content
    }));

    const { data, error } = await supabase
      .from('notes')
      .insert(inserts)
      .select();

    if (!error && data) {
      setNotes([...notes, ...data]);
    } else {
      console.error(error);
      alert("Hubo un error al guardar la nota.");
    }

    setIsSaving(false);
    setIsNoteModalOpen(false);
    if (isMultiSelect) setSelectedDates([]);
  };

  const handleSaveEdit = async (noteId, newContent) => {
    const { data, error } = await supabase
      .from('notes')
      .update({ content: newContent })
      .eq('id', noteId)
      .select();

    if (!error && data) {
      setNotes(notes.map(n => n.id === noteId ? data[0] : n));
      // Update viewing note if it's currently open
      if (viewingNote && viewingNote.id === noteId) {
        setViewingNote(data[0]);
      }
    } else {
      alert("Error al guardar los cambios.");
    }
  };

  const handleDeleteNote = async (noteId) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (!error) {
      setNotes(notes.filter(n => n.id !== noteId));
    } else {
      alert("Error al eliminar la nota.");
    }
  };

  return (
    <div className="flex flex-col relative h-[calc(100vh-76px)] overflow-hidden">
      <NoteModal 
        isOpen={isNoteModalOpen} 
        onClose={() => setIsNoteModalOpen(false)} 
        onSave={handleSaveNote} 
        selectedDates={selectedDates} 
        isSaving={isSaving} 
      />
      
      <NoteViewModal
        isOpen={!!viewingNote}
        note={viewingNote}
        onClose={() => setViewingNote(null)}
        onSave={handleSaveEdit}
        onDelete={handleDeleteNote}
      />

      <HolidayModal
        holiday={selectedHoliday}
        isOpen={!!selectedHoliday}
        onClose={() => setSelectedHoliday(null)}
      />



      {/* Main Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 p-[16px] md:p-[32px] items-stretch relative z-10 overflow-hidden min-h-0">
        <section aria-label="Cuadrícula del calendario" className="flex-1 relative w-full h-full overflow-y-auto pr-2 pb-24 min-h-0">
          
          {/* Month Header Banner */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-muted/60 dark:border-outline/40">
            <div className="flex items-center gap-3">
              <h2 className="font-display-lg text-[26px] md:text-[34px] font-bold text-secondary dark:text-secondary-fixed leading-tight tracking-tight">
                {monthNames[month]}
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-secondary/15 dark:bg-secondary-fixed/20 text-secondary dark:text-secondary-fixed font-bold text-[13px] md:text-[15px] border border-secondary/30">
                {selectedYear}
              </span>
            </div>
            
            {monthHolidays.length > 0 && (
              <span className="text-[12px] md:text-[13px] px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30">
                {monthHolidays.length} {monthHolidays.length === 1 ? 'festivo' : 'festivos'}
              </span>
            )}
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 md:gap-3 mb-2">
            {isMondayStart ? (
              <>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Lun</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Mar</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Mié</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Jue</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Vie</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Sáb</div>
                <div className="text-center text-[12px] md:text-[14px] text-accent-red uppercase tracking-wider py-2 font-semibold">Dom</div>
              </>
            ) : (
              <>
                <div className="text-center text-[12px] md:text-[14px] text-accent-red uppercase tracking-wider py-2 font-semibold">Dom</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Lun</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Mar</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Mié</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Jue</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Vie</div>
                <div className="text-center text-[12px] md:text-[14px] text-secondary dark:text-outline-variant uppercase tracking-wider py-2 font-semibold">Sáb</div>
              </>
            )}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-3 relative z-10">
            {emptyCells.map(c => (
              <article key={`empty-${c}`} className="min-h-[70px] md:min-h-[90px] bg-transparent rounded-xl p-2 flex flex-col opacity-40">
              </article>
            ))}
            {days.map((d) => {
              const isSelected = selectedDates.some(sd => sd.day === d.day);
              const hasNotes = d.notes.length > 0;
              const baseClasses = "min-h-[70px] md:min-h-[90px] transition-all duration-200 hover:shadow-md group relative rounded-xl p-[6px] md:p-[8px] flex flex-col overflow-hidden shadow-sm cursor-pointer ";
              
              let borderClass = d.isHoliday ? "border-4 border-secondary dark:border-secondary-fixed" : "border-2 border-border-muted dark:border-outline";
              
              if (isSelected) {
                borderClass = "border-4 border-primary dark:border-primary-fixed";
              } else if (d.isToday) {
                borderClass = "border-4 border-accent-red dark:border-accent-red";
              }
              
              return (
                <article 
                  key={d.day} 
                  onClick={() => handleDayClick(d)}
                  className={`${baseClasses} ${borderClass} bg-surface-container-lowest dark:bg-primary-container hover:border-primary-fixed dark:hover:border-primary-fixed`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[16px] md:text-[20px] font-semibold ${d.isSunday ? 'text-accent-red' : 'text-black dark:text-white'}`}>{d.day}</span>
                    {hasNotes && (
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary dark:bg-secondary-fixed flex-shrink-0 mt-1" title={`${d.notes.length} nota(s)`}></span>
                    )}
                  </div>

                  <div className="mt-auto hidden md:block">
                    {d.isHoliday && <p className={`text-[11px] md:text-[13px] font-semibold ${d.isSunday ? 'text-accent-red' : 'text-black dark:text-white'} leading-tight line-clamp-2`}>{d.holidayName}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Sidebar Section */}
        <aside aria-label="Barra lateral de utilidades" className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-3 max-h-full min-h-0 overflow-hidden">
          
          {/* Notes Panel (collapsible) */}
          {!isMultiSelect && selectedDates.length === 1 && (
            <section className={`bg-surface-container-lowest dark:bg-primary-container border-2 border-primary dark:border-primary-fixed rounded-xl shadow-sm overflow-hidden flex flex-col ${sidebarPanel === 'notes' ? 'flex-1 min-h-0' : 'flex-shrink-0'}`}>
              <button 
                onClick={() => setSidebarPanel(sidebarPanel === 'notes' ? '' : 'notes')}
                className="w-full flex-shrink-0 flex items-center justify-between p-3.5 hover:bg-surface-bright/50 dark:hover:bg-inverse-surface/10 transition-colors"
              >
                <h3 className="text-[16px] font-semibold text-on-surface dark:text-inverse-on-surface">
                  Notas del {selectedDates[0].day} de {monthNames[month]}
                </h3>
                <svg className={`w-5 h-5 text-on-surface-variant transition-transform duration-200 ${sidebarPanel === 'notes' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </button>

              {sidebarPanel === 'notes' && (
                <div className="px-3.5 pb-3.5 flex-1 min-h-0 flex flex-col overflow-hidden">
                  {selectedDayNotes.length > 0 ? (
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidden space-y-2.5">
                      <ul className="space-y-2 max-h-[170px] md:max-h-[210px] flex-1 min-h-0 overflow-y-auto pr-1">
                        {selectedDayNotes.map(note => (
                          <li key={note.id} 
                              onClick={() => setViewingNote(note)}
                              className="bg-surface-bright dark:bg-inverse-surface rounded-lg border border-border-muted dark:border-outline p-2.5 cursor-pointer hover:border-secondary dark:hover:border-secondary-fixed transition-colors">
                            <p className="text-[13px] text-on-surface dark:text-inverse-on-surface line-clamp-2 leading-snug">{note.content}</p>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={handleNuevaNota}
                        className="w-full py-1.5 px-3 rounded-lg border border-dashed border-secondary dark:border-secondary-fixed text-secondary dark:text-secondary-fixed hover:bg-secondary/10 dark:hover:bg-secondary-fixed/10 font-semibold text-[12px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Agregar otra nota</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4 px-2 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/15 dark:bg-secondary-fixed/20 text-secondary dark:text-secondary-fixed flex items-center justify-center">
                        <span className="material-symbols-outlined text-[22px]">edit_note</span>
                      </div>
                      <p className="text-on-surface-variant dark:text-outline-variant text-[13px]">
                        No hay notas para este día.
                      </p>
                      <button
                        type="button"
                        onClick={handleNuevaNota}
                        className="w-full py-2 px-3 rounded-xl bg-secondary dark:bg-secondary-fixed text-primary font-bold text-[13px] hover:bg-secondary/90 dark:hover:bg-secondary-fixed-dim transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">note_add</span>
                        <span>Agregar nueva nota</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Festivos del Mes (collapsible) */}
          <section className={`bg-surface-container-lowest dark:bg-primary-container border-2 border-border-muted dark:border-outline rounded-xl shadow-sm overflow-hidden flex flex-col ${sidebarPanel === 'holidays' ? 'flex-1 min-h-0' : 'flex-shrink-0'}`}>
            <button 
              onClick={() => setSidebarPanel(sidebarPanel === 'holidays' ? '' : 'holidays')}
              className="w-full flex-shrink-0 flex items-center justify-between p-3.5 hover:bg-surface-bright/50 dark:hover:bg-inverse-surface/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
                <h3 className="text-[16px] md:text-[18px] font-semibold text-on-surface dark:text-inverse-on-surface">Festivos del Mes</h3>
              </div>
              <svg className={`w-5 h-5 text-on-surface-variant transition-transform duration-200 ${sidebarPanel === 'holidays' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </button>
            
            {sidebarPanel === 'holidays' && (
              <div className="px-3.5 pb-3.5 flex-1 min-h-0 flex flex-col overflow-hidden">
                {monthHolidays.length > 0 ? (
                  <ul className="space-y-2 max-h-[220px] md:max-h-[260px] flex-1 min-h-0 overflow-y-auto pr-1">
                    {monthHolidays.map((h, i) => (
                      <li key={i} 
                          onClick={() => setSelectedHoliday(h)}
                          className="flex items-center gap-3 p-2 bg-secondary-container dark:bg-on-secondary-fixed-variant rounded-lg border border-secondary dark:border-secondary-fixed cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all">
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 bg-surface-bright dark:bg-inverse-surface rounded-md shadow-sm border border-secondary dark:border-secondary-fixed">
                          <span className="text-[9px] font-bold text-accent-red uppercase leading-none">{monthNames[month].substring(0, 3)}</span>
                          <span className="text-[16px] font-bold text-on-surface dark:text-inverse-on-surface leading-none mt-0.5">{h.date.getDate()}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[13px] font-semibold text-on-secondary-container dark:text-secondary-fixed leading-tight truncate" title={h.name}>{h.name}</h4>
                          <span className="text-[10px] text-on-secondary-container/75 dark:text-secondary-fixed/75">Clic para ver historia</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-on-surface-variant dark:text-outline-variant text-[13px]">No hay festivos en este mes.</p>
                )}
                <Link to="/holidays" className="flex-shrink-0 block text-center w-full mt-2.5 py-1.5 text-[12px] font-semibold text-accent-red hover:underline transition-colors border-t border-border-muted dark:border-outline pt-2">
                  Ver todos los festivos
                </Link>
              </div>
            )}
          </section>
        </aside>
      </main>
    </div>
  );
}
