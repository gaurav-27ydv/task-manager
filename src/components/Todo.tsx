import "./Todo.css";
import { useState, useEffect } from "react";
import update from "immutability-helper";
import Navigation from "./Navigation";
import EditorPane from "./EditorPane";
import { TodoList } from "../types/types";
import { getProject, setProject } from "../utils/todo-utils";
import { newProjectQuery, updateTaskQuery } from "../types/updateQueries";

function Todo(): JSX.Element {
  const [todoList, setTodoList] = useState<TodoList>(() => getProject());
  const [currentProjectId, setCurrentProjectId] = useState<string>("");

  const projectList = Object.keys(todoList).map((projectId) => {
    return { projectId, projectTitle: todoList[projectId].projectTitle };
  });

  const currentProject = todoList[currentProjectId];

  useEffect(() => {
    setProject(todoList);
  }, [todoList]);

  function handleClick(
    action: "addProject" | "setProject",
    toSetProjectId: string = Date.now().toString()
  ) {
    switch (action) {
      case "addProject":
        setTodoList(
          update<TodoList>(todoList, newProjectQuery(toSetProjectId))
        );
        setCurrentProjectId(toSetProjectId);
        break;
      case "setProject":
        setCurrentProjectId(toSetProjectId);
        break;
      default:
        throw new Error("Invalid Case");
    }
  }

  const handleChange = (updates: Object) => {
    setTodoList(
      update<TodoList>(todoList, updateTaskQuery(currentProjectId, updates))
    );
  };

  return (
    <div className="todo-container">
      <Navigation
        todoList={projectList}
        currentProjectId={currentProjectId}
        handleClick={handleClick}
      />
      <EditorPane
        currentProjectId={currentProjectId}
        currentProject={currentProject}
        handleChange={handleChange}
      />
    </div>
  );
}

export default Todo;
