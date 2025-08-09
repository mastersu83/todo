"use client";

import React, { useEffect, useState } from "react";
import { MyCalendar } from "@/src/components/Calendar";
import { getOneTasks, patchTask, postTask } from "@/src/service/taskApi";
import { cn } from "@/lib/utils";
import { CustomToast } from "@/src/components/ui/custom-toast";
import useSWR, { useSWRConfig } from "swr";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AddTask: React.FC<{
  editTaskId?: string;
}> = ({ editTaskId }) => {
  const { back } = useRouter();
  const { data: task, mutate } = useSWR("getOneTask", () =>
    getOneTasks(editTaskId ? editTaskId : null)
  );

  const { mutate: mutateCalendar } = useSWRConfig();

  const today = new Date();
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | null>("");
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], {
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
    setTitle(task ? task.title : "");
    setDescription(task ? task.description : "");
    setTime(
      task
        ? new Date(task.taskDate).toLocaleTimeString([], {
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
    setSelectedDate(new Date(task ? task.taskDate : today));
  }, [task]);

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

    if (task?.id) {
      // Проверяем, есть ли изменения
      const isChanged =
        task.title === title &&
        task.description === description &&
        new Date(task.taskDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) === time &&
        new Date(task.taskDate).toDateString() === selectedDate.toDateString();

      if (isChanged) {
        setError("Ничего не изменено!");
        return; // Ранний выход
      }

      try {
        await patchTask({
          ...task,
          title,
          description,
          taskDate: taskDateTime,
          alarmTime: alarmDateTime,
        });
        setError("Изменения сохранены");
        await mutate();
        await mutateCalendar("calendarDate");
      } catch (error) {
        setError("Ошибка при сохранении изменений");
        console.error(error);
      }
    } else {
      try {
        await postTask({
          title,
          description: description ? description : "",
          taskDate: taskDateTime,
          alarmTime: alarmDateTime,
        });
        setError("Задача добавлена");
        await mutate();
        await mutateCalendar("calendarDate");
        setTime(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
        setTitle("");
        setDescription("");
        setSelectedDate(today);
      } catch (error) {
        setError("Ошибка при добавлении задачи");
        console.error(error);
      }
    }
  };

  return (
    <div className="pb-4 w-full h-[calc(100vh-80px)] overflow-y-auto relative">
      <CustomToast
        errorMessage={error}
        setErrorMessage={setError}
        className="absolute top-0 left-0"
      />
      {/* Шапка */}
      <Flex justify="between" align="center" className="">
        <div
          onClick={back}
          className="cursor-pointer p-1 pr-2 mb-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 hover:text-black"
        >
          <span className="text-xl cursor-pointer mr-2">←</span>
          <span className="opacity-50 text-xl font-semibold">Назад</span>
        </div>
      </Flex>
      <MyCalendar
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      {/* Форма */}
      <div className="p-1">
        <input
          type="text"
          placeholder="Новая задача"
          autoFocus
          value={title ? title : ""}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold border-b border-gray-300 focus:outline-none focus:border-indigo-400 text-center w-full mb-4 p-2 pb-0"
        />
        <label className="block text-sm font-semibold mb-1">Заметки</label>
        <input
          type="text"
          placeholder="Введите заметку"
          value={description ? description : ""}
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
              : "bg-indigo-900 hover:bg-indigo-600 transition cursor-pointer active:bg-indigo-900 shadow-md",
            "w-full text-white py-3 rounded-b-2xl font-semibold "
          )}
        >
          {task ? "Сохранить" : "Добавить задачу"}
        </button>
      </div>
    </div>
  );
};
