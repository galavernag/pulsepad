"use server";

import { firestore } from "@/shared/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Sound } from "../types";

export async function addSoundEffect(sound: Sound, soundboardId: string) {
  const { userId } = await auth();
  try {
    const soundboardRef = doc(
      firestore,
      "users",
      userId!,
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
