import { addDays, format, subDays } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDays = (
  selectedDate?: Date
): {
  dayName: string;
  monthName: string;
  dayNumber: string;
  calendarDays: Date[];
  today: Date;
} => {
  const today = new Date();

  const dayName = format(selectedDate ? selectedDate : today, "EEEE", {
    locale: ru,
  });
  const dayNumber = format(selectedDate ? selectedDate : today, "d", {
    locale: ru,
  });
  const monthName = format(selectedDate ? selectedDate : today, "LLLL", {
    locale: ru,
  });

  const calendarDays = [
    subDays(today, 2),
    subDays(today, 1),
    today,
    addDays(today, 1),
    addDays(today, 2),
  ];

  return { dayName, monthName, dayNumber, calendarDays, today };
};
