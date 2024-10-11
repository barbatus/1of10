import React, { useCallback } from "react";

import { ColumnDef } from '@tanstack/react-table';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
  DialogFooter,
  LoadingButton,
  DataTable,
  H4,
} from "@app/ui";

import { ThumbnailScore } from "@/api/thumbnail.contract";

import { API_HOST, useUploadThumbnail, useScoreThumbnail, getThumbnailDownloadUrl, useThumbnailScores } from "@/api";

const ThumbnailModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { upload, isLoading: isUploading } = useUploadThumbnail();
  const { getScore, isLoading: isSaving } = useScoreThumbnail();
  const { addScore } = useThumbnailScores();

  const [thumbnail, setThumbnail] = React.useState<{
    id: number;
    downloadUrl: string;
  }>();
  const [prompt, setPrompt] = React.useState<string>("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    upload({
      file,
      name: e.target.value,
    }).then(setThumbnail);
  }, []);

  const onSend = useCallback(() => {
    if (!thumbnail) return;

    getScore({
      thumbnailId: thumbnail.id,
      userPrompt: prompt,
    }).then((res) => {
      addScore(res);
      onClose();
    });
  }, [thumbnail, prompt]);

  return(
    <Dialog open={open} onOpenChange={(opened) => !opened && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Get Thumbnail Score</DialogTitle>
        </DialogHeader>
         <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center w-full h-60">
              {thumbnail ?
                <img src={`${API_HOST}/${thumbnail.downloadUrl}`} className="h-full" /> :
                  <LoadingButton loading={isUploading} className="relative p-0">
                    <Label htmlFor="thumb" className="px-4 py-2 h-full cursor-pointer leading-5">
                      Upload thumbnail
                    </Label>
                    <Input id="thumb" type="file" className="absolute hidden" onChange={onChange} />
                  </LoadingButton>
              }
            </div>
            <Textarea placeholder="Enter your prompt" className="w-full h-32" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <LoadingButton type="submit" loading={isSaving} onClick={onSend}>Send</LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const columns: ColumnDef<ThumbnailScore>[] = [
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
    cell: ({ getValue }) => (
      <div className="">{getValue<number>()}</div>
    ),
  },
  {
    id: "prompt",
    header: "Description",
    accessorKey: "userPrompt",
    cell: ({ getValue }) => (
      <div className="w-52">{getValue<string>()}</div>
    ),
  },
  {
    id: "hint",
    header: "Suggested Improvement",
    accessorKey: "resultHint",
    cell: ({ getValue }) => <div className="max-h-56 line-clamp-4 w-60">{getValue<string>()}</div>,
  },
];

export const Home = () => {
  const [open, setOpen] = React.useState(false);

  const { data, isLoading } = useThumbnailScores();

  return(
    <div className="h-full max-w-4xl flex flex-col justify-center mx-auto py-8">
      <div className="flex gap-2 mb-4">
        <H4>Get a tip how to improve video thumbnail</H4>
        <Button className="w-fit ml-auto" onClick={() => setOpen(true)}>Upload thumbnail</Button>
      </div>
      <div className="h-0 flex-grow overflow-auto">
        <DataTable data={data ?? []} columns={columns} loading={isLoading} defaultSorting={[{ id: "id", desc: true }]} className="mb-4" />
      </div>
      {open && <ThumbnailModal open onClose={() => setOpen(false)} />}
    </div>
  )
}
