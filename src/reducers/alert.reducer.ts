import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertState = {
  visible: boolean;
  message?: string;
  severity?: "success" | "error" | "warning" | "info";
};

const alertSlice = createSlice({
  name: "alert",
  initialState: {} as AlertState,
  reducers: {
    setAlert: (_, { payload }: PayloadAction<AlertState>) => payload,
    clearAlert: (state) => ({ ...state, visible: false }),
  },
});

export default alertSlice.reducer;

export const { setAlert, clearAlert } = alertSlice.actions;
