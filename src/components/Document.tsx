"use client";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTrasition] = useTransition();

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
    <section className="flex flex-col flex-1 *:flex-1 *:w-full max-w-4xl justify-center mx-auto pt-2">
      <form className="flex items-center space-x-2" onSubmit={updateTitle}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button disabled={isUpdating} type="submit">
          Update
        </Button>
      </form>

      <div></div>

      <div></div>
    </section>
  );
}