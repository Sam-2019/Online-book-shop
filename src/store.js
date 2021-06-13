import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Pages/features/user/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
