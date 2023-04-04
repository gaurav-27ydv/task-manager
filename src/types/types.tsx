export type Task = {
  title: string;
  description?: string;
  due?: string;
  status: "inProgress" | "overdue" | "completed";
};

export type Tasks = { [k: string]: Task };
export type Project = { projectTitle: string; tasks: Tasks };
export type TodoList = { [k: string]: Project };
export type ACTIONS = "addProject" | "setProject";
