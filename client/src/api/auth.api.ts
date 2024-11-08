import { SERVER_URL } from "config";

export const signUp = async (username: string, password: string) => {
  const res = await fetch(`${SERVER_URL}/api/auth/sign-up`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong.");
  }

  const data = await res.json();
  return data;
};

export const signIn = async (username: string, password: string) => {
  const res = await fetch(`${SERVER_URL}/api/auth/sign-in`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong.");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
};
