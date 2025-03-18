"use client";
import { Button } from "@/components/ui/button";
import { playSoundEffect } from "@/domains/soundboard/actions/play-sound-effect";
import { Soundboard } from "@/domains/soundboard/types";
import { Music, PlayIcon } from "lucide-react";

export function Soundpad(soundboard: Soundboard) {
  if (soundboard.sounds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-secondary/25 rounded-lg p-4 mt-32 h-40 max-w-xs gap-3 border border-secondary/35">
          <Music className="h-8 w-8" />
          <h3 className="font-medium">No sounds found</h3>
          <p className="text-sm text-muted-foreground">
            Add some sounds to this soundboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-7">
      {soundboard.sounds.map((sound, idx) => (
        <div
          key={idx}
          className="p-3 border rounded-lg flex flex-col items-center justify-center h-40 hover:bg-secondary/50 focus-within:border-lime-500 transition-colors cursor-pointer"
        >
          <Button
            variant="ghost"
            className="w-full h-full curosr-pointer"
            onClick={() => playSoundEffect(sound, soundboard.id)}
          >
            <div className="flex flex-col items-center gap-2">
              <PlayIcon className="h-8 w-8" />
              <span className="font-medium text-center text-sm max-w-[200px] truncate">
                {sound.name}
              </span>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
}
