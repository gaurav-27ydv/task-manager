import { TodoList } from "../types/types";

const KEY = "TODO_APP";

function getProject(): TodoList {
  const projectToParse = window.localStorage.getItem(KEY);
  if (projectToParse) {
    return JSON.parse(projectToParse);
  }
  window.localStorage.setItem(KEY, "{}");
  return {};
}

function setProject(project: TodoList) {
  window.localStorage.setItem(KEY, JSON.stringify(project));
}

export { getProject, setProject };
