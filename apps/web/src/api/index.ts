import { initQueryClient } from "@ts-rest/react-query";

import { useIsMutating, useQueryClient } from "@tanstack/react-query";

import { thumbnailContract, ThumbnailScore } from "./thumbnail.contract";

export const API_HOST = import.meta.env.VITE_API_HOST + "/api/v1";

export const thumbnailApi = initQueryClient(thumbnailContract, {
  baseUrl: `${import.meta.env.VITE_API_HOST}`,
});

export const useThumbnailScores = () => {
  const result = thumbnailApi.scores.useQuery(["scores"], {}, {
    select: (data) => data.body.results,
  });

  const client = useQueryClient();

  const addScore = (score: ThumbnailScore) => {
    client.setQueryData(
      ["scores"],
      (data: (typeof result)["data"]) => {
        if (!data) return data;
        const saved = data.body.results;
        return {
          ...data,
          body: {
            ...data.body,
            results: [score].concat(saved),
          },
        };
      },
    );
  };

  return {
    ...result,
    addScore,
  };
}

export const useScoreThumbnail = () => {
  const isLoading = Boolean(useIsMutating({ mutationKey: ["thumbnailScore"] }));

  const mutate = thumbnailApi.score.useMutation({
    mutationKey: ["thumbnailScore"],
  });

  const getScore = (body: Parameters<typeof mutate.mutateAsync>[0]["body"]) => {
    return mutate.mutateAsync({
      body
    }).then((res) => res.body);
  };

  return {
    getScore,
    isLoading, 
  };
}

export const useUploadThumbnail = () => {
  const mutate = thumbnailApi.upload.useMutation({
    mutationKey: ["thumbnailUpload"],
  });
  const isLoading = Boolean(useIsMutating({ mutationKey: ["thumbnailUpload"] }));

  const upload = (body: Parameters<typeof mutate.mutateAsync>[0]["body"]) => {
    return mutate.mutateAsync({
      body
    }).then((res) => res.body);
  };

  return {
    upload,
    isLoading,
  };
}

export const getThumbnailDownloadUrl = (thumbnailId: number) => {
  return `${API_HOST}/thumbnail/download/${thumbnailId}`;
}
