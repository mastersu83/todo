"use client";
import React, { useState } from "react";
import { isSameDay } from "date-fns";
import { deleteTask, getAllTasks, patchTask } from "@/src/service/taskApi";
import useSWR from "swr";
import { TodoItem } from "@/src/components/TodoItem";
import { Header } from "@/src/components/Header";
import { CalendarDays } from "./CalendarDays";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UpdateTodo } from "@/src/types/types";
import { Flex } from "@radix-ui/themes";
import { VoiceInput } from "@/src/components/VoiceInput";

const ToDoList = () => {
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
    await mutate();
  };

  return (
    <Flex justify="center">
      {tasks && (
        <div className="flex flex-col pb-4 w-full h-[calc(100vh-180px)] relative">
          {/* Заголовок */}
          <Header />
          {/* Календарь */}
          <CalendarDays
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          {/* Фильтры */}
          <Tabs
            defaultValue="all"
            className="mt-4 flex-1 flex flex-col min-h-0"
          >
            <TabsList className="p-2 mb-2 h-max w-full shadow-md border border-gray-200">
              {[
                { id: 1, value: "all", title: "Все" },
                { id: 4, value: "allToday", title: "Все сегодня" },
                { id: 2, value: "active", title: "Активные" },
                { id: 3, value: "completed", title: "Выполненные" },
              ].map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.value}
                  className={`cursor-pointer p-2`}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="h-full pt-2 border-t border-gray-200">
              <TabsContent value="all" className="h-full overflow-y-auto">
                <div className="flex flex-col gap-4 p-1 overflow-x-hidden">
                  {tasks ? (
                    tasks.map((task) => (
                      <TodoItem
                        key={task.id}
                        task={task}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-400 text-sm">
                      На этот день задач нет
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="allToday" className="h-full overflow-y-auto">
                <div className="flex flex-col gap-4 p-1">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TodoItem
                        key={task.id}
                        task={task}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-400 text-sm">
                      На этот день задач нет
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="active" className="h-full overflow-y-auto">
                <div className="flex flex-col gap-4 p-1">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(
                      (task) =>
                        task.status === "active" && (
                          <TodoItem
                            key={task.id}
                            task={task}
                            handleChangeStatus={handleChangeStatus}
                            handleDeleteTask={handleDeleteTask}
                            activeTab
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
              <TabsContent value="completed" className="h-full overflow-y-auto">
                <div className="flex flex-col gap-4 p-1">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(
                      (task) =>
                        task.status === "completed" && (
                          <TodoItem
                            key={task.id}
                            task={task}
                            handleChangeStatus={handleChangeStatus}
                            handleDeleteTask={handleDeleteTask}
                            activeTab
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
            </div>
          </Tabs>
        </div>
      )}
    </Flex>
  );
};

export default ToDoList;
