"use client";
import React, { useState } from "react";
import { Task } from "@prisma/client";
import { AddTask } from "@/src/components/AddTask";
import ToDoList from "@/src/components/ToDoList";
import { Flex } from "@radix-ui/themes";

interface IHome {
  tasks: Task[];
}

export const HomePage = ({ tasks }: IHome) => {
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState<Task>({} as Task);

  return (
    <Flex
      align="center"
      justify="center"
      className="w-[430px] h-[90vh] bg-white shadow-lg rounded-3xl text-black pb-4"
    >
      {addTask ? (
        <AddTask
          setAddTaskAction={setAddTask}
          editTask={editTask}
          editTaskId={editTask.id}
        />
      ) : (
        <ToDoList
          tasks={tasks}
          setAddTaskAction={setAddTask}
          setEditTaskAction={setEditTask}
        />
      )}
    </Flex>
  );
};
