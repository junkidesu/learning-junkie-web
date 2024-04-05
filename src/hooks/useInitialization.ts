import { useAppDispatch } from "../hooks";
import { setAuth } from "../reducers/auth.reducer";
import storage from "../storage";

const useInitialization = () => {
  const dispatch = useAppDispatch();

  const restoreUser = () => {
    const auth = storage.getAuth();

    if (!auth) return;

    dispatch(setAuth(auth));
  };

  return { restoreUser };
};

export default useInitialization;
