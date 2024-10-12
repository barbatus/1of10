import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { schemas } from "./api-schema";

const c = initContract();

export const ListQuerySchema = z.object({
  skip: z.number().optional(),
  limit: z.number().optional(),
});

export type ThumbnailScore = z.infer<typeof schemas.ThumbnailScore>;

export const ThumbnailScoreInputSchema = schemas.ThumbnailScoreCreate;

export type ThumbnailScoreInput = z.infer<typeof schemas.ThumbnailScoreCreate>;

export const thumbnailContract = c.router(
  {
    scores: {
      method: "GET",
      path: "thumbnail-scores",
      query: ListQuerySchema,
      responses: {
        200: z.object({
          results: z.array(schemas.ThumbnailScore),
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
        400: z.object({
          detail: z.string(),
        }),
        500: z.object({
          string: z.string(),
        }),
      },
    },
    score: {
      method: "POST",
      path: "thumbnail-score/score",
      body: schemas.ThumbnailScoreCreate,
      responses: {
        200: schemas.ThumbnailScore,
      },
    },
  },
  {
    pathPrefix: "/api/v1/",
  },
);
