"use server";

import { firestore } from "@/shared/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteSoundboard(id: string) {
  try {
    const { userId } = await auth();
    const soundboardRef = doc(firestore, "users", userId!, "soundboards", id);

    if (!soundboardRef) {
      return false;
    }

    await deleteDoc(soundboardRef);
    return true;
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    return false;
  }
}
