import { IUser } from "types";

export const checkUserOnline = (usersOnline: IUser[], userId: number) => {
  const user = usersOnline.find((user) => user.user_id === userId);

  return !!user?.socket_id;
};
