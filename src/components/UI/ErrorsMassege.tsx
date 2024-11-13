interface Iprop {
  msg: string;
}
export default function ErrorsMassege({ msg }: Iprop) {
  return msg ? (
    <span className="text-red-700 font-bold text-sm block mt-1">{msg}</span>
  ) : null;
}
