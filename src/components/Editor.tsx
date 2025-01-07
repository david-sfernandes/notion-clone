import stringToColor from "@/lib/stringToColor";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useRoom } from "@liveblocks/react";
import { useSelf } from "@liveblocks/react/suspense";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { Button } from "./ui/button";

export default function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!room) return;
    const ydoc = new Y.Doc();
    const provider = new LiveblocksYjsProvider(room, ydoc);
    setDoc(ydoc);
    setProvider(provider);
    return () => {
      ydoc.destroy();
      provider.destroy();
    };
  }, [room]);

  if (!doc || !provider) return null;

  const style = `hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

  return (
    <div className="w-full">
      {/* <div className="flex justify-end items-center gap-2 mb-4">
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <SunIcon className="size-5" />
          ) : (
            <MoonIcon className="size-5" />
          )}
        </Button>
      </div> */}

      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}

type BlockNoteProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: BlockNoteProps) {
  const userInfo = useSelf((me) => me.info);
  const color = stringToColor(userInfo?.email);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color,
      },
    },
  });

  return (
    <div className="relative">
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}
