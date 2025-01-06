import CustomRoomProvider from "@/components/CustomRoomProvider";
import { auth } from "@clerk/nextjs/server";
import { RoomProvider } from "@liveblocks/react";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren & {
  params: {
    docId: string;
  };
};

export default function Layout({ children, params: { docId } }: LayoutProps) {
  auth.protect();

  return <CustomRoomProvider roomId={docId}>{children}</CustomRoomProvider>;
}
