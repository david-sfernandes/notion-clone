import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

export default function SidebarItem({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = pathname.includes(id);

  if (!data) return null;

  return (
    <Link
      href={`/doc/${id}`}
      className={`menu-item ${isActive && "active-menu-item"}`}
    >
      {data.title}
    </Link>
  );
}
