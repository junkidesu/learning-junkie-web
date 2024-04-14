import { useAppDispatch } from "../hooks";
import { removeAuth, setAuth } from "../reducers/auth.reducer";
import { useLoginMutation } from "../services/auth.service";
import storage from "../storage";
import { AuthResponse } from "../types";

type ReturnType = {
  authenticate: (credentials: {
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  logout: () => void;
  signingIn: boolean;
};

const useAuthentication = (): ReturnType => {
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const authenticate = async (credentials: {
    email: string;
    password: string;
  }) => {
    const result = await login(credentials).unwrap();

    dispatch(setAuth(result));
    storage.setAuth(result);

    return result;
  };

  const logout = () => {
    storage.removeAuth();

    dispatch(removeAuth());
  };

  return { authenticate, logout, signingIn: isLoading };
};

export default useAuthentication;
