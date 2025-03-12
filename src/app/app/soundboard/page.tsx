import { Button } from "@/components/ui/button";
import { LinkIcon, PlusCircleIcon, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SoundboardPage() {
  return (
    <main>
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
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="font-medium">John Doe</span>
            <span className="text-sm text-muted-foreground">
              john.doe@example.com
            </span>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span>JD</span>
          </div>
        </div>
      </header>

      <section className="p-5">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-syne font-medium">Soundboard</h2>

          <div className="flex gap-3">
            <Button variant="outline">
              <PlusCircleIcon />
              Add new sound
            </Button>

            <Button variant="outline">
              <LinkIcon />
              Open embed
            </Button>

            <Button variant="outline">
              <Settings2 />
              Settings
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-6 gap-5 mt-7">
          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>

          <div className="p-3 border rounded-lg flex flex-col items-center justify-center h-40">
            <h3>Sound 1</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
