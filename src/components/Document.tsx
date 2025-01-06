"use client";
import useOwner from "@/hooks/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import DeleteDocumentButton from "./DeleteDocumentButton";
import Editor from "./Editor";
import InviteUser from "./InviteUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

export default function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTrasition] = useTransition();
  const isOwner = useOwner();

  const updateTitle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === data?.title && input.trim() !== "") return;
    startTrasition(async () => {
      await updateDoc(doc(db, "documents", id), { title: input });
    });
  };

  useEffect(() => {
    setInput(data?.title);
  }, [data]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section className="flex flex-col flex-1 *:w-full max-w-4xl mx-auto p-2 min-h-screen items-start space-y-2 bg-white rounded">
      <form className="flex items-center space-x-2" onSubmit={updateTitle}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button disabled={isUpdating} type="submit">
          Update
        </Button>
      </form>

      <div>
        {isOwner && (
          <>
            <InviteUser id={id} />
            <DeleteDocumentButton id={id} />
            <ManageUsers id={id} />
          </>
        )}
        <Avatars />
      </div>

      <div>
        <Editor />
      </div>
    </section>
  );
}
