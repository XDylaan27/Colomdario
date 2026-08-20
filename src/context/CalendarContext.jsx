import { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export function CalendarProvider({ children }) {
  const currentRealYear = new Date().getFullYear();
  const currentRealMonth = new Date().getMonth();

  const [selectedYear, setSelectedYearState] = useState(() => {
    const saved = localStorage.getItem('colomdario_year');
    const parsed = saved ? parseInt(saved, 10) : NaN;
    return !isNaN(parsed) && parsed >= 1900 && parsed <= 2100 ? parsed : currentRealYear;
  });

  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const [activeMonth, setActiveMonthState] = useState(() => {
    const saved = localStorage.getItem('colomdario_active_month');
    const parsed = saved !== null ? parseInt(saved, 10) : NaN;
    return !isNaN(parsed) && parsed >= 0 && parsed <= 11 ? parsed : currentRealMonth;
  });

  const setSelectedYear = (year) => {
    setSelectedYearState(year);
    localStorage.setItem('colomdario_year', String(year));
  };

  const setActiveMonth = (m) => {
    setActiveMonthState(m);
    localStorage.setItem('colomdario_active_month', String(m));
  };

  return (
    <CalendarContext.Provider value={{
      selectedYear,
      setSelectedYear,
      isYearModalOpen,
      setIsYearModalOpen,
      isMultiSelect,
      setIsMultiSelect,
      isNoteModalOpen,
      setIsNoteModalOpen,
      activeMonth,
      setActiveMonth,
      monthNames
    }}>
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendarContext = () => useContext(CalendarContext);
