interface StatusBadgeProps {
  text?: string;
  status?: "primary" | "warning" | "error" | "success";
  className?: string;
}
const badgeStyles = {
  primary: "badge-primary text-primary/80 ",
  warning: "badge-warning text-warning/80 ",
  error: "badge-error text-error/80 ",
  success: "badge-success text-success/80 ",
};

const statusStyles = {
  primary: "status-primary",
  warning: "status-warning",
  error: "status-error",
  success: "status-success",
};


const StatusBadge: React.FC<StatusBadgeProps> = ({
  text,
  status = "primary",
  className = "",
}) => {
  const defaultTexts = {
    primary: text || "Info",
    warning: "Warning: Please check your input",
    error: "An error occurred",
    success: "Operation successful",
  };
  const displayText = text || defaultTexts[status];
  return (
    <div
      className={`badge badge-soft badge-sm border-neutral/50 gradient-primary/20 ${badgeStyles[status]} ${className}`.trim()}
    >
      <span
        aria-label="status"
        className={`status opacity-80 ${
          statusStyles[status] || "status-primary"
        }`}
      />
      {displayText}
    </div>
  );
};

export default StatusBadge;
