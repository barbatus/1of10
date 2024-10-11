import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const ListQuerySchema = z.object({
  skip: z.number().optional(),
  limit: z.number().optional(),
});

export const ThumbnailScoreSchema = z.object({
  id: z.number(),
  thumbnailId: z.number(),
  score: z.number().nullable(),
  userPrompt: z.string().min(1),
  resultHint: z.string().nullable(),
});

export type ThumbnailScore = z.infer<typeof ThumbnailScoreSchema>;

export const ThumbnailScoreInputSchema = z.object({
  thumbnailId: z.number(),
  userPrompt: z.string().min(1),
});

export type ThumbnailScoreInput = z.infer<typeof ThumbnailScoreInputSchema>;

export const thumbnailContract = c.router(
  {
    scores: {
      method: "GET",
      path: "thumbnail-scores",
      query: ListQuerySchema,
      responses: {
        200: z.object({
          results: z.array(ThumbnailScoreSchema),
        }),
      },
    },
    upload: {
      method: "POST",
      path: "thumbnail/upload",
      contentType: "multipart/form-data",
      body: z.object({
        name: z.string(),
        file: z.instanceof(File),
      }),
      responses: {
        200: z.object({
          id: z.number(),
          downloadUrl: z.string(),
        }),
      },
    },
    score: {
      method: "POST",
      path: "thumbnail-score/score",
      body: ThumbnailScoreInputSchema,
      responses: {
        200: ThumbnailScoreSchema,
      },
    },
  },
  {
    pathPrefix: "/api/v1/",
  },
);
