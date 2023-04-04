import { Spec } from "immutability-helper";
import { TodoList } from "./types";

export function newProjectQuery(newProjectId: string) {
  return {
    [`${newProjectId}`]: {
      $set: {
        projectTitle: "New Project",
        tasks: {},
      },
    },
  };
}

export function updateTaskQuery(
  currentProjectId: string,
  updates: any
): Spec<TodoList> {
  return {
    [`${currentProjectId}`]: {
      ...updates,
    },
  };
}
