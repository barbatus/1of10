import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const ThumbnailScoreCreate = z
  .object({ userPrompt: z.string().max(500), thumbnailId: z.number().int() })
  .passthrough();
const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const ThumbnailScoreUpdate = z
  .object({
    score: z.union([z.number(), z.null()]),
    result_hint: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const limit = z.union([z.number(), z.null()]).optional();
const ThumbnailScore = z
  .object({
    userPrompt: z.string().max(500),
    thumbnailId: z.number().int(),
    id: z.number().int(),
    score: z.union([z.number(), z.null()]).optional(),
    resultHint: z.union([z.string(), z.null()]).optional(),
    createdDate: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ThumbnailCreate = z
  .object({
    name: z.union([z.string(), z.null()]),
    contentType: z.string(),
    fileData: z.instanceof(File),
  })
  .passthrough();
const Thumbnail = z
  .object({
    name: z.union([z.string(), z.null()]),
    contentType: z.string(),
    fileData: z.instanceof(File),
    id: z.number().int(),
  })
  .passthrough();
const Body_upload_api_v1_thumbnail_upload_post = z
  .object({ file: z.instanceof(File), name: z.string() })
  .passthrough();
const ThumbnailResponse = z
  .object({ id: z.number().int(), downloadUrl: z.string() })
  .passthrough();

export const schemas = {
  ThumbnailScoreCreate,
  ValidationError,
  HTTPValidationError,
  ThumbnailScoreUpdate,
  limit,
  ThumbnailScore,
  ThumbnailCreate,
  Thumbnail,
  Body_upload_api_v1_thumbnail_upload_post,
  ThumbnailResponse,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/api/v1/thumbnail",
    alias: "create_object_api_v1_thumbnail_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ThumbnailCreate,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/v1/thumbnail-score",
    alias: "create_object_api_v1_thumbnail_score_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ThumbnailScoreCreate,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v1/thumbnail-score/:obj_id",
    alias: "get_object_api_v1_thumbnail_score__obj_id__get",
    requestFormat: "json",
    parameters: [
      {
        name: "obj_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "put",
    path: "/api/v1/thumbnail-score/:obj_id",
    alias: "update_object_api_v1_thumbnail_score__obj_id__put",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ThumbnailScoreUpdate,
      },
      {
        name: "obj_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/v1/thumbnail-score/:obj_id",
    alias: "delete_object_api_v1_thumbnail_score__obj_id__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "obj_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/v1/thumbnail-score/score",
    alias: "score_api_v1_thumbnail_score_score_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ThumbnailScoreCreate,
      },
    ],
    response: ThumbnailScore,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v1/thumbnail-scores",
    alias: "list_objects_api_v1_thumbnail_scores_get",
    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: limit,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v1/thumbnail/:obj_id",
    alias: "get_object_api_v1_thumbnail__obj_id__get",
    requestFormat: "json",
    parameters: [
      {
        name: "obj_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "put",
    path: "/api/v1/thumbnail/:obj_id",
    alias: "update_object_api_v1_thumbnail__obj_id__put",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Thumbnail,
      },
      {
        name: "obj_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/v1/thumbnail/:obj_id",
    alias: "delete_object_api_v1_thumbnail__obj_id__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "obj_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v1/thumbnail/download/:obj_id",
    alias: "download_api_v1_thumbnail_download__obj_id__get",
    requestFormat: "json",
    parameters: [
      {
        name: "obj_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/v1/thumbnail/upload",
    alias: "upload_api_v1_thumbnail_upload_post",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Body_upload_api_v1_thumbnail_upload_post,
      },
    ],
    response: ThumbnailResponse,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v1/thumbnails",
    alias: "list_objects_api_v1_thumbnails_get",
    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: limit,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
