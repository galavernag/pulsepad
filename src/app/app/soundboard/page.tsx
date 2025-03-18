import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { LinkIcon, PlusCircleIcon, Settings2 } from "lucide-react";
import { Soundpad } from "./_components/soundpad";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { user } from "@/actions/user";
import { SoundboardSwitcher } from "./_components/soundboard-switcher";
import { Soundboard } from "@/types";
import { AddSoundEffectDialog } from "./_components/add-sound-dialog";

export default async function SoundboardPage({
  searchParams,
}: {
  searchParams: Promise<{ soundboard: string }>;
}) {
  const { userId } = await auth();
  const soundboards = await user.getSoundboards();

  let { soundboard } = await searchParams;

  let selectedSoundboardId = soundboard;
  let selectedSoundboard: Soundboard;

  if (selectedSoundboardId && soundboards.has(selectedSoundboardId)) {
    selectedSoundboard = soundboards.get(selectedSoundboardId)!;
  } else {
    const firstEntry = Array.from(soundboards.entries())[0];
    selectedSoundboardId = firstEntry[0];
    selectedSoundboard = firstEntry[1]!;
  }
  return (
    <main>
      <Header />
      <section className="p-5">
        <header className="flex items-center justify-between">
          <SoundboardSwitcher
            soundboards={soundboards}
            defaultSoundboardId={selectedSoundboardId}
          />

          <div className="flex gap-3">
            <AddSoundEffectDialog />

            <Button variant="outline" asChild>
              <Link
                href={`/app/embed/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Open embed
              </Link>
            </Button>

            <Button variant="outline">
              <Settings2 className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </header>

        <section className="mt-6">
          <Soundpad {...selectedSoundboard} />
        </section>
      </section>
    </main>
  );
}
