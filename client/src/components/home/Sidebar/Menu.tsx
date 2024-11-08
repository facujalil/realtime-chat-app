import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useSocketContext } from "context/SocketContext";
import useWindowWidth from "hooks/useWindowWidth";
import { resetUsers } from "store/usersSlice";
import { resetChats } from "store/chatsSlice";
import { IoMdLogOut } from "react-icons/io";
import Avatar from "../common/Avatar";

interface Props {
  searchChat: string;
  setSearchChat: Dispatch<SetStateAction<string>>;
  setShowUserSearch: Dispatch<SetStateAction<boolean>>;
}

function Menu({ searchChat, setSearchChat, setShowUserSearch }: Props) {
  const dispatch = useDispatch();

  const authUser = useSelector((state: RootState) => state.users.authUser);

  const { socket, setSocket } = useSocketContext();

  const windowWidth = useWindowWidth();

  const [showLogoutButton, setShowLogoutButton] = useState(false);

  useEffect(() => {
    if (showLogoutButton) {
      const hideLogoutButton = () => {
        setShowLogoutButton(false);
      };

      document.addEventListener("click", hideLogoutButton);

      return () => {
        document.removeEventListener("click", hideLogoutButton);
      };
    }
  }, [showLogoutButton]);

  const logout = () => {
    if (socket) {
      socket.emit("logout");
      setSocket(null);
    }
    localStorage.removeItem("token");
    dispatch(resetUsers());
    dispatch(resetChats());
  };

  return (
    <>
      <div className="relative flex justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div
            className="relative w-12 h-12 overflow-hidden rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              if (windowWidth <= 980) {
                setShowLogoutButton(true);
              }
            }}
          >
            {windowWidth <= 980 ? (
              <button
                className={`${
                  showLogoutButton ? "opacity-100" : ""
                } absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] transition opacity-0`}
                onClick={() => (showLogoutButton ? logout() : null)}
              >
                <IoMdLogOut className="w-[1.85rem] h-full" />
              </button>
            ) : (
              <button
                className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] transition opacity-0 hover:opacity-100"
                onClick={logout}
              >
                <IoMdLogOut className="w-[1.85rem] h-full" />
              </button>
            )}
            <Avatar
              avatarUrl={authUser?.avatar_url}
              className="overflow-hidden w-full h-full bg-[#3e404b]"
            />
          </div>
          <p className="overflow-hidden px-4 font-semibold text-lg text-ellipsis whitespace-nowrap">
            {authUser?.username}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center gap-6 w-full h-10">
          <div className="flex-1 flex justify-center items-center gap-4 h-full px-4 bg-[#3e404b] rounded-full">
            <div className="flex justify-center items-center w-4 h-4">
              <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            </div>
            <input
              name="message"
              type="name"
              value={searchChat}
              maxLength={800}
              autoComplete="off"
              placeholder="Search for chats"
              onChange={(e) => setSearchChat(e.target.value)}
              className="overflow-hidden w-full h-full text-ellipsis whitespace-nowrap outline-none bg-transparent placeholder-gray-400"
            />
          </div>
          <button
            className="flex justify-center items-center w-12 h-full px-4 bg-[#3e404b] rounded transition hover:opacity-90"
            onClick={() => setShowUserSearch(true)}
          >
            <i className="fa-solid fa-pen-to-square opacity-75"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Menu;
