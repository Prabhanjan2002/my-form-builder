// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import formBuilderReducer from "../features/formBuilderSlice";

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    // You might add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
