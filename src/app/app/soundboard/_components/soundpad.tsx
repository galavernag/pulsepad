"use client";
import { Button } from "@/components/ui/button";
import { Soundboard } from "@/types";
import { Music, PlayIcon, PlusCircle } from "lucide-react";

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
    <div className="grid grid-cols-6 gap-5 mt-7">
      {soundboard.sounds.map((sound) => (
        <div
          key={sound.id}
          className="p-3 border rounded-lg flex flex-col items-center justify-center h-40 hover:bg-secondary/50 transition-colors"
        >
          <Button variant="ghost" className="w-full h-full flex flex-col gap-2">
            <PlayIcon className="h-8 w-8" />
            <h3 className="font-medium">{sound.name}</h3>
          </Button>
        </div>
      ))}
    </div>
  );
}
