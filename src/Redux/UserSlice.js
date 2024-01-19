import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { userLocalStorage } from "../Utils/Local";

const initialState = {
  user: userLocalStorage.get(),
  locatedAt: "",
  dateRange: {
    startDate: dayjs().add(1, "day"),
    endDate: dayjs().add(8, "day"),
    key: "selection",
  },
  numPeop: 1,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, actions) => {
      state.user = actions.payload;
    },
    setLocatedAt: (state, action) => {
      state.locatedAt = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setNumPeop: (state, action) => {
      state.numPeop = action.payload;
    },
  },
});

export const { setLogin, setNumPeop, setDateRange, setLocatedAt } =
  UserSlice.actions;

export default UserSlice.reducer;
