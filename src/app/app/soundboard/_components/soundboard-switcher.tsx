"use client";

import { Soundboards } from "@/domains/soundboard/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useRouter } from "next/navigation";

export function SoundboardSwitcher({
  soundboards,
  defaultSoundboardId,
}: {
  soundboards: Soundboards;
  defaultSoundboardId: string;
}) {
  const router = useRouter();

  // Função para lidar com a mudança de soundboard
  const handleSoundboardChange = (soundboardId: string) => {
    // Redirecionar para a mesma página, mas com um query param para o soundboard selecionado
    router.push(`?soundboard=${soundboardId}`);
  };

  return (
    <Select
      defaultValue={defaultSoundboardId}
      onValueChange={handleSoundboardChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Soundboard" />
      </SelectTrigger>
      <SelectContent>
        {Array.from(soundboards).map(([id, soundboard]) => (
          <SelectItem key={id} value={id}>
            {soundboard.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
