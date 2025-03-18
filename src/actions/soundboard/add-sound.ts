"use server";

import { firestore } from "@/lib/firebase";
import { Sound } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

export async function addSound(sound: Sound, soundboardId: string) {
  try {
    const { userId } = await auth();
    const soundboardRef = doc(
      firestore,
      `users/${userId}/soundboards/`,
      soundboardId
    );
    const soundboardDoc = await getDoc(soundboardRef);
    if (!soundboardDoc.exists()) {
      throw new Error("Soundboard not found.");
    }

    await updateDoc(soundboardRef, {
      sounds: arrayUnion({
        id: sound.id || crypto.randomUUID(),
        name: sound.name,
        url: sound.url,
        createdAt: new Date().toISOString(),
      }),
    });
    return true;
  } catch (error) {}
}
