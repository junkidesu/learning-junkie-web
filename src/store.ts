import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api.service";
import authReducer from "./reducers/auth.reducer";
import alertReducer from "./reducers/alert.reducer";
// ...

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
