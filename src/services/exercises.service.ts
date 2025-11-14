import { EditExercise, Exercise, NewExercise } from "../types";
import { api } from "./api.service";

export const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLessonExercises: builder.query<Exercise[], number>({
      query: (id) => ({
        url: `lessons/${id}/exercises`,
      }),
      providesTags: ["Exercise"],
    }),
    getExerciseById: builder.query<Exercise, number>({
      query: (id) => ({
        url: `exercises/${id}`,
      }),
      providesTags: ["Exercise"],
    }),
    addExercise: builder.mutation<Exercise, { id: number; body: NewExercise }>({
      query: ({ id, body }) => ({
        url: `lessons/${id}/exercises`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Exercise"],
    }),
    editExercise: builder.mutation<
      Exercise,
      { id: number; body: EditExercise }
    >({
      query: ({ id, body }) => ({
        url: `exercises/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Exercise"],
    }),
    deleteExercise: builder.mutation<void, number>({
      query: (id) => ({
        url: `exercises/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exercise"],
    }),
  }),
});

export const {
  useGetLessonExercisesQuery,
  useAddExerciseMutation,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
  useGetExerciseByIdQuery,
} = exercisesApi;
