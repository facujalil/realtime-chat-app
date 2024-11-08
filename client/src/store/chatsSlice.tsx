import { createSlice } from "@reduxjs/toolkit";
import { IChat, IMessage, IUser } from "../types";
import { sortByDate } from "../utils/sortByDate";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    previousChats: [],
    currentChat: {
      user: null,
      messages: [],
    },
    chatUserId: null,
  } as {
    previousChats: IChat[];
    currentChat: { user: IUser | null; messages: IMessage[] } | null;
    chatUserId: number | null;
  },
  reducers: {
    setPreviousChats: (state, action) => {
      state.previousChats = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setChatUserId: (state, action) => {
      state.chatUserId = action.payload;
    },
    addNewChat: (state, action) => {
      state.previousChats.unshift(action.payload);
    },
    addNewMessage: (state, action) => {
      const { chatUser, message } = action.payload;

      state.previousChats = sortByDate(
        state.previousChats.map((previousChat) =>
          previousChat.user_id === chatUser.user_id
            ? {
                ...previousChat,
                last_message: message.content,
                last_message_created_at: message.created_at,
              }
            : previousChat
        )
      );

      if (
        state.currentChat &&
        state.currentChat.user?.user_id === chatUser.user_id
      ) {
        state.currentChat.messages.push(message);
      }
    },
    removePreviousChat: (state, action) => {
      state.previousChats = state.previousChats.filter(
        (previousChat) => previousChat.user_id !== action.payload
      );
    },
    resetChats: () => ({
      previousChats: [],
      currentChat: {
        user: null,
        messages: [],
      },
      chatUserId: null,
    }),
  },
});

export const {
  setPreviousChats,
  setCurrentChat,
  setChatUserId,
  addNewChat,
  addNewMessage,
  removePreviousChat,
  resetChats,
} = chatsSlice.actions;

export default chatsSlice.reducer;
