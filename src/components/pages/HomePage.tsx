"use client";
import React, { useState } from "react";
import { Task } from "@prisma/client";
import { AddTask } from "@/src/components/AddTask";
import ToDoList from "@/src/components/ToDoList";
import { Card, Flex } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import { ThemeSwitcher } from "@/src/components/ThemeSwitcher";

export const HomePage = () => {
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState<Task>({} as Task);

  return (
    <Card className="shadow-lg w-[430px] h-[90vh] pb-4 relative overflow-hidden overflow-y-auto">
      <Flex justify="center">
        {addTask ? (
          <AddTask setAddTaskAction={setAddTask} editTaskId={editTask.id} />
        ) : (
          <ToDoList
            setAddTaskAction={setAddTask}
            setEditTaskAction={setEditTask}
          />
        )}
      </Flex>
      <ThemeSwitcher />
      {!addTask && (
        <button
          onClick={() => setAddTask(true)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full w-14 h-14 flex justify-center items-center text-3xl text-black shadow-xl border border-blue-200 bg-blue-100 cursor-pointer"
        >
          <PlusIcon />
        </button>
      )}
    </Card>
  );
};
