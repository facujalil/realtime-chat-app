import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useSocketContext } from "context/SocketContext";
import { IMessage } from "types";
import { groupByDate } from "utils/groupByDate";
import Message from "./Message";
import NoMessages from "../../NoMessages";

function Messages() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { currentChat, chatUserId } = useSelector(
    (state: RootState) => state.chats
  );

  const { socket } = useSocketContext();

  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    if (
      messagesContainerRef.current &&
      currentChat &&
      currentChat.messages.length > 0
    ) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
      if (smooth) {
        setSmooth(false);
      }
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket && !smooth) {
      const handleSmooth = (message: IMessage) => {
        if (
          message.sender_id === chatUserId ||
          message.receiver_id === chatUserId
        ) {
          setSmooth(true);
        }
      };

      socket.on("get-message", handleSmooth);

      return () => {
        socket.off("get-message", handleSmooth);
      };
    }
  }, [socket, chatUserId]);

  const groupedMessages = groupByDate(currentChat?.messages || []);
  const groupedEntries = groupedMessages ? Object.entries(groupedMessages) : [];

  return (
    <div
      ref={messagesContainerRef}
      className={`overflow-y-auto hidden-scroll w-11/12 h-full my-8 flex flex-col gap-4 ${
        smooth ? "scroll-smooth" : ""
      }`}
    >
      {groupedEntries.length > 0 ? (
        groupedEntries.map(([date, messages]) => (
          <div key={date} className="flex flex-col gap-4">
            <span className="w-full font-bold text-center opacity-50">
              {date}
            </span>
            {messages.length > 0
              ? messages.map((message) => (
                  <Message key={message.message_id} message={message} />
                ))
              : null}
          </div>
        ))
      ) : (
        <NoMessages />
      )}
    </div>
  );
}

export default Messages;
