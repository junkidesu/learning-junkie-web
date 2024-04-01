import { useAppSelector } from "../hooks";
import { useGetUserByIdQuery } from "../services/users.service";
import { User } from "../types";

type AuthUserData = {
  existsId: boolean;
  authUser?: User;
  isLoading: boolean;
  isError: boolean;
};

const useAuthUser = (): AuthUserData => {
  const id = useAppSelector(({ auth }) => auth.id);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id!, { skip: !id });

  if (!id) return { existsId: false, isLoading: false, isError: false };

  return { existsId: true, authUser: user, isLoading, isError };
};

export default useAuthUser;
