"use client";
import { createFirebaseDocument } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

export default function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createDocument = () => {
    startTransition(async () => {
      const { docId } = await createFirebaseDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button onClick={createDocument} disabled={isPending}>
      {isPending ? "Criando..." : "Criar Documento"}
    </Button>
  );
}
