import { useState, useEffect } from 'react';

export default function NoteViewModal({ isOpen, onClose, note, onSave, onDelete }) {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (note) {
      setContent(note.content);
      setIsEditing(false);
      setShowConfirmDelete(false);
    }
  }, [note, isOpen]);

  if (!isOpen || !note) return null;

  const handleSave = () => {
    onSave(note.id, content);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest dark:bg-primary-container w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 md:p-6 border-b border-border-muted dark:border-outline flex justify-between items-center flex-shrink-0">
          <h3 className="text-xl font-headline-md font-bold text-on-surface dark:text-inverse-on-surface">Nota</h3>
          <div className="flex items-center gap-2">
            {!isEditing && !showConfirmDelete && (
              <>
                <button onClick={() => setIsEditing(true)} className="p-2 rounded-full text-secondary hover:bg-surface-bright dark:hover:bg-inverse-surface transition-colors" title="Editar">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </button>
                <button onClick={() => setShowConfirmDelete(true)} className="p-2 rounded-full text-accent-red hover:bg-accent-red/10 transition-colors" title="Eliminar">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </button>
              </>
            )}
            <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-bright dark:hover:bg-inverse-surface text-on-surface-variant transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </button>
          </div>
        </div>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {showConfirmDelete ? (
            <div className="bg-accent-red/5 border-2 border-accent-red rounded-xl p-6 text-center">
              <h4 className="text-accent-red font-bold text-lg mb-2">¿Estás seguro de eliminar esta nota?</h4>
              <p className="text-on-surface dark:text-inverse-on-surface mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowConfirmDelete(false)} className="px-5 py-2.5 rounded-xl font-semibold text-on-surface-variant hover:bg-surface-bright transition-colors border-2 border-transparent">Cancelar</button>
                <button onClick={() => { onDelete(note.id); onClose(); }} className="px-5 py-2.5 rounded-xl font-semibold bg-accent-red text-white hover:bg-accent-red/90 transition-colors shadow-sm">Sí, eliminar</button>
              </div>
            </div>
          ) : isEditing ? (
            <textarea
              className="w-full h-full min-h-[200px] p-4 bg-surface-bright dark:bg-inverse-surface border-2 border-border-muted dark:border-outline rounded-xl text-on-surface dark:text-inverse-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          ) : (
            <p className="text-[16px] text-on-surface dark:text-inverse-on-surface whitespace-pre-wrap leading-relaxed">{note.content}</p>
          )}
        </div>

        {isEditing && !showConfirmDelete && (
          <div className="p-4 md:p-6 border-t border-border-muted dark:border-outline flex justify-end gap-3 flex-shrink-0">
            <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 rounded-xl font-semibold text-on-surface-variant hover:bg-surface-bright transition-colors">Cancelar</button>
            <button onClick={handleSave} className="px-5 py-2.5 bg-secondary text-on-secondary dark:bg-secondary-fixed dark:text-primary rounded-xl font-semibold hover:opacity-90 transition-opacity">Guardar Cambios</button>
          </div>
        )}
      </div>
    </div>
  );
}
