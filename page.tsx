"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to TimeLoop </h1>
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Hello, {session.user?.name} 
      </h1>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
      >
        Sign out
      </button>
    </div>
  );
}
