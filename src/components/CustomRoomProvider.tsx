import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { PropsWithChildren } from "react";
import LiveCursorProvider from "./LiveCursorProvider";
import Loading from "./Loading";

type CustomRoomProviderProps = PropsWithChildren & {
  roomId: string;
};

export default function CustomRoomProvider({
  children,
  roomId,
}: CustomRoomProviderProps) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProvider>
  );
}
