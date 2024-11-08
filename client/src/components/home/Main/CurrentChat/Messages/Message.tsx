import { IMessage } from "types";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import Avatar from "components/home/common/Avatar";

interface Props {
  message: IMessage;
}

function Message({ message }: Props) {
  const authUser = useSelector((state: RootState) => state.users.authUser);
  const currentChat = useSelector(
    (state: RootState) => state.chats.currentChat
  );

  return (
    <div
      className={`w-full ${
        message.sender_id === authUser?.user_id ? "flex justify-end" : ""
      }`}
    >
      <div
        className={`w-3/4 flex gap-2 ${
          message.sender_id === authUser?.user_id ? "justify-end" : ""
        }`}
      >
        {message.sender_id !== authUser?.user_id ? (
          <div className="flex items-end gap-2">
            <Avatar
              avatarUrl={currentChat?.user?.avatar_url}
              className="self-end overflow-hidden w-8 h-8 bg-[#3e404b] rounded-full"
            />
            <div className="flex-1">
              <p className="py-2 px-4 flex bg-[#434856] rounded-tl-lg rounded-tr-lg rounded-br-lg">
                {message.content}
              </p>
            </div>
          </div>
        ) : (
          <p className="py-2 px-4 flex bg-[#1991ff] rounded-tl-lg rounded-tr-lg rounded-bl-lg">
            {message.content}
          </p>
        )}
      </div>
    </div>
  );
}

export default Message;
