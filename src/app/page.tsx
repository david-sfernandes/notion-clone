import NewDocumentButton from "@/components/NewDocumentButton";

export default function Home() {
  return (
    <div className="px-3 py-4 ">
      <h3 className="text-lg font-medium">
        Faça o ligin e crie um novo documento para começar!
      </h3>
      <p className="text-zinc-500 mb-2">Você também pode convidar amigos e colegas para editar os documentos em tempo real com você.</p>
      <NewDocumentButton />
    </div>
  );
}
