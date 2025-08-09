import React from "react";
import useSWR from "swr";
import { getAllTasks } from "@/src/service/taskApi";
import { cn } from "@/lib/utils";
import { useOptions } from "@/src/hooks";

export const MyCalendar: React.FC<{
  setSelectedDate: (date: Date) => void;
  selectedDate: Date;
}> = ({ setSelectedDate, selectedDate }) => {
  const { data: tasks } = useSWR("calendarDate", getAllTasks);

  const {
    handleDayOptionSelect,
    selectedDayOption,
    calendarDays,
    handleMonthChange,
    setCurrentYear,
    setCurrentMonth,
    currentYear,
    currentMonth,
    setSelectedDayOption,
  } = useOptions({ setSelectedDate });

  const options = ["Сегодня", "Завтра", "Другой день"];

  // Генерация календаря с 6 строками (42 ячейки), с датами предыдущего и следующего месяца

  const hasTask = (date: Date) =>
    tasks &&
    tasks.some(
      (task) =>
        new Date(task.taskDate).getFullYear() === date.getFullYear() &&
        new Date(task.taskDate).getMonth() === date.getMonth() &&
        new Date(task.taskDate).getDate() === date.getDate()
    );

  return (
    <>
      <div className="flex justify-evenly font-semibold p-1 mb-3 border border-gray-200 rounded-lg shadow-md">
        <button
          className="cursor-pointer hover:bg-gray-200 hover:text-black px-2 rounded-lg"
          onClick={() => handleMonthChange("prev")}
        >
          ←
        </button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString("ru-RU", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className="cursor-pointer hover:bg-gray-200 hover:text-black px-2 rounded-lg"
          onClick={() => handleMonthChange("next")}
        >
          →
        </button>
      </div>

      {/* Заголовки дней */}
      <div className="grid grid-cols-7 text-center text-xs font-bold mb-1 p-1 border border-gray-200 rounded-md shadow-md">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Сетка календаря (6 строк, 42 ячейки) */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold py-2">
        {calendarDays.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === currentMonth;
          const isSelected =
            selectedDate.toDateString() === date.toDateString();
          const isSunday = date.getDay() === 0;

          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedDate(date);
                setSelectedDayOption("Другой день");
                setCurrentMonth(date.getMonth());
                setCurrentYear(date.getFullYear());
              }}
              className={cn(
                isSelected
                  ? "bg-red-200 font-semibold text-black"
                  : !isCurrentMonth
                  ? "text-gray-700 bg-gray-300 cursor-default hover:bg-gray-400"
                  : isSunday
                  ? "bg-blue-100 text-black hover:bg-gray-200"
                  : "hover:bg-gray-200 hover:text-black",
                "p-2 rounded-lg text-xs transition duration-1000 ease-in-out relative border border-gray-300 shadow-md cursor-pointer"
              )}
            >
              {date.getDate()}
              {hasTask(date) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2 mb-4 font-bold">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleDayOptionSelect(option)}
            className={cn(
              selectedDayOption === option ? "bg-gray-700 text-white" : "",
              "flex-1 py-2 rounded-lg text-sm transition border border-gray-200 shadow-md cursor-pointer hover:bg-gray-200 hover:text-black"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};
