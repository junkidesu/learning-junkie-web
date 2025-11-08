import { useAppSelector } from "../hooks";
import { useGetSelfProgressQuery } from "../services/self.service";
import {
  useGetUserByIdQuery,
  useGetUserEnrollmentsQuery,
} from "../services/users.service";
import { Enrollment, Progress, User } from "../types";

type AuthUserData = {
  existsId: boolean;
  authUser?: User;
  enrollments?: Enrollment[];
  progress?: Progress[];
  userLoading: boolean;
  coursesLoading: boolean;
  progressLoading: boolean;
  userError: boolean;
  coursesError: boolean;
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
    data: enrollments,
    isLoading: enrollmentsLoading,
    isError: enrollmentsError,
  } = useGetUserEnrollmentsQuery(id!, { skip: !id });

  const {
    data: progress,
    isLoading: progressLoading,
    isError: progressError,
  } = useGetSelfProgressQuery(id!, { skip: !id });

  if (!id)
    return {
      existsId: false,
      userLoading: false,
      coursesLoading: false,
      progressLoading: false,
      userError: false,
      coursesError: false,
      progressError: false,
    };

  return {
    existsId: true,
    authUser,
    enrollments,
    progress,
    userLoading,
    coursesLoading: enrollmentsLoading,
    progressLoading,
    userError,
    coursesError: enrollmentsError,
    progressError,
  };
};

export default useAuthUser;
