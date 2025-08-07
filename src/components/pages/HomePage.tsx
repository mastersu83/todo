"use client";
import React, { useState } from "react";
import { Task } from "@prisma/client";
import { AddTask } from "@/src/components/AddTask";
import ToDoList from "@/src/components/ToDoList";
import { Card, Flex } from "@radix-ui/themes";

export const HomePage = () => {
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState<Task>({} as Task);

  return (
    <Card className="shadow-lg">
      <Flex
        justify="center"
        className="w-[430px] h-[90vh] pb-4 overflow-hidden overflow-y-auto"
      >
        {addTask ? (
          <AddTask setAddTaskAction={setAddTask} editTaskId={editTask.id} />
        ) : (
          <ToDoList
            setAddTaskAction={setAddTask}
            setEditTaskAction={setEditTask}
          />
        )}
      </Flex>
    </Card>
  );
};
