import { useState } from 'react';

export default function NoteModal({ isOpen, onClose, onSave, selectedDates, isSaving }) {
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (content.trim() === '') return;
    onSave(content);
    setContent('');
  };

  const dateLabels = selectedDates.map(d => `${d.day}/${d.month + 1}/${d.year}`).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest dark:bg-primary-container w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border-muted dark:border-outline">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-headline-md font-bold text-on-surface dark:text-inverse-on-surface">Nueva Nota</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-bright dark:hover:bg-inverse-surface text-on-surface-variant transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </button>
          </div>
          <p className="text-[14px] text-on-surface-variant mt-1">
            {selectedDates.length === 1 
              ? `Guardando nota para el día: ${dateLabels}` 
              : `Guardando nota para ${selectedDates.length} días: ${dateLabels}`}
          </p>
        </div>
        
        <div className="p-6">
          <textarea
            className="w-full h-40 p-4 bg-surface-bright dark:bg-inverse-surface border-2 border-border-muted dark:border-outline rounded-xl text-on-surface dark:text-inverse-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary resize-none transition-colors"
            placeholder="Escribe tu nota aquí..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="p-6 pt-0 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-on-surface-variant hover:bg-surface-bright dark:hover:bg-inverse-surface transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || content.trim() === ''}
            className="px-5 py-2.5 bg-secondary dark:bg-secondary-fixed text-on-secondary dark:text-primary font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? 'Guardando...' : 'Guardar Nota'}
            {!isSaving && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>}
          </button>
        </div>
      </div>
    </div>
  );
}
