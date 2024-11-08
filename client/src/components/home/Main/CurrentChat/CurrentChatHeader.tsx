import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import Avatar from "components/home/common/Avatar";
import { removeChat } from "api/chats.api";
import { removePreviousChat, setChatUserId } from "store/chatsSlice";
import { checkUserOnline } from "utils/checkUserOnline";

function CurrentChatHeader() {
  const dispatch = useDispatch();

  const { currentChat, chatUserId } = useSelector(
    (state: RootState) => state.chats
  );
  const { allUsers, authUser } = useSelector((state: RootState) => state.users);

  return currentChat?.user ? (
    <div className="w-full min-h-[5.15rem]">
      <div className="h-full px-4 flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <button
            className={`${
              chatUserId ? "lg:flex" : ""
            } hidden justify-center items-center w-4 h-4 opacity-75`}
            onClick={() => dispatch(setChatUserId(null))}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="overflow-hidden w-8 h-8 bg-[#3e404b] rounded-full">
            <Avatar
              avatarUrl={currentChat.user.avatar_url}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">{currentChat.user.username}</p>
            <p className="text-xs opacity-75">
              {chatUserId
                ? checkUserOnline(allUsers, chatUserId)
                  ? "Online"
                  : "Offline"
                : ""}
            </p>
          </div>
        </div>
        <button
          className="flex justify-center items-center w-4 h-4 text-sm opacity-75 transition hover:opacity-65"
          onClick={() => {
            if (authUser && chatUserId) {
              removeChat(authUser.user_id, chatUserId)
                .then(() => {
                  if (chatUserId) {
                    dispatch(removePreviousChat(chatUserId));
                  }
                  dispatch(setChatUserId(null));
                })
                .catch((error) => console.log(error));
            }
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  ) : null;
}

export default CurrentChatHeader;
