export interface IUser {
  user_id: number;
  username: string;
  avatar_url: string;
  socket_id?: string;
}

export interface IChat extends IUser {
  chat_id: number;
  last_message: string;
  last_message_created_at: string;
}

export interface IMessage {
  message_id: number;
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
  user_avatar: string;
}
