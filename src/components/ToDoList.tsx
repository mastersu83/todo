"use client";
import React, { useState } from "react";
import { isSameDay } from "date-fns";
import { Task } from "@prisma/client";
import { deleteTask, getAllTasks, patchTask } from "@/src/service/taskApi";
import useSWR from "swr";
import { TodoItem } from "@/src/components/TodoItem";
import { Header } from "@/src/components/Header";
import { CalendarDays } from "./CalendarDays";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UpdateTodo } from "@/src/types/types";

const ToDoList: React.FC<{
  tasks: Task[];
  setAddTaskAction: (addTask: boolean) => void;
  setEditTaskAction: (task: Task) => void;
}> = ({ setAddTaskAction, setEditTaskAction }) => {
  const { data: tasks, mutate } = useSWR("toDoListTasks", getAllTasks);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Фильтрация задач по выбранной дате
  const filteredTasks = tasks
    ? tasks.filter((task) => isSameDay(new Date(task.taskDate), selectedDate))
    : [];

  const handleChangeStatus = async (task: UpdateTodo) => {
    await patchTask(task);
    await mutate();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const randomId = Math.floor(Math.random() * 20) + 1;

  return (
    <div className="overflow-hidden p-2 w-full h-full rounded-3xl relative">
      {/* Заголовок */}
      <Header setAddTaskAction={setAddTaskAction} />

      {/* Календарь */}
      <CalendarDays
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      {/* Фильтры */}
      <Tabs defaultValue="all" className="mt-4 w-full h-full">
        <TabsList className="p-2 h-max w-full">
          {[
            { id: 1, value: "all", title: "Все" },
            { id: 2, value: "active", title: "Активные" },
            { id: 3, value: "completed", title: "Выполненные" },
          ].map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.value}
              className={`bg-random-2 p-2`}
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="h-full overflow-auto p-2">
          <div className="flex flex-col gap-4 border-t border-gray-200">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, idx) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  setAddTaskAction={setAddTaskAction}
                  setEditTaskAction={setEditTaskAction}
                  handleChangeStatus={handleChangeStatus}
                  handleDeleteTask={handleDeleteTask}
                  mutate={mutate}
                />
              ))
            ) : (
              <p className="text-center text-gray-400 text-sm">
                На этот день задач нет
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="active" className="h-full overflow-auto p-2">
          <div className="flex flex-col gap-4 border-t border-gray-200">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(
                (task, idx) =>
                  task.status === "active" && (
                    <TodoItem
                      key={task.id}
                      task={task}
                      setAddTaskAction={setAddTaskAction}
                      setEditTaskAction={setEditTaskAction}
                      handleChangeStatus={handleChangeStatus}
                      handleDeleteTask={handleDeleteTask}
                      mutate={mutate}
                    />
                  )
              )
            ) : (
              <p className="text-center text-gray-400 text-sm">
                На этот день задач нет
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="h-full overflow-auto p-2">
          <div className="flex flex-col gap-4 border-t border-gray-200 ">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(
                (task, idx) =>
                  task.status === "completed" && (
                    <TodoItem
                      key={task.id}
                      task={task}
                      setAddTaskAction={setAddTaskAction}
                      setEditTaskAction={setEditTaskAction}
                      handleChangeStatus={handleChangeStatus}
                      handleDeleteTask={handleDeleteTask}
                      mutate={mutate}
                    />
                  )
              )
            ) : (
              <p className="text-center text-gray-400 text-sm">
                На этот день задач нет
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToDoList;
