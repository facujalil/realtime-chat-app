import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getUser } from "api/users.api";
import { getChatMessages } from "api/chats.api";
import { setCurrentChat } from "store/chatsSlice";
import LoadingSpinner from "components/home/common/LoadingSpinner";
import CurrentChatHeader from "./CurrentChatHeader";
import Messages from "./Messages/Messages";
import MessageForm from "./MessageForm";

function CurrentChat() {
  const dispatch = useDispatch();

  const chatUserId = useSelector((state: RootState) => state.chats.chatUserId);
  const authUser = useSelector((state: RootState) => state.users.authUser);

  const [currentChatLoading, setCurrentChatLoading] = useState(true);

  useEffect(() => {
    if (chatUserId && authUser) {
      if (!currentChatLoading) {
        setCurrentChatLoading(true);
      }
      getCurrentChat(chatUserId, authUser.user_id)
        .then(([{ user }, { messages }]) =>
          dispatch(setCurrentChat({ user: user, messages: messages }))
        )
        .catch((error) => console.log(error))
        .finally(() => setCurrentChatLoading(false));
    } else {
      setCurrentChatLoading(false);
    }
  }, [chatUserId]);

  const getCurrentChat = async (chatUserId: number, authUserId: number) => {
    const data = await Promise.all([
      getUser(chatUserId),
      getChatMessages(authUserId, chatUserId),
    ]);

    return data;
  };

  return currentChatLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <CurrentChatHeader />
      <Messages />
      <MessageForm />
    </>
  );
}

export default CurrentChat;
