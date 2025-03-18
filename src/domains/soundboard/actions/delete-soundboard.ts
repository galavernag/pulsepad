"use server";

import { firestore } from "@/shared/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteSoundboard(id: string) {
  try {
    const soundboardRef = doc(firestore, "users", id, "soundboards", id);

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
