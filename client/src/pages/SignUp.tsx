import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "api/auth.api";
import AuthLayout from "components/auth/AuthLayout";
import AuthForm from "components/auth/AuthForm";
import AuthInput from "components/auth/AuthInput";

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const handleSignUp = async () => {
    if (username.trim() && password.trim() && password === confirmPassword) {
      if (username.includes(" ")) {
        setError("username", { message: "Username cannot contain spaces." });
      } else {
        setSigningUp(true);
        signUp(username.toLocaleLowerCase(), password)
          .then(() => navigate("/sign-in"))
          .catch((error) => {
            console.log(error);
            setError("username", { message: error.message });
          })
          .finally(() => setSigningUp(false));
      }
    } else {
      if (username === "") {
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
      } else if (confirmPassword === "") {
        setError(
          "confirmPassword",
          { message: "Confirm password cannot be empty." },
          { shouldFocus: true }
        );
      } else if (password !== confirmPassword) {
        setError(
          "password",
          { message: "Passwords don't match." },
          { shouldFocus: true }
        );
      }
    }
  };

  return (
    <AuthLayout title="Sign up">
      <AuthForm
        view="sign up"
        onSubmit={handleSubmit(handleSignUp)}
        error={errors.username || errors.password || errors.confirmPassword}
        button={{
          disabled: signingUp,
          value: signingUp ? "Signing up..." : "Sign up",
        }}
      >
        <AuthInput
          {...register("username")}
          type="text"
          value={username}
          maxLength={30}
          autoFocus
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
        />
        <AuthInput
          {...register("password")}
          type="password"
          value={password}
          maxLength={20}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
        />
        <AuthInput
          {...register("confirmPassword")}
          type="password"
          value={confirmPassword}
          maxLength={20}
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={
            !!errors.confirmPassword ||
            errors.password?.message?.toString().includes("match")
          }
        />
      </AuthForm>
    </AuthLayout>
  );
}

export default SignUp;
