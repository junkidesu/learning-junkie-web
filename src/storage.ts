import { AuthResponse } from "./types";

const KEY = "auth";

const setAuth = (auth: AuthResponse) => {
  localStorage.setItem(KEY, JSON.stringify(auth));
};

const getAuth = (): AuthResponse | undefined => {
  const authString = localStorage.getItem(KEY);

  if (!authString) return undefined;

  const auth = JSON.parse(authString);

  if (!auth) return undefined;

  return auth;
};

const removeAuth = (): void => {
  localStorage.removeItem(KEY);
};

export default { setAuth, getAuth, removeAuth };
