import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { LinkIcon, PlusCircleIcon, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
