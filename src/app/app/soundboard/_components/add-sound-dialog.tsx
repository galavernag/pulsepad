"use client";
import { addSoundEffect } from "@/domains/soundboard/actions/add-sound-effect";
import { Sound } from "@/domains/soundboard/types";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { PlayCircle, PlusCircle, SearchIcon, StopCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export function AddSoundEffectDialog({
  soundboardId,
}: {
  soundboardId: string;
}) {
  const [open, setOpen] = useState(false);
  const [sounds, setSounds] = useState<Sound[] | null>();
  const [currentPlayingSound, setCurrentPlayingSound] =
    useState<HTMLAudioElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(
        new URL("/api/sounds", window.location.href)
      );
      const data = await response.json();
      setSounds(data);
      setIsLoading(false);
    })();
  }, []);

  async function handleSetCurrentPlayingSound(sound: Sound) {
    if (currentPlayingSound) {
      currentPlayingSound.pause();
    }
    const audio = new Audio(sound.url);
    audio.onended = () => {
      setCurrentPlayingSound(null);
    };
    audio.play();
    setCurrentPlayingSound(audio);
  }

  async function handleStopCurrentPlayingSound() {
    if (currentPlayingSound) {
      currentPlayingSound.pause();
      setCurrentPlayingSound(null);
    }
  }

  async function handleSearchSubmit(data: FormData) {
    setIsLoading(true);
    const response = await fetch(
      new URL(`/api/sounds?name=${data.get("search")}`, window.location.href)
    );
    const data2 = await response.json();
    setSounds(data2);
    setIsLoading(false);
  }

  async function handleAddSound(sound: Sound) {
    await addSoundEffect(sound, soundboardId);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Add sound
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add sound</DialogTitle>
          <DialogDescription>
            Select new sound from the list above.
            <br />
            <br />
            Note: If you want to add a custom sound, you can upload it to{" "}
            <Link
              href="https://www.myinstants.com"
              className="underline text-lime-500 font-medium font-syne"
            >
              MyInstants
            </Link>{" "}
            site.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSearchSubmit} className="space-y-3">
          <label htmlFor="search" className="block">
            <h3 className="font-bold font-syne">Search 🔍</h3>
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="search"
              name="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button size="icon">
              <SearchIcon />
            </Button>
          </div>
        </form>

        <div className="flex flex-col items-start gap-3 overflow-y-scroll h-[400px]">
          <h3 className="font-bold font-syne">Trending 🔥</h3>
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            sounds?.map((sound) => (
              <div
                key={sound.id}
                className="flex flex-col text-sm p-2 gap-2 border rounded-lg w-full"
              >
                {sound.name}
                <div className="flex items-center justify-center gap-3 px-2">
                  <Button
                    className="w-1/2"
                    type="button"
                    onClick={() => handleAddSound(sound)}
                  >
                    <PlusCircle size={32} />
                    Add
                  </Button>
                  {currentPlayingSound?.src === sound.url ? (
                    <Button
                      className="w-1/2"
                      variant="destructive"
                      onClick={handleStopCurrentPlayingSound}
                    >
                      <StopCircle size={32} />
                      Stop
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="w-1/2"
                      onClick={() => handleSetCurrentPlayingSound(sound)}
                    >
                      <PlayCircle size={32} />
                      Play
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
