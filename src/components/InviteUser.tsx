import { inviteUserToDocument } from "@/actions/actions";
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
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function InviteUser({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");

  // const route = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const { success } = await inviteUserToDocument(id, email);
      if (success) {
        setEmail("");
        setIsOpen(false);
        toast.success("Convite enviado com sucesso!");
      } else {
        toast.error("Ocorreu um erro ao enviar o convite");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline">Convite</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Convide um usuário para editar este documento
          </DialogTitle>
          <DialogDescription>
            O usuário convidado terá acesso total ao documento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email do convidado"
          />

          <div className="flex justify-end gap-2 mt-2">
            <Button type="submit" disabled={!email || isPending}>
              {isPending ? "Enviando..." : "Enviar"}
            </Button>
            <DialogClose>
              <Button variant="outline">Voltar</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
