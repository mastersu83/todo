import { addDays, format, isSameDay, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { MyDatePicker } from "@/src/components/MyDatePicker";
import React from "react";

interface ICalendarDays {
  setSelectedDate: (selectedDate: Date) => void;
  selectedDate: Date;
}

export const CalendarDays = ({
  selectedDate,
  setSelectedDate,
}: ICalendarDays) => {
  const today = new Date();

  const calendarDays = [
    subDays(today, 2),
    subDays(today, 1),
    today,
    addDays(today, 1),
    addDays(today, 2),
  ];
  return (
    <div className="grid grid-cols-6 justify-between mt-5 gap-x-2">
      {calendarDays.map((date, index) => (
        <button
          key={index}
          onClick={() => setSelectedDate(date)}
          className={`flex flex-col items-center text-sm px-3 py-2 rounded-xl transition ${
            isSameDay(date, selectedDate)
              ? "bg-red-100 text-black"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span className="font-medium">
            {format(date, "d", { locale: ru })}
          </span>
          <span className="text-xs">{format(date, "EEE", { locale: ru })}</span>
        </button>
      ))}

      {/* Кнопка выбора даты */}
      <MyDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};
