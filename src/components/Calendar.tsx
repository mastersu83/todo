import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getAllTasks } from "@/src/service/taskApi";

export const MyCalendar: React.FC<{
  setSelectedDate: (date: Date) => void;
  selectedDate: Date;
}> = ({ setSelectedDate, selectedDate }) => {
  const { data: tasks } = useSWR("calendarDate", getAllTasks);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [selectedDayOption, setSelectedDayOption] = useState<string>("Сегодня");

  const dayOptions = ["Сегодня", "Завтра", "Другой день"];

  // Генерация календаря с 6 строками (42 ячейки), с датами предыдущего и следующего месяца
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
      <div className="flex justify-evenly font-semibold mb-3">
        <button onClick={() => handleMonthChange("prev")}>←</button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString("ru-RU", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={() => handleMonthChange("next")}>→</button>
      </div>

      {/* Заголовки дней */}
      <div className="grid grid-cols-7 text-center text-xs mb-1">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Сетка календаря (6 строк, 42 ячейки) */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm py-2">
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
              className={`p-2 rounded-lg text-xs transition relative border border-gray-300 shadow-lg ${
                isSelected
                  ? "bg-red-200 font-semibold text-black"
                  : !isCurrentMonth
                  ? "text-gray-500 bg-gray-50 cursor-default"
                  : isSunday
                  ? "bg-blue-100 text-black"
                  : "hover:bg-gray-200 hover:text-black"
              }`}
            >
              {date.getDate()}
              {hasTask(date) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2 mb-4">
        {dayOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleDayOptionSelect(option)}
            className={`flex-1 py-2 rounded-lg text-sm transition border border-gray-200 shadow-lg cursor-pointer ${
              selectedDayOption === option ? "bg-gray-700 text-white" : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};
