import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useSocketContext } from "context/SocketContext";
import useWindowWidth from "hooks/useWindowWidth";
import { IMessage, IUser } from "types";
import { parseJwt } from "utils/parseJwt";
import { getUser } from "api/users.api";
import { setAuthUser, setAllUsers } from "store/usersSlice";
import { addNewChat, addNewMessage } from "store/chatsSlice";
import { io } from "socket.io-client";
import { SERVER_URL } from "config";
import Sidebar from "components/home/Sidebar/Sidebar";
import Main from "components/home/Main/Main";

function Home() {
  const dispatch = useDispatch();

  const { token, authUser, allUsers } = useSelector(
    (state: RootState) => state.users
  );
  const { previousChats, chatUserId } = useSelector(
    (state: RootState) => state.chats
  );

  const { socket, setSocket } = useSocketContext();

  const windowWidth = useWindowWidth();

  const [authUserLoading, setAuthUserLoading] = useState(true);
  const [message, setMessage] = useState<IMessage | null>(null);
  const [showUserSearch, setShowUserSearch] = useState(false);

  useEffect(() => {
    const authUserId = token ? parseJwt(token).user_id : null;

    if (authUserId) {
      getUser(authUserId)
        .then((data) => {
          dispatch(setAuthUser(data.user));
        })
        .catch((error) => console.error(error))
        .finally(() => setAuthUserLoading(false));
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      if (!socket) {
        const formattedServerUrl = SERVER_URL.endsWith("/")
          ? SERVER_URL
          : `${SERVER_URL}/`;

        setSocket(
          io(formattedServerUrl, {
            auth: { token: token },
          })
        );
      } else {
        const getAllUsers = (users: IUser[]) => {
          dispatch(setAllUsers(users));
        };
        const getMessage = (message: IMessage) => {
          setMessage(message);
        };

        socket.on("connect", () => {
          socket.emit("connect-user", authUser.user_id);
        });
        socket.on("reconnect", () => {
          socket.emit("connect-user", authUser.user_id);
        });
        socket.on("get-all-users", getAllUsers);
        socket.on("get-message", getMessage);

        return () => {
          if (socket) {
            socket.disconnect();
            socket.off("get-all-users", getAllUsers);
            socket.off("get-message", getMessage);
          }
        };
      }
    }
  }, [socket, authUser]);

  useEffect(() => {
    if (message) {
      const chatUser = allUsers.find(
        (user) =>
          user.user_id ===
          (message.sender_id !== authUser?.user_id
            ? message.sender_id
            : message.receiver_id)
      );

      if (chatUser) {
        dispatch(addNewMessage({ chatUser: chatUser, message: message }));

        if (
          !previousChats.find(
            (previousChat) => previousChat.user_id === chatUser.user_id
          )
        ) {
          dispatch(
            addNewChat({
              user_id: chatUser.user_id,
              username: chatUser.username,
              avatar_url: chatUser.avatar_url,
              chat_id: message.chat_id,
              last_message: message.content,
              last_message_created_at: message.created_at,
            })
          );
        }
      }
    }
  }, [message]);

  useEffect(() => {
    if (chatUserId && showUserSearch) {
      setShowUserSearch(false);
    }
  }, [chatUserId]);

  return (
    <div className="lg:max-w-[28rem] flex justify-center items-start w-5/6 h-5/6 bg-[#292b36] rounded">
      <Sidebar
        authUserLoading={authUserLoading}
        showUserSearch={showUserSearch}
        setShowUserSearch={setShowUserSearch}
      />
      {windowWidth > 980 || chatUserId || showUserSearch ? (
        <Main
          showUserSearch={showUserSearch}
          setShowUserSearch={setShowUserSearch}
        />
      ) : null}
    </div>
  );
}

export default Home;
