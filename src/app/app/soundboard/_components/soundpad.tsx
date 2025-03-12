"use client";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

// Sample sound data - in a real app this would come from a database or API
const soundData = [
  { id: 1, name: "Applause", url: "/sounds/applause.mp3" },
  { id: 2, name: "Drum Roll", url: "/sounds/drumroll.mp3" },
  { id: 3, name: "Laugh Track", url: "/sounds/laugh.mp3" },
  { id: 4, name: "Airhorn", url: "/sounds/airhorn.mp3" },
  { id: 5, name: "Sad Trombone", url: "/sounds/sadtrombone.mp3" },
  { id: 6, name: "Victory", url: "/sounds/victory.mp3" },
  { id: 7, name: "Suspense", url: "/sounds/suspense.mp3" },
  { id: 8, name: "Explosion", url: "/sounds/explosion.mp3" },
  { id: 9, name: "Beep", url: "/sounds/beep.mp3" },
  { id: 10, name: "Ding", url: "/sounds/ding.mp3" },
  { id: 11, name: "Error", url: "/sounds/error.mp3" },
];

export function Soundpad() {
  return (
    <div className="grid grid-cols-6 gap-5 mt-7">
      {soundData.map((sound) => (
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
