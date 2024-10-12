import { useToast } from "@app/ui";
import { useIsMutating, useQueryClient } from "@tanstack/react-query";
import { initQueryClient } from "@ts-rest/react-query";

import { thumbnailContract, ThumbnailScore } from "./thumbnail.contract";

export const API_HOST = import.meta.env.VITE_API_HOST + "/api/v1";

export const thumbnailApi = initQueryClient(thumbnailContract, {
  baseUrl: `${import.meta.env.VITE_API_HOST}`,
});

export const useThumbnailScores = () => {
  const result = thumbnailApi.scores.useQuery<ThumbnailScore[]>(
    ["scores"],
    {},
    {
      queryKey: ["scores"],
      select: (data) => data.body.results.sort((a, b) => b.id - a.id),
    },
  );

  const client = useQueryClient();

  const addScore = (score: ThumbnailScore) => {
    client.setQueryData(
      ["scores"],
      (data: { body: { results: ThumbnailScore[] } }) => {
        if (!data) return data;
        const saved = data.body.results;
        return {
          ...data,
          body: {
            ...data.body,
            results: [score, ...saved],
          },
        };
      },
    );
  };

  return {
    ...result,
    addScore,
  };
};

export const useScoreThumbnail = (withToast?: boolean) => {
  const mutate = thumbnailApi.score.useMutation({
    mutationKey: ["thumbnailScore"],
  });
  const isLoading = Boolean(useIsMutating({ mutationKey: ["thumbnailScore"] }));

  const { toast } = useToast();

  const getScore = (body: Parameters<typeof mutate.mutateAsync>[0]["body"]) => {
    return mutate
      .mutateAsync({
        body,
      })
      .then((res) => res.body)
      .catch((res: { body: { detail: string } }) => {
        if (withToast) {
          toast({
            variant: "destructive",
            title: res.body.detail,
          });
        }
        throw new Error(res.body.detail);
      });
  };

  return {
    getScore,
    isLoading,
  };
};

export const useUploadThumbnail = (withToast?: boolean) => {
  const mutate = thumbnailApi.upload.useMutation({
    mutationKey: ["thumbnailUpload"],
  });
  const isLoading = Boolean(
    useIsMutating({ mutationKey: ["thumbnailUpload"] }),
  );
  const { toast } = useToast();

  const upload = (body: Parameters<typeof mutate.mutateAsync>[0]["body"]) => {
    return mutate
      .mutateAsync({
        body,
      })
      .then((res) => res.body)
      .catch((res: { body: { detail: string } }) => {
        if (withToast) {
          toast({
            variant: "destructive",
            title: res.body.detail,
          });
        }
        throw new Error(res.body.detail);
      });
  };

  return {
    upload,
    isLoading,
  };
};

export const getThumbnailDownloadUrl = (thumbnailId: number) => {
  return `${API_HOST}/thumbnail/download/${thumbnailId}`;
};
