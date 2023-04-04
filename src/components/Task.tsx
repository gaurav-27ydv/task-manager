import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Task } from "../types/types";
import Button from "./Button";
import "./Task.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Bars } from "react-loader-spinner";

type TaskProps = {
  task: Task;
  taskId: string;
  handleChange: (value: { [k: string]: any }) => void;
  onClick: () => void;
};

const TaskWrapper = forwardRef(function TaskWrapper(
  { task, taskId, handleChange, onClick }: TaskProps,
  ref
) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const listRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focusTask() {
        setOpen(true);
      },
      removeFocus() {
        setOpen(false);
      },
      scrollIntoView() {
        listRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    };
  });

  const onChangeHandler = () => {
    setLoading(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setLoading(false);
      if (!formRef.current) {
        return;
      }

      let formElements = Array(...formRef.current?.elements);
      let formObject: { [k: string]: string } = {};

      formElements.forEach((el) => {
        let key = (el as HTMLInputElement).name;
        formObject[key] = (el as HTMLInputElement).value;
      });

      handleChange({ tasks: { [`${taskId}`]: { $set: formObject } } });
    }, 1000);
  };

  return (
    <li
      className={`task-container ${open ? "open-content" : ""}`}
      onClick={onClick}
      ref={listRef}
    >
      <Bars
        height="1.5rem"
        width="1.5rem"
        color="rgb(var(--primary))"
        ariaLabel="bars-loading"
        wrapperClass={`loader ${open ? "open-content" : ""}`}
        visible={loading}
      />
      <form
        className={`input-form ${open ? "open-content" : ""}`}
        ref={formRef}
        onChange={onChangeHandler}
      >
        <label
          style={{
            color: "rgb(var(--primary))",
            fontSize: "1.2rem",
            paddingInlineStart: "0.5rem",
          }}
        >
          {open && "Title"}
        </label>
        <input
          ref={inputRef}
          className="task-input title"
          type="text"
          name="title"
          spellCheck={false}
          size={task.title.length + 10}
          defaultValue={task.title}
          disabled={!open}
        />
        {open && (
          <>
            <label
              style={{
                color: "rgb(var(--primary))",
                fontSize: "1.2rem",
                fontFamily: "inherit",
                paddingInlineStart: "0.5rem",
              }}
            >
              {open && "Description"}
            </label>
            <textarea
              name="description"
              spellCheck={false}
              className="task-input title"
              defaultValue={task.description}
              disabled={!open}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBlockStart: "1rem",
                gap: "3rem",
              }}
            >
              <select
                defaultValue={task?.status}
                className="drop-down"
                name="status"
              >
                <option value={"scheduled"}>Scheduled</option>
                <option value={"inProgress"}>In Progress</option>
                <option value={"completed"}>Completed</option>
                <option value={"overdue"}>Overdue</option>
              </select>
              <input
                defaultValue={task?.due}
                className="date-picker"
                name="due"
                type="date"
              />
            </div>
          </>
        )}
      </form>
      <Button
        className={`open-icon ${open ? "open-content" : ""}`}
        size="md"
        variant="none"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? (
          <ExpandLessIcon style={{ height: "2rem", width: "2rem" }} />
        ) : (
          <ExpandMoreIcon style={{ height: "2rem", width: "2rem" }} />
        )}
      </Button>
    </li>
  );
});

export default TaskWrapper;
