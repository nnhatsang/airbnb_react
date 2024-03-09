import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  count: 0,
};

const SpinnerSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingOn: (state) => {
      state.isLoading = true;
      state.count += 1;
    },
    setLoadingOff: (state) => {
     state.count = Math.max(0, state.count - 1);
     state.isLoading = state.count > 0;
    },
  },
});

export const { setLoadingOn, setLoadingOff } = SpinnerSlice.actions;

export default SpinnerSlice.reducer;
