import { format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";
import { MyDatePicker } from "@/src/components/MyDatePicker";
import React from "react";
import { cn } from "@/lib/utils";
import { TodayDate } from "@/src/components/TodayDate";
import { formatDays } from "@/src/utils/utils";

interface ICalendarDays {
  setSelectedDate: (selectedDate: Date) => void;
  selectedDate: Date;
}

export const CalendarDays = ({
  selectedDate,
  setSelectedDate,
}: ICalendarDays) => {
  const { dayName, dayNumber, monthName, calendarDays, today } =
    formatDays(selectedDate);
  return (
    <>
      <TodayDate todayTask={{ dayName, dayNumber, monthName }} />
      <div className="grid grid-cols-6 justify-between mt-2 gap-x-2 shadow-md p-2 rounded-xl border border-gray-200">
        {calendarDays.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date)}
            className={cn(
              "flex flex-col items-center text-sm font-bold px-3 py-2 rounded-xl transition cursor-pointer relative shadow-md",
              isSameDay(date, selectedDate)
                ? "bg-red-100 text-black border border-red-300"
                : "border border-gray-300",
              date === today && "bg-blue-100 text-black border border-blue-300"
            )}
          >
            <span className="font-medium">
              {format(date, "d", { locale: ru })}
            </span>
            <span className="text-xs">
              {format(date, "EEE", { locale: ru })}
            </span>
          </button>
        ))}

        {/* Кнопка выбора даты */}
        <MyDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  );
};
