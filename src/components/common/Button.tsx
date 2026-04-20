import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const BASE_BUTTON_CLASS =
  "min-h-12 flex-1 basis-0 cursor-pointer rounded-2xl border border-white/10 font-bold text-white transition-[transform,box-shadow,filter] duration-150 ease-out hover:-translate-y-px hover:brightness-105 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-slate-700/40";

const VARIANT_CLASS_MAP: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-br from-sky-700 via-blue-800 to-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.38)]",
  danger:
    "bg-linear-to-br from-rose-700 via-red-800 to-amber-700 shadow-[0_10px_22px_rgba(127,29,29,0.36)]",
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE_BUTTON_CLASS} ${VARIANT_CLASS_MAP[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
