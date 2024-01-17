import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import SpinnerSlice from "./SpinnerSlice";

export const store = configureStore({
  reducer: { UserSlice, SpinnerSlice },
});
