import { IMessage } from "types";
import { formatDate } from "./formatDate";

export const groupByDate = (
  messages: IMessage[]
): { [date: string]: IMessage[] } | undefined => {
  if (messages) {
    return messages.reduce(
      (accumulator: { [date: string]: IMessage[] }, message) => {
        const date = formatDate(message.created_at);
        if (!accumulator[date]) {
          accumulator[date] = [];
        }
        accumulator[date].push(message);

        return accumulator;
      },
      {}
    );
  }
};
