"use server";

import { firestore } from "@/shared/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { doc, updateDoc } from "firebase/firestore";
import { Soundboard } from "../types";

export async function updateSoundboard(
  data: Pick<Soundboard, "name">,
  id: string
) {
  const { userId } = await auth();
  const soundboardRef = doc(firestore, "users", userId!, "soundboards", id);
  await updateDoc(soundboardRef, data);
}
