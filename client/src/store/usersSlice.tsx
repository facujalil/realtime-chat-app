import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "types";

export const token = localStorage.getItem("token");

const usersSlice = createSlice({
  name: "users",
  initialState: { token: token, authUser: null, allUsers: [] } as {
    token: string | null;
    authUser: IUser | null;
    allUsers: IUser[];
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    resetUsers: () => ({
      token: null,
      authUser: null,
      allUsers: [],
    }),
  },
});

export const { setToken, setAuthUser, setAllUsers, resetUsers } =
  usersSlice.actions;
export default usersSlice.reducer;
