import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Label,
  LoadingButton,
  Textarea,
} from "@app/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  API_HOST,
  useScoreThumbnail,
  useThumbnailScores,
  useUploadThumbnail,
} from "@/api";
import {
  ThumbnailScoreInput,
  ThumbnailScoreInputSchema,
} from "@/api/thumbnail.contract";

export const ThumbnailModal = ({ onClose }: { onClose: () => void }) => {
  const { upload, isLoading: isUploading } = useUploadThumbnail(true);
  const { getScore, isLoading: isSaving } = useScoreThumbnail();
  const { addScore } = useThumbnailScores();

  const [thumbnail, setThumbnail] = useState<{
    id: number;
    downloadUrl: string;
  }>();
  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      return upload({
        file,
        name: e.target.value,
      });
    },
    [upload],
  );

  const onSubmit = useCallback(
    (values: ThumbnailScoreInput) => {
      void getScore(values).then((res) => {
        addScore(res);
        onClose();
      });
    },
    [getScore, addScore, onClose],
  );

  const form = useForm<ThumbnailScoreInput>({
    resolver: zodResolver(ThumbnailScoreInputSchema),
    defaultValues: {
      thumbnailId: undefined,
      userPrompt: "",
    },
  });

  return (
    <Dialog open={true} onOpenChange={(opened) => !opened && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Get Thumbnail Score</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="thumb" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center space-y-4">
              <FormField
                control={form.control}
                name="thumbnailId"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div
                        className={cn(
                          "flex items-center justify-center w-full h-60 relative rounded-md",
                          error && "border border-red-500",
                        )}
                      >
                        {thumbnail ? (
                          <div className="h-60 relative">
                            <img
                              src={`${API_HOST}/${thumbnail.downloadUrl}`}
                              className="h-full"
                            />
                            <div
                              onClick={() => setThumbnail(undefined)}
                              className="flex justify-center items-center absolute right-2 top-2 cursor-pointer bg-white ghost p-2 rounded-full border"
                            >
                              <Trash2Icon className="w-4 h-4 text-black" />
                            </div>
                          </div>
                        ) : (
                          <LoadingButton
                            loading={isUploading}
                            className="relative p-0"
                          >
                            <Label
                              htmlFor="thumb"
                              className="px-4 py-2 h-full cursor-pointer leading-5"
                            >
                              Upload thumbnail
                            </Label>
                            <Input
                              id="thumb"
                              type="file"
                              className="absolute opacity-0"
                              accept="image/*"
                              onChange={(e) =>
                                onChange(e).then((res) => {
                                  setThumbnail(res);
                                  field.onChange(res?.id);
                                })
                              }
                            />
                          </LoadingButton>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userPrompt"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Enter your prompt"
                        className={cn("w-full h-32", error && "border-red-500")}
                        value={field.value}
                        maxLength={500}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" form="thumb" loading={isSaving}>
            Send
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
