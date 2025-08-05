import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface IHeader {
  setAddTaskAction: (addTask: boolean) => void;
}

export const Header = ({ setAddTaskAction }: IHeader) => {
  const today = new Date();

  const dayName = format(today, "EEEE", { locale: ru });
  const dayNumber = format(today, "d", { locale: ru });
  const monthName = format(today, "LLLL", { locale: ru });
  return (
    <header className="flex justify-between items-start p-2">
      <div>
        <p className="text-gray-500 text-sm">
          {dayName}{" "}
          <span className="font-semibold text-black">
            {dayNumber} {monthName}
          </span>
        </p>
        <h1 className="text-2xl font-bold">Список дел</h1>
      </div>
      <button
        onClick={() => setAddTaskAction(true)}
        className="bg-white rounded-full w-14 h-14 flex justify-center items-center text-3xl shadow-xl"
      >
        +
      </button>
    </header>
  );
};
