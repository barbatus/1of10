import { Button, DataTable, H4 } from "@app/ui";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { getThumbnailDownloadUrl, useThumbnailScores } from "@/api";
import { ThumbnailScore } from "@/api/thumbnail.contract";

import { ThumbnailModal } from "./thumbnail-modal";

const columns = [
  {
    id: "id",
    accessorKey: "id",
  },
  {
    id: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <div className="flex items-center justify-center h-24 w-36">
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
    <div className="h-full max-w-4xl flex flex-col justify-center mx-auto py-8">
      <div className="flex gap-2 mb-4">
        <H4>Get a tip how to improve video thumbnail</H4>
        <Button className="w-fit ml-auto" onClick={() => setOpen(true)}>
          Upload thumbnail
        </Button>
      </div>
      <div className="h-0 flex-grow overflow-auto">
        <DataTable
          data={data ?? []}
          columns={columns}
          loading={isLoading}
          defaultSorting={[{ id: "id", desc: true }]}
          className="mb-4"
          emptyText="Here you will see your uploaded thumbnails"
        />
      </div>
      {open && <ThumbnailModal onClose={() => setOpen(false)} />}
    </div>
  );
};
