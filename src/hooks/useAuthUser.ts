import { useAppSelector } from "../hooks";
import {
  useGetUserByIdQuery,
  useGetUserCoursesQuery,
  useGetUserProgressQuery,
  useGetUserSolutionsQuery,
} from "../services/users.service";
import { Course, Exercise, Progress, User } from "../types";

type AuthUserData = {
  existsId: boolean;
  authUser?: User;
  courses?: Course[];
  solutions?: Exercise[];
  progress?: Progress[];
  userLoading: boolean;
  coursesLoading: boolean;
  solutionsLoading: boolean;
  progressLoading: boolean;
  userError: boolean;
  coursesError: boolean;
  solutionsError: boolean;
  progressError: boolean;
};

const useAuthUser = (): AuthUserData => {
  const id = useAppSelector(({ auth }) => auth.id);

  const {
    data: authUser,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserByIdQuery(id!, { skip: !id });

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useGetUserCoursesQuery(id!, { skip: !id });

  const {
    data: solutions,
    isLoading: solutionsLoading,
    isError: solutionsError,
  } = useGetUserSolutionsQuery(id!, { skip: !id });

  const {
    data: progress,
    isLoading: progressLoading,
    isError: progressError,
  } = useGetUserProgressQuery(id!, { skip: !id });

  if (!id)
    return {
      existsId: false,
      userLoading: false,
      coursesLoading: false,
      solutionsLoading: false,
      progressLoading: false,
      userError: false,
      coursesError: false,
      solutionsError: false,
      progressError: false,
    };

  return {
    existsId: true,
    authUser,
    courses,
    solutions,
    progress,
    userLoading,
    coursesLoading,
    solutionsLoading,
    progressLoading,
    userError,
    coursesError,
    solutionsError,
    progressError,
  };
};

export default useAuthUser;
