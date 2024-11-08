import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getPreviousChats } from "api/chats.api";
import { setPreviousChats } from "store/chatsSlice";
import PreviousChat from "./PreviousChat";
import LoadingSpinner from "components/home/common/LoadingSpinner";

interface Props {
  searchChat: string;
}

function PreviousChats({ searchChat }: Props) {
  const dispatch = useDispatch();

  const authUser = useSelector((state: RootState) => state.users.authUser);
  const previousChats = useSelector(
    (state: RootState) => state.chats.previousChats
  );

  const [previousChatsLoading, setPreviousChatsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      getPreviousChats(authUser.user_id)
        .then((data) => dispatch(setPreviousChats(data.users)))
        .catch((error) => console.log(error))
        .finally(() => setPreviousChatsLoading(false));
    }
  }, [authUser]);

  return (
    <>
      {previousChatsLoading ? (
        <div className="relative h-full">
          <LoadingSpinner />
        </div>
      ) : (
        previousChats
          .filter(
            (previousChat) =>
              !searchChat ||
              previousChat.username.startsWith(searchChat.toLowerCase())
          )
          .map((previousChat) => (
            <PreviousChat
              key={previousChat.chat_id}
              previousChat={previousChat}
            />
          ))
      )}
    </>
  );
}

export default PreviousChats;
