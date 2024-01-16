import { createSlice } from "@reduxjs/toolkit";
import { getLocal } from "../Utils/Local";

const initialState = {
  user: getLocal(),
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
