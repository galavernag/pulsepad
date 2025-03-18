"use server";

import { db } from "@/lib/firebase";
import { Sound } from "@/types";
import { ref, set } from "firebase/database";

export async function playSound(sound: Sound, soundboardId: string) {
  try {
    const userRef = ref(db, `embed/${soundboardId}`);
    await set(userRef, {
      toPlay: sound,
      playing: true,
    });
    return true;
  } catch (error) {
    return false;
  }
}
