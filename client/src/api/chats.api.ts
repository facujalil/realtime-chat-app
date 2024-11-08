import { SERVER_URL } from "config";

export const getPreviousChats = async (userId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${SERVER_URL}/api/chats/previous-chats/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong.");
  }

  const data = await res.json();
  return data;
};

export const getChatMessages = async (userId: number, receiverId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${SERVER_URL}/api/chats/chat-messages/${userId}/${receiverId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong.");
  }

  const data = await res.json();
  return data;
};

export const removeChat = async (userId: number, receiverId: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${SERVER_URL}/api/chats/remove-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      user_id: userId,
      receiver_id: receiverId,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong.");
  }
};
