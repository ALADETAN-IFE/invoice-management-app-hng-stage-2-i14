import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "markPaid"
  | "edit"
  | "draft"
  | "delete"
  | "addItem";

type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: ReactNode;
};

const BASE_BUTTON_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-4 rounded-full border border-transparent pl-2 pr-4.25 text-[15px] font-bold tracking-[-0.25px] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-primary) disabled:cursor-not-allowed disabled:opacity-60";

const VARIANT_CLASS_MAP: Record<ButtonVariant, string> = {
  primary:
    "bg-(--accent-primary) text-white hover:bg-(--accent-primary-hover)",
  markPaid:
    "bg-(--accent-primary) text-white hover:bg-(--accent-primary-hover)",
  edit:
    "bg-(--bg-elevated) text-(--text-secondary) hover:bg-(--border-default)",
  draft:
    "bg-(--bg-elevated) text-(--text-secondary) hover:bg-(--border-default)",
  delete: "bg-(--danger) text-white hover:bg-(--danger-hover)",
  addItem:
    "bg-(--bg-elevated) text-(--text-secondary) hover:bg-(--border-default)",
};

const SIZE_CLASS_MAP: Record<ButtonSize, string> = {
  sm: "h-10",
  md: "h-12",
};

export default function Button({
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  startIcon,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${BASE_BUTTON_CLASS} ${VARIANT_CLASS_MAP[variant]} ${SIZE_CLASS_MAP[size]} ${widthClass} ${className}`.trim()}
      {...props}
    >
      {startIcon ? (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-(--accent-primary) fill-(--accent-primary)">
          {startIcon}
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
