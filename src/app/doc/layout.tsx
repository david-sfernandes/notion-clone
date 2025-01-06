import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}
