"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">

      <h1 className="text-xl font-bold">
        FavourIT
      </h1>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="ghost">Home</Button>
        </Link>

        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>

        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>

    </nav>
  );
}