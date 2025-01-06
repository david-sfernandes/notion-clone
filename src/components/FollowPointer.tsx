import stringToColor from "@/lib/stringToColor";
import { MousePointer2Icon } from "lucide-react";
import { motion as m } from "motion/react";

type FollowPointerProps = {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
};

export default function FollowPointer({ x, y, info }: FollowPointerProps) {
  const color = stringToColor(info.email || "1");

  return (
    <m.div
      style={{ top: y, left: x, pointerEvents: "none", position: "absolute" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <MousePointer2Icon
        className="size-6 z-50"
        style={{ color, fill: color }}
      />
      <p
        className="rounded text-xs px-1 ml-1 py-[2px] text-black/90 whitespace-nowrap 
        absolute z-50 w-fit max-w-[80px] truncate overflow-clip"
        style={{ backgroundColor: color }}
      >
        {info.name}
      </p>
    </m.div>
  );
}
