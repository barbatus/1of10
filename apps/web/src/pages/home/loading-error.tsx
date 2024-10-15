import { cn, P } from "@app/ui";
import { AlertTriangleIcon } from "lucide-react";

const isApiError = (error: object): error is { status: number; body: { code?: number; detail: string } } => 
  Boolean("body" in error && "status" in error && typeof error.body === "object" && error.body && "detail" in error.body);

export const LoadingError = ({
  className,
  error,
}: {
  className?: string;
  error: Error | { status?: number; body: unknown };
}) => {
  const message =
    error instanceof Error
      ? error.message
      : isApiError(error) ? error.body.detail : undefined;
  const status = isApiError(error) ? error.status : undefined;

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
        {status ? <div>Error code: {status}.</div> : ""}
        {message ? (
          <div>We&apos;ve encountered an error: {message}</div>
        ) : (
          <div>We&apos;ve encountered an error</div>
        )}
      </P>
    </div>
  );
};
