import { IChat } from "types";

export const sortByDate = (data: IChat[]) => {
  return data.sort((a, b) => {
    const dateA: number = new Date(a.last_message_created_at).getTime();
    const dateB: number = new Date(b.last_message_created_at).getTime();

    return dateB - dateA;
  });
};
