import { Task } from "@prisma/client";
import { apiKy } from "@/src/service/instance";
import { UpdateTodo } from "@/src/types/types";

export const getAllTasks = async (): Promise<Task[]> => {
  return await apiKy("tasks").json();
};
export const getOneTasks = async (id: string): Promise<Task[]> => {
  return await apiKy(`tasks/${id}`).json();
};

export const postTask = async (task: {
  taskDate: Date;
  alarmTime: Date;
  description: string;
  title: string;
}): Promise<Task> => {
  return await apiKy
    .post("tasks", {
      json: task,
    })
    .json();
};
export const patchTask = async (task: UpdateTodo): Promise<Task> => {
  return await apiKy
    .patch("tasks", {
      json: task,
    })
    .json();
};
export const deleteTask = async (id: string): Promise<Task> => {
  return await apiKy
    .delete("tasks", {
      json: id,
    })
    .json();
};
