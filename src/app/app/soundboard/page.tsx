import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { LinkIcon, Settings2 } from "lucide-react";
import { Soundpad } from "./_components/soundpad";
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
  const soundboards = await user.getSoundboards();

  const { soundboard } = await searchParams;

  let selectedSoundboardId: string | undefined = soundboard;
  let selectedSoundboard: Soundboard | undefined; // Permitir que selectedSoundboard seja undefined inicialmente

  if (selectedSoundboardId && soundboards.has(selectedSoundboardId)) {
    selectedSoundboard = soundboards.get(selectedSoundboardId)!;
  } else {
    const firstEntry = Array.from(soundboards.entries())[0];
    if (firstEntry) {
      selectedSoundboardId = firstEntry[0];
      selectedSoundboard = firstEntry[1]!;
    } else {
      // Caso não haja nenhum soundboard
      selectedSoundboardId = undefined;
      selectedSoundboard = undefined;
    }
  }

  return (
    <main>
      <Header />
      <section className="p-5">
        <header className="flex items-center justify-between">
          <SoundboardSwitcher
            soundboards={soundboards}
            defaultSoundboardId={selectedSoundboardId!}
          />

          <div className="flex gap-3">
            {selectedSoundboardId && (
              <AddSoundEffectDialog soundboardId={selectedSoundboardId} />
            )}

            <Button variant="outline" asChild>
              <Link
                href={`/app/embed/${selectedSoundboardId}`}
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
          {selectedSoundboard ? (
            <Soundpad {...selectedSoundboard} />
          ) : (
            <p>Você ainda não possui nenhum soundboard. Crie um!</p>
          )}
        </section>
      </section>
    </main>
  );
}
