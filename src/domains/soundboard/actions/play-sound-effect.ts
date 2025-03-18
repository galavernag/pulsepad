"use server";

import { db } from "@/shared/lib/firebase";
import { ref, set } from "firebase/database";
import { Sound } from "../types";

export async function playSoundEffect(sound: Sound, soundboardId: string) {
  try {
    const userRef = ref(db, `embed/${soundboardId}`);
    await set(userRef, {
      toPlay: sound,
      playing: true,
    });
    return true;
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    return false;
  }
}
