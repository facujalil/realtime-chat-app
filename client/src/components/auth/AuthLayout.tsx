import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

function AuthLayout({ title, children }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-5/6 max-w-[28rem] py-12 px-8 bg-[#292b36] rounded">
      <h1 className="font-bold text-[2.5rem]">{title}</h1>
      {children}
    </div>
  );
}

export default AuthLayout;
