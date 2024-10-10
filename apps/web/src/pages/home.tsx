import React, { useCallback } from "react";

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
} from "@app/ui";

import { thumbnailApi, API_HOST } from "@/api";
import { useIsMutating } from "@tanstack/react-query";

const ThumbnailModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const upload = thumbnailApi.upload.useMutation({
    mutationKey: ["thumbnailUpload"],
  });
  const isUploading = Boolean(useIsMutating({ mutationKey: ["thumbnailUpload"] }));

  const saveScore = thumbnailApi.create.useMutation({
    mutationKey: ["thumbnailScore"],
  });
  const isSaving = Boolean(useIsMutating({ mutationKey: ['thumbnailScore'] }));

  const [thumbnail, setThumbnail] = React.useState<{
    id: number;
    downloadUrl: string;
  }>();
  const [prompt, setPrompt] = React.useState<string>("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    upload.mutateAsync({
      body: {
        file,
        name: e.target.value,
      }
    }).then((res) => {
      setThumbnail(res.body);
    });
  }, []);

  const onSend = useCallback(() => {
    if (!thumbnail) return;

    saveScore.mutateAsync({
      body: {
        thumbnailId: thumbnail.id,
        userPrompt: prompt,
      }
    });
  }, [thumbnail, prompt]);

  return(
    <Dialog open={open} onOpenChange={(opened) => !opened && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Get Thumbnail Score</DialogTitle>
        </DialogHeader>
         <div className="flex flex-col items-center">
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

export const Home = () => {
  const [open, setOpen] = React.useState(false);

  return(
    <div className="max-w-2xl flex justify-center mx-auto mt-8">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <ThumbnailModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
