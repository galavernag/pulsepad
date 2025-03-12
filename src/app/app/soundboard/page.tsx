import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { LinkIcon, PlusCircleIcon, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Soundpad } from "./_components/soundpad";

export default function SoundboardPage() {
  return (
    <main>
      <Header />

      <section className="p-5">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-syne font-medium">Soundboard</h2>

          <div className="flex gap-3">
            <Button variant="outline">
              <PlusCircleIcon />
              Add new sound
            </Button>

            <Button variant="outline" asChild>
              <Link
                href="/app/embed/1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon />
                Open embed
              </Link>
            </Button>

            <Button variant="outline">
              <Settings2 />
              Settings
            </Button>
          </div>
        </header>

        <Soundpad />
      </section>
    </main>
  );
}
