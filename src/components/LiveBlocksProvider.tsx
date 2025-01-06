"use client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { PropsWithChildren } from "react";

export default function LiveBlocksProvider({ children }: PropsWithChildren) {
  const publicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || "";
  if (!publicKey) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
  }

  return (
    <LiveblocksProvider
      authEndpoint={'/auth-endpoint'}
      throttle={16}
    >
      {children}
    </LiveblocksProvider>
  );
}
