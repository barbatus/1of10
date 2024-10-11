import { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/utils";

type TypographyProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  className?: string;
  muted?: boolean;
  centered?: boolean;
  mbx?: string;
};

export function H1({
  children,
  className,
  mbx = "mb-6",
  ...props
}: TypographyProps) {
  return (
    <h1
      className={cn("text-3xl font-semibold tracking-tight", mbx, className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, mbx = "mb-4" }: TypographyProps) {
  return (
    <h2 className={cn("text-2xl font-semibold tracking-tight", mbx, className)}>
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
  mbx = "mb-3",
  ...props
}: TypographyProps) {
  return (
    <h3 className={cn("text-xl font-semibold", mbx, className)} {...props}>
      {children}
    </h3>
  );
}

export function H4({
  children,
  className,
  mbx = "mb-3",
  ...props
}: TypographyProps) {
  return (
    <h4 className={cn("text-lg font-semibold", mbx, className)} {...props}>
      {children}
    </h4>
  );
}

export function H5({ children, className, mbx = "mb-3" }: TypographyProps) {
  return (
    <h5 className={cn("text-md font-semibold", mbx, className)}>{children}</h5>
  );
}

export function H6({ children, className, mbx = "mb-3" }: TypographyProps) {
  return (
    <h6 className={cn("text-sm font-semibold", mbx, className)}>{children}</h6>
  );
}

export function P({
  children,
  className,
  muted,
  centered,
  mbx = "mb-3",
}: TypographyProps) {
  return (
    <p
      className={cn(mbx, className, {
        "text-muted-foreground": muted,
        "text-center": centered,
      })}
    >
      {children}
    </p>
  );
}

export function Subtitle1({
  children,
  className,
  mbx = "mb-2",
}: TypographyProps) {
  return (
    <h6 className={cn(mbx, "text-sm font-medium", className)}>{children}</h6>
  );
}

export function Subtitle2({
  children,
  className,
  mbx = "mb-2",
}: TypographyProps) {
  return (
    <h6 className={cn(mbx, "text-sm font-medium", className)}>{children}</h6>
  );
}

export function Overline({
  children,
  className,
  mbx = "mb-2",
}: TypographyProps) {
  return (
    <div
      className={cn(
        mbx,
        "text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-600",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Caption({
  children,
  className,
  mbx = "mb-2",
}: TypographyProps) {
  return (
    <h6
      className={cn(
        mbx,
        "text-sm font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </h6>
  );
}
