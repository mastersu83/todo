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

enum Status {
  active,
  completed,
}

export type ThemeMode = "dark" | "light" | "system";
export type Radius = "large" | "small" | "medium" | "full" | "none";
export type AccentColor =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

export type FilterType = "Все" | "Активные" | "Выполненные";
