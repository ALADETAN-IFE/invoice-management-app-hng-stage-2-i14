import type { ComponentPropsWithoutRef, ElementType } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodyMuted"
  | "label"
  | "caption";

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const VARIANT_CLASS_MAP: Record<TypographyVariant, string> = {
  h1: "text-[24px] sm:text-[36px] font-bold tracking-[-0.75px] lg:tracking-[-1.13px] text-(--text-primary)",
  h2: "text-2xl leading-[1.15] font-bold tracking-[-0.75px] text-(--text-primary)",
  h3: "text-base leading-6 font-bold tracking-[-0.5px] text-(--text-primary)",
  h4: "text-xs leading-[1.25] font-bold tracking-[-0.25px] text-(--text-secondary)",
  body: "text-[13px] leading-3.75 font-medium tracking-[-0.1px] text-(--text-muted)",
  bodyMuted:
    "text-[13px] leading-[1.4] font-medium tracking-[-0.1px] text-(--text-secondary)",
  label:
    "text-xs leading-[1.25] font-medium tracking-[-0.2px] text-(--text-secondary)",
  caption:
    "text-[11px] leading-[1.35] font-medium tracking-[-0.2px] text-(--text-muted)",
};

export default function Typography<T extends ElementType = "p">({
  as,
  variant = "body",
  className = "",
  ...rest
}: TypographyProps<T>) {
  const Component = as ?? "p";

  return (
    <Component
      className={`${VARIANT_CLASS_MAP[variant]} ${className}`.trim()}
      {...rest}
    />
  );
}
