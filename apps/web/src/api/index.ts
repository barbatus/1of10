import { initQueryClient } from "@ts-rest/react-query";

import { thumbnailContract } from "./thumbnail.contract";

export const thumbnailApi = initQueryClient(thumbnailContract, {
  baseUrl: `${import.meta.env.VITE_API_HOST}`,
});


export const useThumbnailScores = () => {
  return thumbnailApi.scores.useQuery(["scores"], {}, {
    select: (data) => data.body.results,
  });
}
