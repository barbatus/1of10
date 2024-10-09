import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const ListQuerySchema = z.object({
  skip: z.number().optional(),
  limit: z.number().optional(),
});

export const ThumbnailScoreSchema = z.object({
  id: z.number(),
  score: z.number().nullable(),
});

export const thumbnailContract = c.router(
  {
    scores: {
      method: "GET",
      path: "thumbnails",
      query: ListQuerySchema,
      responses: {
        200: z.object({
          results: z.array(ThumbnailScoreSchema),
        }),
      },
    },
  },
  {
    pathPrefix: "/api/v1/",
  },
);
