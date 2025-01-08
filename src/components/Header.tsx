"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import MenuOptions from "./MenuOptions";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex justify-between items-center p-2">
      <div className="flex justify-center gap-2 my-auto">
        <div className="md:hidden block">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="size-6 hover:opacity-30 rounded-lg" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-2">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
                <SheetDescription>
                  <MenuOptions />
                </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
        <h1 className="font-semibold">My Notes</h1>
      </div>

      <Breadcrumbs />

      <div className="flex items-center gap-2">
        {user && (
          <p className="text-sm font-medium text-zinc-700 capitalize">Olá {user?.firstName}</p>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
