"use client";
import Image from "next/image";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function Header() {
  const { user, isLoaded } = useUser();

  return (
    <header className="border-b flex justify-between items-center pr-5">
      <main className="flex flex-col justify-center gap-3 p-5">
        <Image
          src="/logo-pulsepad.svg"
          alt="Pulsepad Logo"
          width={120}
          height={100}
        />

        <section>
          <nav className="flex gap-3 font-syne text-sm">
            <Link href="/app/soundboard">Soundboard</Link>
            <Link href="/app/settings">Settings</Link>
          </nav>
        </section>
      </main>
      {isLoaded ? (
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-medium">{user?.fullName}</span>
            <span className="text-sm text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>
          <UserButton
            appearance={{
              baseTheme: dark,
              elements: {
                userButtonAvatarBox: {
                  width: "30px",
                  height: "30px",
                  borderRadius: "10px",
                  border: "1px solid #222",
                },
                userButtonBox: {
                  scale: "1.2",
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-35 h-4" />
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      )}
    </header>
  );
}
