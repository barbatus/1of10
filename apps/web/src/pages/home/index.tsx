import { Button, cn, DataTable, H4, H6, P } from "@app/ui";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { getThumbnailDownloadUrl, useThumbnailScores } from "@/api";
import { ThumbnailScore } from "@/api/thumbnail.contract";

import { ThumbnailModal } from "./thumbnail-modal";

const MobileList = ({
  data,
  loading,
  className,
}: {
  data: ThumbnailScore[];
  loading?: boolean;
  className?: string;
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (loading) {
    return (
      <div className={className}>
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="flex flex-col items-center w-full py-2 gap-3"
          >
            <div className="animate-pulse rounded-md bg-muted h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {data.length === 0 && (
        <P className="text-center text-xl">
          Here you will see your uploaded thumbnails
        </P>
      )}
      {data.map(({ id, thumbnailId, score, resultHint }) => (
        <div
          key={id}
          className={cn(
            "flex flex-col items-center w-full py-6 border-b gap-3",
            {
              "max-h-96": !expanded[id],
            },
          )}
        >
          <img
            src={getThumbnailDownloadUrl(thumbnailId)}
            alt={`Thumbnail ${thumbnailId}`}
            className="rounded h-32 max-w-full m-auto"
          />
          {score != null && (
            <H6 className="font-normal text-2xl m-0">Score: {score}</H6>
          )}
          {resultHint && (
            <p
              className={cn("line-clamp-4 w-full cursor-pointer", {
                "line-clamp-none": expanded[id],
              })}
              onClick={() => setExpanded({ ...expanded, [id]: true })}
            >
              {resultHint}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const columns = [
  {
    id: "id",
    accessorKey: "id",
  },
  {
    id: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <div className="flex items-center justify-center w-full h-24 w-36">
        <img
          src={getThumbnailDownloadUrl(row.original.thumbnailId)}
          alt={`Thumbnail ${row.original.thumbnailId}`}
          className="rounded max-h-full max-w-full"
        />
      </div>
    ),
  },
  {
    id: "score",
    header: "Score",
    accessorKey: "score",
    cell: ({ getValue }) => <div className="">{getValue<number>()}</div>,
  },
  {
    id: "prompt",
    header: "Video prompt",
    accessorKey: "userPrompt",
    cell: ({ getValue }) => <div className="w-52">{getValue<string>()}</div>,
  },
  {
    id: "hint",
    header: "Suggested Improvement",
    accessorKey: "resultHint",
    cell: ({ getValue }) => (
      <div className="max-h-56 line-clamp-4 w-60">{getValue<string>()}</div>
    ),
  },
] as ColumnDef<ThumbnailScore>[];

export const Home = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useThumbnailScores();

  return (
    <div className="h-full md:max-w-4xl flex flex-col justify-center mx-auto py-8 px-4">
      <div className="flex max-md:flex-col gap-2 mb-4">
        <H4 className="text-center text-2xl">
          Upload Thumbnail and Get a Score
        </H4>
        <Button
          className="w-fit ml-auto max-md:w-full"
          onClick={() => setOpen(true)}
        >
          Upload thumbnail
        </Button>
      </div>
      <div className="h-0 flex-grow overflow-auto">
        <MobileList
          loading={isLoading}
          data={data ?? []}
          className="md:hidden"
        />
        <DataTable
          data={data ?? []}
          columns={columns}
          loading={isLoading}
          defaultSorting={[{ id: "id", desc: true }]}
          className="mb-4 max-md:hidden"
          emptyText="Here you will see your uploaded thumbnails"
        />
      </div>
      {open && <ThumbnailModal onClose={() => setOpen(false)} />}
    </div>
  );
};
