import { addDays, format, isSameDay, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { MyDatePicker } from "@/src/components/MyDatePicker";
import React from "react";
import { Flex } from "@radix-ui/themes";
import { cn } from "@/lib/utils";

interface ICalendarDays {
  setSelectedDate: (selectedDate: Date) => void;
  selectedDate: Date;
}

export const CalendarDays = ({
  selectedDate,
  setSelectedDate,
}: ICalendarDays) => {
  const today = new Date();

  const dayName = format(selectedDate, "EEEE", { locale: ru });
  const dayNumber = format(selectedDate, "d", { locale: ru });
  const monthName = format(selectedDate, "LLLL", { locale: ru });

  const calendarDays = [
    subDays(today, 2),
    subDays(today, 1),
    today,
    addDays(today, 1),
    addDays(today, 2),
  ];
  return (
    <>
      <Flex gapX="8px" align="center" className="px-2">
        <h1 className="text-lg">Список дел на:</h1>
        <p className="text-lg font-bold">
          {dayName}{" "}
          <span className="text-lg font-bold">
            {dayNumber} {monthName}
          </span>
        </p>
      </Flex>
      <div className="grid grid-cols-6 justify-between mt-2 gap-x-2 shadow-md p-2 rounded-xl border border-gray-200">
        {calendarDays.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date)}
            className={cn(
              "flex flex-col items-center text-sm px-3 py-2 rounded-xl transition cursor-pointer relative",
              isSameDay(date, selectedDate)
                ? "bg-red-100 text-black border border-red-300"
                : "bg-gray-100 text-gray-600 border border-gray-300",
              date === today && "bg-blue-100 border border-blue-300"
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
