import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import chatsSlice from "./chatsSlice";

const store = configureStore({
  reducer: { users: usersSlice, chats: chatsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
