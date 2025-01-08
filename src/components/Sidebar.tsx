import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import MenuOptions from "./MenuOptions";

export default function Sidebar() {
  return (
    <aside className="w-fit md:w-64 h-screen p-1 pb-2 relative text-gray-400 hidden md:flex">
      <div className="p-1 w-full">
        <MenuOptions />
      </div>
    </aside>
  );
}
