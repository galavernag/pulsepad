import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { LinkIcon, PlusCircleIcon, Settings2 } from "lucide-react";
import { Soundpad } from "./_components/soundpad";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
export default async function SoundboardPage() {
  const { userId } = await auth();

  return (
    <main>
      <Header />

      <section className="p-5">
        <header className="flex items-center justify-between">
          <Select defaultValue="soundboard-1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Soundboard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soundboard-1">Soundboard 1</SelectItem>
              <SelectItem value="soundboard-2">Soundboard 2</SelectItem>
              <SelectItem value="soundboard-3">Soundboard 3</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-3">
            <Button variant="outline">
              <PlusCircleIcon />
              Add new sound
            </Button>

            <Button variant="outline" asChild>
              <Link
                href={`/app/embed/${userId}`}
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
