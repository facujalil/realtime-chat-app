import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import UserSearch from "./UserSearch";
import CurrentChat from "./CurrentChat/CurrentChat";
import NoMessages from "./NoMessages";

interface Props {
  showUserSearch: boolean;
  setShowUserSearch: Dispatch<SetStateAction<boolean>>;
}

function Main({ showUserSearch, setShowUserSearch }: Props) {
  const { currentChat, chatUserId } = useSelector(
    (state: RootState) => state.chats
  );

  return (
    <div className="lg:w-full lg:ml-8 relative flex flex-col justify-between w-[62.5%] h-[calc(100%-2rem)] mr-8 rounded">
      <div className="overflow-hidden flex-1 flex flex-col justify-between items-center h-full bg-custom-gradient-180deg rounded">
        {showUserSearch ? (
          <UserSearch
            showUserSearch={showUserSearch}
            setShowUserSearch={setShowUserSearch}
          />
        ) : currentChat && chatUserId ? (
          <CurrentChat />
        ) : (
          <NoMessages />
        )}
      </div>
    </div>
  );
}

export default Main;
