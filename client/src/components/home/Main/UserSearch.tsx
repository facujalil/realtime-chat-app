import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setChatUserId } from "store/chatsSlice";

interface Props {
  showUserSearch: boolean;
  setShowUserSearch: Dispatch<SetStateAction<boolean>>;
}

function UserSearch({ showUserSearch, setShowUserSearch }: Props) {
  const dispatch = useDispatch();

  const chatUserId = useSelector((state: RootState) => state.chats.chatUserId);
  const { allUsers, authUser } = useSelector((state: RootState) => state.users);

  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    if (chatUserId) {
      dispatch(setChatUserId(null));
    }
  }, [showUserSearch]);

  return (
    <div className="w-full h-full mt-8 px-4 flex flex-col gap-4">
      <div className="w-full flex justify-center items-center gap-4">
        <button
          className={`${
            showUserSearch ? "lg:flex" : ""
          } hidden w-4 h-4 justify-center items-center opacity-75`}
          onClick={() => setShowUserSearch(false)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="w-full h-12 px-4 flex justify-center items-center gap-4 bg-[#3e404b] rounded">
          <div className="flex justify-center items-center w-4 h-4">
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
          </div>
          <input
            name="message"
            type="name"
            value={searchUsername}
            maxLength={30}
            autoFocus
            autoComplete="off"
            placeholder="Search for users"
            onChange={(e) => setSearchUsername(e.target.value)}
            className="overflow-hidden w-full h-full text-ellipsis nowrap outline-none bg-transparent placeholder-gray-400"
          />
        </div>
      </div>
      <div className="w-full grid gap-4 overflow-auto hidden-scroll mb-8 pb-8">
        {allUsers
          .filter(
            (user) =>
              authUser &&
              user.user_id !== authUser.user_id &&
              searchUsername &&
              user.username.startsWith(searchUsername.toLocaleLowerCase())
          )
          .map((user) => (
            <div
              key={user.user_id}
              className="w-full h-10 px-4 flex items-center bg-[#3e404b] border-[1px] border-[rgba(255,255,255,0.2)] rounded cursor-pointer transition hover:opacity-90"
              onClick={() => dispatch(setChatUserId(user.user_id))}
            >
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                {user.username}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserSearch;
