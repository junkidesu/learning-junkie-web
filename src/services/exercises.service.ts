import { Exercise } from "../types";
import { api } from "./api.service";

export const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLessonExercises: builder.query<Exercise[], number>({
      query: (id) => ({
        url: `lessons/${id}/exercises`,
      }),
    }),
    getExerciseById: builder.query<Exercise, number>({
      query: (id) => ({
        url: `exercises/${id}`,
      }),
    }),
  }),
});

export const { useGetLessonExercisesQuery, useGetExerciseByIdQuery } =
  exercisesApi;
