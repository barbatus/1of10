import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "#/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      loading: {
        true: "opacity-50 pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "asChild" | "onClick"> & {
    loading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  }
>(
  (
    {
      className,
      size,
      variant,
      loading: loadingExternal,
      type = "button",
      onClick,
      ...props
    },
    ref,
  ) => {
    const [waitingOnClick, setWaiting] = React.useState(false);
    const waitableOnClick = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        setWaiting(true);
        try {
          await onClick?.(e);
        } finally {
          setWaiting(false);
        }
      },
      [onClick],
    );

    const loading = Boolean(waitingOnClick || loadingExternal);

    return (
      <button
        className={cn(
          buttonVariants({ size, variant, loading, className }),
          // Needed for the spinner below
          "relative",
        )}
        ref={ref}
        type={type}
        {...props}
        onClick={waitableOnClick}
      >
        <div
          className={cn("inline-flex items-center", {
            invisible: loading,
          })}
        >
          {props.children}
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </button>
    );
  },
);
LoadingButton.displayName = "LoadingButton";

export { Button, buttonVariants, LoadingButton };
