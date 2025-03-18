"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export function SoundboardSwitcher({
  soundboards,
  defaultSoundboardId,
}: {
  soundboards: Map<string, { id: string; name: string }>;
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
