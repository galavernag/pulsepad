"use server";

import { firestore } from "@/lib/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Sound } from "../types";

export async function addSoundEffect(sound: Sound, soundboardId: string) {
  try {
    const soundboardRef = doc(
      firestore,
      "users",
      soundboardId,
      "soundboards",
      soundboardId
    );
    await updateDoc(soundboardRef, {
      sounds: arrayUnion(sound),
    });
    return true;
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    return false;
  }
}
