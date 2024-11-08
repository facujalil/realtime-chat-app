import { FormEventHandler, ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { Link } from "react-router-dom";

interface Props {
  view: "sign in" | "sign up";
  onSubmit: FormEventHandler<HTMLFormElement>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  button: {
    disabled: boolean;
    value: string;
  };
  children: ReactNode;
}

function AuthForm({ view, onSubmit, error, button, children }: Props) {
  return (
    <form className="w-full flex flex-col gap-3" onSubmit={onSubmit}>
      {children}
      <div className="w-full flex flex-col gap-2">
        {error ? (
          <div className="flex items-center gap-2 text-red-600">
            <div className="w-4 h-4 flex">
              <i className="fa-solid fa-circle-exclamation"></i>
            </div>
            <p className="text-sm z-10">{error.message?.toString()}</p>
          </div>
        ) : null}
      </div>
      <button
        disabled={button.disabled}
        className="p-4 bg-[#fa541c] rounded transition hover:opacity-90 disabled:opacity-50"
      >
        {button.value}
      </button>
      <p className="text-center">
        {view === "sign in" ? "Not a member? " : "Already a member? "}
        <Link
          className="text-[#fa541c] hover:underline"
          to={view === "sign in" ? "/sign-up" : "/sign-in"}
        >
          {view === "sign in" ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}

export default AuthForm;
