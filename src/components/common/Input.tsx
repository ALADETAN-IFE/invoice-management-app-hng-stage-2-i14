import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({
  className = "",
  id,
  label,
  hint,
  error,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = [
    hint ? `${inputId}-hint` : "",
    error ? `${inputId}-error` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {label ? (
          <label
            htmlFor={inputId}
            className={`mb-2 block text-xs font-medium ${error ? "text-(--danger)" : "text-(--text-secondary)"}`}
          >
            {label}
          </label>
        ) : null}

        {error ? (
          <p
            id={`${inputId}-error`}
            className="mb-2 text-[11px] font-semibold text-(--danger)"
          >
            {error}
          </p>
        ) : null}
      </div>

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={`h-12 w-full rounded-md border bg-(--bg-surface) px-4 text-xs font-bold text-(--text-primary) outline-none transition-colors placeholder:font-medium placeholder:text-(--text-muted) ${
          error
            ? "border-(--danger) focus:border-(--danger)"
            : "border-(--border-default) focus:border-(--accent-primary)"
        } disabled:bg-(--bg-elevated) disabled:text-(--text-muted) ${className}`.trim()}
        {...props}
      />

      {hint ? (
        <p
          id={`${inputId}-hint`}
          className="mt-2 text-[11px] text-(--text-muted)"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
