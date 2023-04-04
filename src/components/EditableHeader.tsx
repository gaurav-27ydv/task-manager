import React, { useRef } from "react";
import Button from "./Button";
import "./EditableHeader.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type HeaderProps = {
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  background?: "primary" | "secondary" | "accent" | "none";
  children?: string;
  editable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onChange?: (e: React.ChangeEvent) => void;
};

const Header = React.forwardRef(function Header(
  {
    style,
    children,
    size = "md",
    background = "secondary",
    editable = false,
    onClick,
    onChange,
  }: HeaderProps,
  ref: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  const [editStatus, setEditStatus] = React.useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="header-container" style={style}>
      <input
        className={`header header-${background} header-${size}`}
        onClick={onClick}
        value={children}
        disabled={!editStatus}
        size={children?.length ? children.length : 10}
        onChange={onChange}
        ref={inputRef}
      />
      {editable && children && children?.length !== 0 && (
        <Button
          type="circle"
          size={size}
          onClick={() => {
            setEditStatus(!editStatus);
            inputRef.current?.focus();
          }}
          variant={background === "primary" ? "primary" : "secondary"}
        >
          {editStatus ? (
            <CloseRoundedIcon style={{ height: "1.5rem", width: "1.5rem" }} />
          ) : (
            <BorderColorIcon style={{ height: "1.2rem", width: "1.2rem" }} />
          )}
        </Button>
      )}
    </div>
  );
});

export default Header;
