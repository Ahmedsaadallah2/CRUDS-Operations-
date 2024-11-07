import { ReactNode } from "react";

interface Button {
  children: ReactNode;
  className?: string;
  width: "w-full" | "w-fit";
}

export default function Button({
  className,
  width,
  children,
  ...rest
}: Button) {
  return (
    <>
      <button
        className={`${className} ${width} text-white p-2 rounded-md`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
