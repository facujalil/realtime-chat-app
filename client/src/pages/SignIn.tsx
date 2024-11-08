import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signIn } from "api/auth.api";
import { setToken } from "store/usersSlice";
import AuthLayout from "components/auth/AuthLayout";
import AuthForm from "components/auth/AuthForm";
import AuthInput from "components/auth/AuthInput";

function SignIn() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (username.trim() && password.trim()) {
      if (username.includes(" ")) {
        setError(
          "username",
          { message: "Username cannot contain spaces." },
          { shouldFocus: true }
        );
      } else {
        setSigningIn(true);
        signIn(username.toLocaleLowerCase(), password)
          .then((data) => {
            dispatch(setToken(data.token));
          })
          .catch((error) => {
            console.log(error);
            setError(
              "username",
              {
                message: "Incorrect username or password.",
              },
              { shouldFocus: true }
            );
          })
          .finally(() => setSigningIn(false));
      }
    } else if (username === "") {
      setError(
        "username",
        { message: "Username cannot be empty." },
        { shouldFocus: true }
      );
    } else if (password === "") {
      setError(
        "password",
        { message: "Password cannot be empty." },
        { shouldFocus: true }
      );
    }
  };

  return (
    <AuthLayout title="Sign in">
      <AuthForm
        view="sign in"
        onSubmit={handleSubmit(handleSignIn)}
        error={errors.username || errors.password}
        button={{
          disabled: signingIn,
          value: signingIn ? "Signing in..." : "Sign in",
        }}
      >
        <AuthInput
          {...register("username")}
          name="username"
          type="name"
          value={username}
          maxLength={30}
          autoFocus
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
        />
        <AuthInput
          {...register("password")}
          name="password"
          type="password"
          value={password}
          maxLength={20}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          error={
            !!errors.password ||
            errors.username?.message?.toString().includes("password")
          }
        />
      </AuthForm>
    </AuthLayout>
  );
}

export default SignIn;
