"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Avatars() {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  return (
    <div className="flex items-center -space-x-3">
      {all.map((user, i) => (
        <TooltipProvider key={`tt-${i}`}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="border hover:z-30">
                <AvatarImage src={user.info.avatar} />
                <AvatarFallback>{user.info.name}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{self.id === user.id ? "Você" : user.info.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
