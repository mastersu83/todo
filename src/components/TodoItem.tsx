import React from "react";
import { Task } from "@prisma/client";
import { CheckCircleIcon, Circle, EditIcon, Trash } from "lucide-react";
import { Card, Flex } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { UpdateTodo } from "@/src/types/types";

interface ITodoItem {
  task: Task;
  setAddTaskAction: (addTask: boolean) => void;
  setEditTaskAction: (task: Task) => void;
  handleChangeStatus: (task: UpdateTodo) => void;
  handleDeleteTask: (id: string) => void;
  mutate: () => void;
}

export const TodoItem = ({
  task,
  setEditTaskAction,
  setAddTaskAction,
  handleChangeStatus,
  handleDeleteTask,
  mutate,
}: ITodoItem) => {
  return (
    <Card
      className={cn(
        task.status === "completed" ? "bg-green-200" : "bg-white",
        "flex justify-between items-center rounded-2xl shadow-lg p-4 mt-2"
      )}
    >
      <Flex justify="between" align="center">
        <Flex gap="3" justify="center" align="center">
          <span className="text-xs text-gray-400 w-12">
            {new Date(task.taskDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
          <Flex gap="3" justify="center" align="center">
            {task.status === "completed" ? (
              <CheckCircleIcon
                color="green"
                onClick={(e) => {
                  handleChangeStatus({ ...task, status: "active" });
                }}
              />
            ) : (
              <Circle
                onClick={(e) => {
                  handleChangeStatus({ ...task, status: "completed" });
                }}
              />
            )}
            <div>
              <h3
                className={`text-base font-semibold ${
                  task.status === "completed"
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {task.title}
              </h3>
              <p className="text-xs text-gray-500">{task.description}</p>
            </div>
          </Flex>
        </Flex>
        <Flex gap="3" justify="center" align="center">
          <EditIcon
            onClick={() => {
              setEditTaskAction(task);
              setAddTaskAction(true);
            }}
          />
          <Trash
            onClick={() => {
              handleDeleteTask(task.id);
              mutate();
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
};
