import { useAppSelector } from "../hooks";
import {
  useGetUserByIdQuery,
  useGetUserCoursesQuery,
} from "../services/users.service";
import { Course, User } from "../types";

type AuthUserData = {
  existsId: boolean;
  authUser?: User;
  courses?: Course[];
  userLoading: boolean;
  coursesLoading: boolean;
  userError: boolean;
  coursesError: boolean;
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

  if (!id)
    return {
      existsId: false,
      userLoading: false,
      coursesLoading: false,
      userError: false,
      coursesError: false,
    };

  return {
    existsId: true,
    authUser,
    courses,
    userLoading,
    coursesLoading,
    userError,
    coursesError,
  };
};

export default useAuthUser;
