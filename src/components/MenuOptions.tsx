"use client";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  query,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import NewDocumentButton from "./NewDocumentButton";
import SidebarItem from "./SidebarItem";

export default function MenuOptions() {
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

  return (
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
  )
}