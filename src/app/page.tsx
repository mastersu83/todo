import React from "react";
import { getAllTasks } from "@/src/service/taskApi";
import { HomePage } from "@/src/components/pages/HomePage";
import { Flex } from "@radix-ui/themes";

export default async function Home() {
  const todoList = await getAllTasks();
  return (
    <Flex align="center" justify="center" className="min-h-screen bg-gray-100">
      <HomePage tasks={todoList} />
    </Flex>
  );
}
