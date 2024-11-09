import { InputHTMLAttributes } from "react";
interface Iprop extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...rest }: Iprop) {
  return (
    <input
      type="text"
      className="shadow-md border-gray-300 focus:outline-indigo-500  p-3  rounded-lg border-2"
      {...rest}
    />
  );
}
