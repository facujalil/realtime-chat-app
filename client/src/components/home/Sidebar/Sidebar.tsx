import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import LoadingSpinner from "../common/LoadingSpinner";
import Menu from "./Menu";
import PreviousChats from "./PreviousChats/PreviousChats";

interface Props {
  authUserLoading: boolean;
  showUserSearch: boolean;
  setShowUserSearch: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({
  authUserLoading,
  showUserSearch,
  setShowUserSearch,
}: Props) {
  const authUser = useSelector((state: RootState) => state.users.authUser);
  const chatUserId = useSelector((state: RootState) => state.chats.chatUserId);

  const [searchChat, setSearchChat] = useState("");

  return (
    <div
      className={`${
        chatUserId || showUserSearch ? "lg:hidden" : ""
      } relative flex-1 flex flex-col justify-start items-center gap-4 overflow-auto hidden-scroll h-[calc(100%-2rem)] p-8`}
    >
      {authUserLoading ? (
        <LoadingSpinner />
      ) : authUser ? (
        <>
          <Menu
            searchChat={searchChat}
            setSearchChat={setSearchChat}
            setShowUserSearch={setShowUserSearch}
          />
          <PreviousChats searchChat={searchChat} />
        </>
      ) : null}
    </div>
  );
}

export default Sidebar;
