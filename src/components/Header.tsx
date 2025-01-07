"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
  const { user } = useUser();
  user?.firstName

  return (
    <header className="flex justify-between items-center p-2 bg-slate-50">
      <h1 className="font-semibold">My Notes</h1>

      <Breadcrumbs />

      <div className="flex items-center gap-2">
        {user && (
          <p className="text-sm font-medium text-zinc-700">Olá {user?.firstName}</p>
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
