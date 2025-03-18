"use client";
import { deleteSoundboard } from "@/domains/soundboard/actions/delete-soundboard";
import { updateSoundboard } from "@/domains/soundboard/actions/update-soundboard";
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
import { Settings2 } from "lucide-react";
import { FormEvent, useState } from "react";

export function SettingsDialog({ id }: { id: string }) {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false);
  async function handleCreateSoundboard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name) {
      await updateSoundboard({ name }, id);
    }

    setOpen(false);
  }

  async function handleDeleteSoundboard() {
    await deleteSoundboard(id);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings2 className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-syne">Manage soundboard</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <h3 className="font-syne font-medium">Update information</h3>
          <form onSubmit={handleCreateSoundboard}>
            <div className="flex items-center gap-10">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Twitch Livestream"
              />
            </div>
            <div className="w-full flex items-center gap-2 mt-3">
              <Button
                type="button"
                variant="destructive"
                className="w-1/2 cursor-pointer"
                onClick={handleDeleteSoundboard}
              >
                Delete
              </Button>
              <Button type="submit" className="w-1/2 cursor-pointer">
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
