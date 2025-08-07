export interface UpdateTodo {
  id: string;
  title?: string;
  description?: string | null;
  status?: "active" | "completed";
  important?: boolean;
  taskDate?: Date;
  alarmTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  taskType?: { id: string; name: string };
  taskTypeId?: string | null;
}
