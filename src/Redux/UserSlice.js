import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { userLocalStorage } from "../Utils/Local";
import { addDays } from "date-fns";
import { format } from "date-fns";

const initialState = {
  user: userLocalStorage.get(),
  locatedAt: "",
  dateRange: [
    {
      startDate: addDays(new Date(), 1, ),
      endDate: addDays(new Date(), 8),
      key: "selection",
    },
  ],
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
