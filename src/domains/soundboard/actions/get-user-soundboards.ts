"use server";

import { firestore } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, Timestamp } from "firebase/firestore";

export async function getUserSoundboard() {
  try {
    const { userId } = await auth();

    const q = query(collection(firestore, "users", userId!, "soundboards"));
    const snapshot = await getDocs(q);

    return new Map(
      snapshot.docs.map((doc) => {
        return [
          doc.id,
          {
            id: doc.id,
            name: doc.data().name,
            createdAt: (doc.data().createdAt as Timestamp)
              .toDate()
              .toISOString(),
            sounds: doc.data().sounds,
          },
        ];
      })
    );
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    return false;
  }
}
