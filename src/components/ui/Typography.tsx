import type { ComponentPropsWithoutRef, ElementType } from "react";

type TypographyProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Typography<T extends ElementType = "p">({
  as,
  className = "",
  ...rest
}: TypographyProps<T>) {
  const Component = as ?? "p";
  return <Component className={className} {...rest} />;
}
