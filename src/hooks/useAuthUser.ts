import { useAppSelector } from "../hooks";
import {
  useGetUserByIdQuery,
  useGetUserCoursesQuery,
  useGetUserSolutionsQuery,
} from "../services/users.service";
import { Course, Exercise, User } from "../types";

type AuthUserData = {
  existsId: boolean;
  authUser?: User;
  courses?: Course[];
  solutions?: Exercise[];
  userLoading: boolean;
  coursesLoading: boolean;
  solutionsLoading: boolean;
  userError: boolean;
  coursesError: boolean;
  solutionsError: boolean;
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

  if (!id)
    return {
      existsId: false,
      userLoading: false,
      coursesLoading: false,
      solutionsLoading: false,
      userError: false,
      coursesError: false,
      solutionsError: false,
    };

  return {
    existsId: true,
    authUser,
    courses,
    solutions,
    userLoading,
    coursesLoading,
    solutionsLoading,
    userError,
    coursesError,
    solutionsError,
  };
};

export default useAuthUser;
