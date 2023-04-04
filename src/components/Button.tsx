import "./Button.css";

type ButtonProps = {
  className?: string;
  type?: "" | "circle";
  variant?: "primary" | "secondary" | "accent" | "none";
  size?: "sm" | "md" | "lg";
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

function Button({
  className = "",
  variant = "primary",
  size = "md",
  type = "",
  children,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${type} ` + className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
