import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useSocketContext } from "context/SocketContext";

function MainChatForm() {
  const authUser = useSelector((state: RootState) => state.users.authUser);
  const chatUserId = useSelector((state: RootState) => state.chats.chatUserId);

  const { socket } = useSocketContext();

  const [content, setContent] = useState("");

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && authUser && chatUserId && content) {
      socket.emit("send-message", {
        sender_id: authUser.user_id,
        receiver_id: chatUserId,
        content: content,
      });

      setContent("");
    }
  };

  return (
    <form
      className="flex justify-center items-center gap-1 w-full pb-8"
      onSubmit={(e) => sendMessage(e)}
    >
      <div className="flex justify-center items-center gap-1 w-11/12 h-full">
        <input
          name="message"
          type="text"
          value={content}
          maxLength={800}
          autoFocus
          autoComplete="off"
          placeholder="Write a message..."
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 outline-none bg-transparent border-2 border-[#1b90ff] rounded placeholder-gray-400"
        />
        <button className="flex justify-center items-center h-full aspect-square p-3 bg-[#1b90ff] rounded transition hover:opacity-90">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}

export default MainChatForm;
