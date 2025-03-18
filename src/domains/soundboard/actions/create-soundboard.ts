"use server";

import { firestore } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

export async function createSoundboard(name: string) {
  try {
    const { userId } = await auth();
    const soundboardCollectionRef = collection(
      firestore,
      "users",
      userId!,
      "soundboards"
    );
    const newSoundboardRef = doc(soundboardCollectionRef, crypto.randomUUID());

    await setDoc(newSoundboardRef, {
      name,
      createdAt: Timestamp.now(),
      sounds: [],
    });

    return true;
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    return false;
  }
}
