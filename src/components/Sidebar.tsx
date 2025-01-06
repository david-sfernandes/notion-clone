"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import NewDocumentButton from "./NewDocumentButton";
import SidebarItem from "./SidebarItem";

interface RoomDocument extends DocumentData {
  userId: string;
  role: string;
  createdAt: Date;
  roomId: string;
}

export default function Sidebar() {
  const { user } = useUser();
  const [ownerDocs, setOwnerDocs] = useState<RoomDocument[]>([]);
  const [editorDocs, setEditorDocs] = useState<RoomDocument[]>([]);
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, doc) => {
        const data = doc.data() as RoomDocument;
        if (data.role === "owner") {
          acc.owner.push(data);
        } else if (data.role === "editor") {
          acc.editor.push(data);
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    setOwnerDocs(grouped.owner);
    setEditorDocs(grouped.editor);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      <div className="doc-menu-list">
        {ownerDocs.length > 0 && (
          <>
            <h3>Meus documentos</h3>
            {ownerDocs.map((doc) => (
              <SidebarItem key={doc.roomId} id={doc.roomId} />
            ))}
          </>
        )}
        {editorDocs.length > 0 && (
          <>
            <h3>Compartilhados Comigo</h3>
            {editorDocs.map((doc) => (
              <SidebarItem key={doc.roomId} id={doc.roomId} />
            ))}
          </>
        )}
        {ownerDocs.length === 0 && editorDocs.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum documento encontrado</p>
        )}
      </div>
    </>
  );

  return (
    <aside className="flex w-fit md:w-64 h-screen p-2 md:p-5 bg-gray-50 relative text-gray-400 border-r">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="size-6 hover:opacity-30 rounded-lg" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{/* Options */}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block">{menuOptions}</div>
    </aside>
  );
}
