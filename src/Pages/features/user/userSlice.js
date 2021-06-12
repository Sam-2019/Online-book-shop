import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    uniqueID: "",
    firstName: "",
    lastName: "",
    email: "",
    verfifcationStatus: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;
