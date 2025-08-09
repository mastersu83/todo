import React, { useState } from "react";
import { Status, Task } from "@prisma/client";
import { CheckCircleIcon, Circle, EditIcon, Trash } from "lucide-react";
import { Card, Flex, Text } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { UpdateTodo } from "@/src/types/types";
import { motion } from "motion/react";
import Link from "next/link";

interface ITodoItem {
  task: Task;
  handleChangeStatus: (task: UpdateTodo) => void;
  handleDeleteTask: (id: string) => void;
  activeTab?: boolean;
}

export const TodoItem = ({
  task,
  handleChangeStatus,
  handleDeleteTask,
  activeTab,
}: ITodoItem) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [isHoveredTrash, setIsHoveredTrash] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Ждем завершения анимации
    handleDeleteTask(task.id);
  };

  const handleStatus = async (status: Status) => {
    setIsChangeStatus(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Ждем завершения анимации
    handleChangeStatus({ ...task, status });
  };

  return (
    <motion.div
      className="shadow-md rounded-2xl"
      layout
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isDeleting || (isChangeStatus && activeTab) ? 0 : 1,
        x: isDeleting || (isChangeStatus && activeTab) ? 100 : 0,
        scale: isDeleting || (isChangeStatus && activeTab) ? 0.8 : 1,
      }}
      exit={{
        opacity: 0,
        x: -100,
        scale: 0.8,
      }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={cn(
          task.status === "completed" ? "bg-green-200 text-black" : "",
          "flex justify-between items-center p-0 border border-gray-200"
        )}
      >
        <Flex justify="between" align="center">
          <Flex gap="3" justify="center" align="center">
            <Text className="text-xs w-12">
              {new Date(task.taskDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </Flex>
          <Flex gap="3" justify="between" align="center" width="100%">
            <Flex gap="3" justify="center" align="center" width="100%">
              {task.status === "completed" ? (
                <CheckCircleIcon
                  className="cursor-pointer"
                  width={24}
                  color="green"
                  onClick={async () => {
                    await handleStatus("active");
                  }}
                />
              ) : (
                <Circle
                  className="cursor-pointer"
                  width={24}
                  onClick={async () => {
                    await handleStatus("completed");
                  }}
                />
              )}
              <Link
                href={`/task/${task.id}`}
                className="w-full p-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black"
              >
                <div className="">
                  <h3
                    className={cn(
                      "text-base font-semibold",
                      task.status === "completed" ? "line-through" : ""
                    )}
                  >
                    {task.title}
                  </h3>

                  <p
                    className={cn(
                      "text-xs",
                      task.status === "completed" ? "line-through" : ""
                    )}
                  >
                    {task.description}
                  </p>
                </div>
              </Link>
            </Flex>
            <Flex gap="3" justify="center" align="center">
              <motion.div
                animate={{
                  rotate: isHoveredEdit ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                onHoverStart={() => setIsHoveredEdit(true)}
                onHoverEnd={() => setIsHoveredEdit(false)}
              >
                <Link href={`/add-task/${task.id}`}>
                  <EditIcon className="cursor-pointer" />
                </Link>
              </motion.div>
              <motion.div
                onClick={handleDelete}
                animate={{
                  rotate: isHoveredTrash ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                onHoverStart={() => setIsHoveredTrash(true)}
                onHoverEnd={() => setIsHoveredTrash(false)}
              >
                <Trash className="cursor-pointer" />
              </motion.div>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
};
