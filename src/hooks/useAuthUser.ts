import { useAppSelector } from "../hooks";
import {
  useGetSelfLessonCompletionsQuery,
  useGetSelfProgressQuery,
} from "../services/self.service";
import {
  useGetUserByIdQuery,
  useGetUserEnrollmentsQuery,
} from "../services/users.service";
import { Enrollment, LessonCompletion, Progress, User } from "../types";

type AuthUserData = {
  existsId: boolean;
  authUser?: User;
  enrollments?: Enrollment[];
  progress?: Progress[];
  lessonCompletions?: LessonCompletion[];
  userLoading: boolean;
  coursesLoading: boolean;
  progressLoading: boolean;
  lessonCompletionsLoading: boolean;
  userError: boolean;
  coursesError: boolean;
  progressError: boolean;
  lessonCompletionsError: boolean;
};

const useAuthUser = (): AuthUserData => {
  const id = useAppSelector(({ auth }) => auth.id);

  const {
    data: authUser,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserByIdQuery(id!, { skip: !id });

  const {
    data: enrollments,
    isLoading: enrollmentsLoading,
    isError: enrollmentsError,
  } = useGetUserEnrollmentsQuery(id!, { skip: !id });

  const {
    data: progress,
    isLoading: progressLoading,
    isError: progressError,
  } = useGetSelfProgressQuery(undefined, { skip: !id });

  const {
    data: lessonCompletions,
    isLoading: lessonCompletionsLoading,
    isError: lessonCompletionsError,
  } = useGetSelfLessonCompletionsQuery(undefined, { skip: !id });

  if (!id)
    return {
      existsId: false,
      userLoading: false,
      coursesLoading: false,
      progressLoading: false,
      userError: false,
      coursesError: false,
      progressError: false,
      lessonCompletionsLoading: false,
      lessonCompletionsError: false,
    };

  return {
    existsId: true,
    authUser,
    enrollments,
    progress,
    lessonCompletions,
    userLoading,
    coursesLoading: enrollmentsLoading,
    progressLoading,
    userError,
    coursesError: enrollmentsError,
    progressError,
    lessonCompletionsLoading,
    lessonCompletionsError,
  };
};

export default useAuthUser;
