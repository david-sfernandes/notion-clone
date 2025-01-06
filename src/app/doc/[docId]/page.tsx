import Document from "@/components/Document";

type DocPageProps = { params: { docId: string } };

export default function DocPage({ params: { docId } }: DocPageProps) {
  return (
    <div>
      <Document id={docId} />
    </div>
  );
}
