"use client";

import { useMyPresence, useOthers } from "@liveblocks/react";
import { PropsWithChildren } from "react";
import FollowPointer from "./FollowPointer";

type LiveCursorProviderProps = PropsWithChildren;

export default function LiveCursorProvider({
  children,
}: LiveCursorProviderProps) {
  const [myPresence, setMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(event: React.PointerEvent) {
    const cursor = { x: Math.floor(event.pageX), y: Math.floor(event.pageY) };
    setMyPresence({ cursor });
  }

  function handlePointerLeave() {
    setMyPresence({
      cursor: null,
    });
  }

  return (
    <div className="w-full h-full overflow-x-hidden" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {children}
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
    </div>
  );
}
