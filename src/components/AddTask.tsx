"use client";

import React, { useEffect, useState } from "react";
import { MyCalendar } from "@/src/components/Calendar";
import { patchTask, postTask } from "@/src/service/taskApi";
import { Task } from "@prisma/client";
import { cn } from "@/lib/utils";
import { CustomToast } from "@/src/components/ui/custom-toast";

export const AddTask: React.FC<{
  setAddTaskAction: (addTask: boolean) => void;
  editTask?: Task;
}> = ({ setAddTaskAction, editTask }) => {
  const today = new Date();
  const [error, serError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(
    editTask?.taskDate ? new Date(editTask.taskDate) : today
  );

  const [title, setTitle] = useState<string>(
    editTask?.title ? editTask.title : ""
  );
  const [description, setDescription] = useState<string>(
    editTask?.description ? editTask.description : ""
  );
  const [time, setTime] = useState<string>(
    editTask?.taskDate
      ? new Date(editTask.taskDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
  );

  const [alarmTime, setAlarmTime] = useState<string>("");

  const combineDateTime = (date: Date, time: string): Date => {
    const result = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  useEffect(() => {
    const taskDateTime = combineDateTime(selectedDate, time);
    const alarmTime = new Date(taskDateTime.getTime() - 30 * 60 * 1000);
    const hh = String(alarmTime.getHours()).padStart(2, "0");
    const mm = String(alarmTime.getMinutes()).padStart(2, "0");
    setAlarmTime(`${hh}:${mm}`);
  }, [time, selectedDate]);

  const handleAddTask = async () => {
    const taskDateTime = combineDateTime(selectedDate, time);
    const alarmDateTime = combineDateTime(selectedDate, alarmTime);
    // alert(
    //   `Задача "${title}" добавлена!\n\n📅 Дата: ${taskDateTime.toLocaleString()}\n🔔 Напоминание: ${alarmDateTime.toLocaleString()}`
    // );

    if (editTask?.id) {
      if (
        editTask.title === title ||
        editTask.description === description ||
        editTask.taskDate === taskDateTime ||
        editTask.alarmTime === alarmDateTime
      ) {
        serError("Event has been created.");
      } else {
        await patchTask({
          ...editTask,
          title,
          description,
          taskDate: taskDateTime,
          alarmTime: alarmDateTime,
        });
      }
    } else {
      await postTask({
        title,
        description,
        taskDate: taskDateTime,
        alarmTime: alarmDateTime,
      });
    }
  };

  return (
    <div className="w-full h-full p-2">
      {/* Шапка */}
      <div
        onClick={() => setAddTaskAction(false)}
        className="flex justify-between items-center p-4 cursor-pointer"
      >
        <div>
          <span className="text-xl cursor-pointer mr-2">←</span>
          <span className="opacity-50 text-xl font-semibold">Назад</span>
        </div>

        <span className="text-xl cursor-pointer">⋯</span>
      </div>
      <MyCalendar
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      {/* Форма */}
      <div className="border-t border-gray-200 p-4">
        <CustomToast
          errorMessage={error}
          setErrorMessage={serError}
          className="fixed bottom-20 left-10"
        />
        <input
          type="text"
          placeholder="Новая задача"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold border-b border-gray-300 focus:outline-none focus:border-indigo-400 text-center w-full mb-4"
        />
        <label className="block text-sm font-semibold mb-1">Заметки</label>
        <input
          type="text"
          placeholder="Введите заметку"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <div className="flex justify-between gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Время</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Напоминание (−30 мин)
            </label>
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <button
          disabled={!title?.length}
          onClick={handleAddTask}
          className={cn(
            !title
              ? "bg-gray-300"
              : "bg-indigo-900 hover:bg-indigo-600 transition cursor-pointer active:bg-indigo-900",
            "w-full text-white py-3 rounded-b-2xl font-semibold "
          )}
        >
          {editTask?.id ? "Сохранить" : "Добавить задачу"}
        </button>
      </div>
    </div>
  );
};
