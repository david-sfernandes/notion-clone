import { Liveblocks } from "@liveblocks/node";

const secret = process.env.LIVEBLOCKS_PRIVATE_KEY;

if (!secret) {
  throw new Error("Missing LIVEBLOCKS_PRIVATE_KEY environment variable");
}

const liveblocks = new Liveblocks({ secret });
export default liveblocks;
