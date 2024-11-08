import { ChangeEventHandler, HTMLInputTypeAttribute, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register?: UseFormRegisterReturn<string>;
  name?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  maxLength?: number;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, Props>(function AuthInput(
  {
    register,
    name,
    type,
    value,
    maxLength,
    autoFocus,
    placeholder,
    onChange,
    error,
  },
  ref
) {
  return (
    <input
      {...register}
      ref={ref}
      name={name}
      type={type}
      value={value}
      maxLength={maxLength}
      autoFocus={autoFocus}
      autoComplete="on"
      placeholder={placeholder}
      onChange={onChange}
      className={`p-4 bg-[#3e404b] rounded border focus:outline-0 placeholder-gray-400 ${
        error ? "border-red-600" : "border-transparent"
      }`}
    />
  );
});

export default AuthInput;
