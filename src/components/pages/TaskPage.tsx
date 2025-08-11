"use client";

import { Task } from "@prisma/client";
import { formatDays } from "@/src/utils/utils";
import { Card, Flex, Grid, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Header } from "@/src/components/Header";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { deleteTask, patchTask } from "@/src/service/taskApi";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Close } from "@radix-ui/react-popover";

interface ITaskPage {
  task: Task;
}

export const TaskPage = ({ task }: ITaskPage) => {
  const { push } = useRouter();
  const { dayName, monthName, dayNumber } = formatDays(task.taskDate);

  const options = [
    { id: 1, title: "Выполнено", flag: "active" },
    { id: 4, title: "Активна", flag: "completed" },
    { id: 2, title: "Изменить", flag: "edit" },
    // { id: 3, title: "Удалить", flag: "delete" },
  ];
  const [filterOptions, setFilterOptions] = useState(
    options.filter((op) => op.flag !== task.status)
  );

  const handleOptions = async (flag: string) => {
    if (flag === "edit") {
      push(`/add-task/${task.id}`);
      return;
    }
    if (flag === "delete") {
      await deleteTask(task.id);
      push("/");
      return;
    }
    const editTask = await patchTask({
      ...task,
      status: flag === "active" ? "active" : "completed",
    });
    setFilterOptions(options.filter((op) => op.flag !== editTask.status));
  };

  return (
    <div className="w-full">
      <Flex justify="between" align="center" className="">
        <Link href="/">
          <div className="cursor-pointer p-1 pr-2 mb-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 hover:text-black">
            <span className="text-xl cursor-pointer mr-2">←</span>
            <span className="opacity-50 text-xl font-semibold">Назад</span>
          </div>
        </Link>
      </Flex>
      <Header />
      <Flex
        gapX="8px"
        align="center"
        justify="center"
        className="p-1 px-2 border border-gray-200 rounded-md shadow-md mt-1"
        mb="2"
      >
        <p className="text-lg font-bold">
          {dayName}{" "}
          <span className="text-lg font-bold">
            {dayNumber} {monthName}
          </span>
        </p>
        <Text className="font-bold">
          {new Date(task.taskDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </Flex>
      <Card className="shadow-md mb-2">
        <Flex justify="start" direction="column">
          <div>{task.title}</div>
          <Separator my="3" size="4" orientation="horizontal" />
          <div>
            <span className="font-bold opacity-60">Заметки:</span>{" "}
            {task.description}
          </div>
        </Flex>
      </Card>
      <Grid columns="3" gapX="2" className="mb-4 font-bold">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptions(option.flag)}
            className={cn(
              task.status === "completed" &&
                option.flag === "active" &&
                "bg-green-200 text-black",
              "flex-1 py-2 rounded-lg text-sm transition border border-gray-200 shadow-md cursor-pointer hover:bg-gray-200 hover:text-black"
            )}
          >
            {option.title}
          </button>
        ))}
        <Popover>
          <PopoverTrigger
            asChild
            className="cursor-pointer flex justify-center items-center"
          >
            <button
              className={cn(
                "rounded-lg text-sm transition border border-gray-200 shadow-md cursor-pointer hover:bg-gray-200 hover:text-black"
              )}
            >
              Удалить
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex w-50 gap-x-2 absolute top-0 -right-16">
            <button
              onClick={() => handleOptions("delete")}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm transition border border-gray-200 shadow-md cursor-pointer hover:bg-gray-200 hover:text-black"
              )}
            >
              Удалить
            </button>
            <Close asChild>
              <button
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm transition border border-gray-200 shadow-md cursor-pointer hover:bg-gray-200 hover:text-black"
                )}
              >
                Отмена
              </button>
            </Close>
          </PopoverContent>
        </Popover>
      </Grid>
    </div>
  );
};
