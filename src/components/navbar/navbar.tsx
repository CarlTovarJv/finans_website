import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 bg-white border-b">
      <Link href="/" className="text-3xl font-bold">
        Finans
      </Link>

      <div className="flex items-center gap-4">
        <SignInButton mode="modal" />

        <SignUpButton mode="modal" />

        <UserButton />
      </div>
    </nav>
  );
}