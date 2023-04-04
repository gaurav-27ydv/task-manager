import { useEffect, useRef, useState } from "react";
import { Project } from "../types/types";
import Button from "./Button";
import "./EditorPane.css";
import Header from "./EditableHeader";
import TaskWrapper from "./Task";

type EditorPaneProps = {
  currentProjectId: string;
  currentProject: Project;
  handleChange: (value: { [k: string]: any }) => void;
};

function EditorPane({
  currentProjectId,
  currentProject,
  handleChange,
}: EditorPaneProps): JSX.Element {
  const [activeTask, setActiveTask] = useState("");

  const taskRef = useRef<{ [key: string]: any }>({});
  const lastTaskRef = useRef<string>("");

  useEffect(() => {
    taskRef.current[lastTaskRef.current]?.removeFocus();
    lastTaskRef.current = activeTask;
    taskRef.current[activeTask]?.focusTask();
    taskRef.current[activeTask]?.scrollIntoView();
  }, [activeTask]);

  if (currentProjectId === "") {
    return (
      <div
        style={{
          flex: "75%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgba(var(--secondary))",
          padding: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "3rem",
            color: "rgba(var(--primary))",
          }}
        >
          NO PROJECTS SELECTED!
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: "75%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(var(--secondary))",
        padding: "4rem",
      }}
    >
      <Header
        style={{ borderBottom: "0.1px solid rgba(var(--primary))" }}
        key={currentProjectId}
        size="lg"
        background="secondary"
        editable
        onChange={(e) => {
          handleChange({
            projectTitle: {
              $set: (e.target as HTMLInputElement).value,
            },
          });
        }}
      >
        {currentProject ? currentProject.projectTitle : ""}
      </Header>
      <div
        className="flexbox"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingInlineEnd: "3rem",
          marginBlockStart: "1rem",
        }}
      >
        <Header size="md" background="secondary">
          Tasks
        </Header>

        <Button
          size="md"
          variant="secondary"
          type="circle"
          onClick={() => {
            const newTaskId = Date.now();
            setActiveTask(newTaskId.toString());
            handleChange({
              tasks: {
                [`${newTaskId}`]: {
                  $set: {
                    title: "New Task",
                    description: "",
                    status: "Scheduled",
                  },
                },
              },
            });
          }}
        >
          +
        </Button>
      </div>
      <ul className="overflow-wrapper">
        {Object.keys(currentProject.tasks).map((taskId) => {
          return (
            <TaskWrapper
              key={taskId}
              ref={(el) => (taskRef.current[taskId] = el as HTMLInputElement)}
              task={currentProject.tasks[taskId]}
              taskId={taskId}
              onClick={() => {
                setActiveTask(taskId);
              }}
              handleChange={handleChange}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default EditorPane;
