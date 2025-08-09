import { useEffect, useState } from "react";

export const useOptions = ({
  setSelectedDate,
}: {
  setSelectedDate: (date: Date) => void;
}): {
  selectedDayOption: string;

  calendarDays: Date[];
  handleMonthChange: (direction: "prev" | "next") => void;
  handleDayOptionSelect: (option: string) => void;
  currentMonth: number;
  currentYear: number;
  setSelectedDayOption: (selectedDayOption: string) => void;
  setCurrentMonth: (currentMonth: number) => void;
  setCurrentYear: (currentYear: number) => void;
} => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [selectedDayOption, setSelectedDayOption] = useState<string>("Сегодня");

  const generateCalendar = () => {
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayWeekday = (startOfMonth.getDay() + 6) % 7; // понедельник = 0 ... воскресенье = 6

    const calendar: Date[] = [];

    // Кол-во дней в предыдущем месяце
    const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();

    // 1) Дни предыдущего месяца (заполняем пустые ячейки в начале)
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      calendar.push(
        new Date(currentYear, currentMonth - 1, prevMonthLastDate - i)
      );
    }

    // 2) Дни текущего месяца
    for (let d = 1; d <= daysInMonth; d++) {
      calendar.push(new Date(currentYear, currentMonth, d));
    }

    // 3) Дни следующего месяца (дозаполняем до 42 ячеек)
    let nextMonthDay = 1;
    while (calendar.length < 42) {
      calendar.push(new Date(currentYear, currentMonth + 1, nextMonthDay));
      nextMonthDay++;
    }

    return calendar;
  };
  const [calendarDays, setCalendarDays] = useState<Date[]>(generateCalendar());

  useEffect(() => {
    setCalendarDays(generateCalendar());
  }, [currentMonth, currentYear]);

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
      } else {
        setCurrentMonth((m) => m - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
      } else {
        setCurrentMonth((m) => m + 1);
      }
    }
  };

  const handleDayOptionSelect = (option: string) => {
    setSelectedDayOption(option);
    if (option === "Сегодня") {
      setSelectedDate(today);
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
    } else if (option === "Завтра") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      setSelectedDate(tomorrow);
      setCurrentMonth(tomorrow.getMonth());
      setCurrentYear(tomorrow.getFullYear());
    }
  };

  return {
    selectedDayOption,
    calendarDays,
    handleMonthChange,
    handleDayOptionSelect,
    currentMonth,
    currentYear,
    setSelectedDayOption,
    setCurrentMonth,
    setCurrentYear,
  };
};
