import { SERVER_URL } from "config";

export const getUser = async (userId: number) => {
  const res = await fetch(`${SERVER_URL}/api/users/user/${userId}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong.");
  }

  const data = await res.json();
  return data;
};
