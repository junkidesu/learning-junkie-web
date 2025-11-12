import { useAppSelector } from "../hooks";
import {
  useGetSelfLessonCompletionsQuery,
  useGetSelfProgressQuery,
  useGetSelfSubmissionsQuery,
} from "../services/self.service";
import {
  useGetUserByIdQuery,
  useGetUserEnrollmentsQuery,
} from "../services/users.service";
import {
  Enrollment,
  LessonCompletion,
  Progress,
  Submission,
  User,
} from "../types";

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
  submissions?: Submission[];
  submissionsLoading: boolean;
  submissionsError: boolean;
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

  const {
    data: submissions,
    isLoading: submissionsLoading,
    isError: submissionsError,
  } = useGetSelfSubmissionsQuery(undefined, { skip: !id });

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
      submissionsLoading: false,
      submissionsError: false,
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
    submissions,
    submissionsLoading,
    submissionsError,
  };
};

export default useAuthUser;
