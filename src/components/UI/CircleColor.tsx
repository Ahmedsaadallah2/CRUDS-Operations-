import { DOMAttributes } from "react";

interface Iprop extends DOMAttributes<HTMLSpanElement> {
  color: string;
}
export default function CircleColor({ color, ...rest }: Iprop) {
  return (
    <span
      className="w-6 h-6 rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
}
