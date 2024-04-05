import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse } from "../types";

type AuthState = {
  id?: number;
  token?: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {} as AuthState,
  reducers: {
    setAuth: (_, { payload }: PayloadAction<AuthResponse>) => {
      return payload;
    },

    removeAuth: () => {
      return {};
    },
  },
});

export default authSlice.reducer;

export const { setAuth, removeAuth } = authSlice.actions;
