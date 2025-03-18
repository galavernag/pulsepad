"use client";
import { createSoundboard } from "@/domains/soundboard/actions/create-soundboard";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { PlusCircle } from "lucide-react";
import { FormEvent, useState } from "react";

export function CreateSoundboardDialog() {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false);
  async function handleCreateSoundboard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name) {
      await createSoundboard(name);
    }

    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle />
          Create new soundboard
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-syne">Create new soundboard</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Label htmlFor="name">Soundboard name</Label>
          <form onSubmit={handleCreateSoundboard}>
            <div className="flex items-center gap-3">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Twitch Livestream"
              />
              <Button type="submit" variant="default" size="icon">
                <PlusCircle />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
