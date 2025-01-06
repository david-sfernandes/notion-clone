import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "sonner";
import { removeUserFromDocument } from "@/actions/actions";

export default function ManageUsers({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", id))
  );

  const handleDeleteUser = (userId: string) => {
    startTransition(async () => {
      if (!id || userId) return;
      const { success } = await removeUserFromDocument(id, userId);

      if (success) {
        toast.success("Usuário removido com sucesso");
      } else {
        toast.error("Erro ao remover usuário");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline">Usuários</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuários com acesso a este documento</DialogTitle>
          <DialogDescription>
            Gerencie os usuários que podem editar este documento.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-1">
          <p className="text-sm font-medium">
            Usuários com acesso: {usersInRoom?.size}
          </p>
          <ul className="w-full space-y-2">
            {usersInRoom?.docs.map((doc) => (
              <li key={doc.id} className="flex items-center space-x-2 w-full">
                <p className="min-w-48">{doc.data().userId}</p>
                <p className="text-gray-600 px-2">{doc.data().role}</p>
                <Button
                  onClick={() => handleDeleteUser(doc.id)}
                  className="text-red-500 !ml-auto hover:bg-red-100/80 hover:text-red-500"
                  variant="outline"
                  disabled={isPending}
                >
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
