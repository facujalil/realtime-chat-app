import { IChat } from "types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setChatUserId } from "store/chatsSlice";
import Avatar from "components/home/common/Avatar";

interface Props {
  previousChat: IChat;
}

function PreviousChat({ previousChat }: Props) {
  const dispatch = useDispatch();

  const chatUserId = useSelector((state: RootState) => state.chats.chatUserId);

  return (
    <div
      className={`w-full p-4 flex items-center gap-4 rounded cursor-pointer ${
        previousChat.user_id === chatUserId
          ? "bg-[#1b90ff]"
          : "bg-[#3e404b] transition hover:opacity-90"
      }`}
      onClick={() => dispatch(setChatUserId(previousChat.user_id))}
    >
      <Avatar
        avatarUrl={previousChat.avatar_url}
        className="overflow-hidden w-10 h-10 bg-[#292b36] rounded-full"
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <p className="overflow-hidden font-semibold text-lg text-ellipsis whitespace-nowrap">
          {previousChat.username}
        </p>
        <p className="overflow-hidden w-11/12 text-sm text-ellipsis whitespace-nowrap opacity-75">
          {previousChat.last_message}
        </p>
      </div>
    </div>
  );
}

export default PreviousChat;
