import Header from "./EditableHeader";
import Button from "./Button";
import "./Navigation.css";
import { useEffect, useRef } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

type NavigationProps = {
  todoList: { projectId: string; projectTitle: string }[];
  currentProjectId: string;
  handleClick: (
    action: "addProject" | "setProject",
    toSetProjectId?: string
  ) => void;
};

function Navigation({
  todoList,
  currentProjectId,
  handleClick,
}: NavigationProps): JSX.Element {
  const todoListRef = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    todoListRef.current[currentProjectId]?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentProjectId]);

  return (
    <div className="navigation-menu">
      <Header size="lg" background="none">
        Task Manager
      </Header>
      <div className="section-title">
        <Header size="sm" background="none">
          Projects
        </Header>
        <Button
          type="circle"
          onClick={(e: React.MouseEvent) => {
            handleClick("addProject");
          }}
        >
          +
        </Button>
      </div>
      <div className="overflow-wrapper">
        <ul>
          {todoList.map(({ projectId, projectTitle }) => (
            <li
              className={`project-item ${
                currentProjectId === projectId ? "selected" : ""
              }`}
              key={projectId}
              ref={(el) => {
                todoListRef.current[projectId] = el;
              }}
              onClick={() => {
                handleClick("setProject", projectId);
              }}
            >
              <FilterListIcon
                style={{
                  marginInlineEnd: "1rem",
                  position: "relative",
                  bottom: "-0.2rem",
                }}
              />
              {projectTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
