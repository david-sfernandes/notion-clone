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

  return (
    <header className="flex justify-between items-center p-4 border-b">
      {user && (
        <h1 className="text-xl font-semibold">
          {user?.firstName}
          {"'s"} Space
        </h1>
      )}
      {!user && <h1>Notion Clone</h1>}

      <Breadcrumbs />

      <div>
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
