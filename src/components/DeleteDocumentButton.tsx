import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";

export default function DeleteDocumentButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, startTransition] = useTransition();
  const route = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const { success } = await deleteDocument(id);
      if (success) {
        setIsOpen(false);
        route.replace("/");
        toast.success("Documento deletado com sucesso!");
      } else {
        toast.error("Ocorreu um erro ao deletar o documento");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="bg-red-500 text-white">Deletar</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja deletar este documento?
          </DialogTitle>
          <DialogDescription>
            Esta ação é irreversível e todos os dados serão perdidos.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white"
          >
            {isDeleting ? "Deletando..." : "Deletar"}
          </Button>
          <DialogClose>
            <Button className="text-gray-700 bg-white hover:text-white">
              Voltar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
