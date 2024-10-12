import { cn, P } from "@app/ui";
import { AlertTriangleIcon } from "lucide-react";

export const LoadingError = ({
  className,
  error,
}: {
  className?: string;
  error: { status?: number; body?: unknown };
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-grow justify-center items-center p-4",
        "recordable",
        className,
      )}
    >
      <AlertTriangleIcon
        className={cn("h-8 w-8 mb-2 text-destructive-foreground text-yellow-9")}
      />
      <P muted centered>
        {error.status ? <div>Error code: {error.status}.</div> : ""}
        {"detail" in error ? (
          <div>We&apos;ve encountered an error: {error.detail as string}</div>
        ) : (
          <div>We&apos;ve encountered an error</div>
        )}
      </P>
    </div>
  );
};
