import stringToColor from "@/app/utils/stringToColor";
import { PointerIcon } from "lucide-react";
import { motion as m, AnimatePresence, useMotionValue } from "motion/react";

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
      style={{ top: x, left: y, pointerEvents: "none" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <PointerIcon
        className="size-4 rounded-full absolute z-50"
        style={{ color }}
      />
      <p
        className="rounded p-1 text-sx text-white whitespace-nowrap absolute z-50 min-w-fit" 
        style={{ backgroundColor: color }}
      >
        {info.name}
      </p>
    </m.div>
  );
}
