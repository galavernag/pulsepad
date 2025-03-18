"use server";
import { firestore } from "@/lib/firebase";
import { Soundboards } from "@/types";
import { auth } from "@clerk/nextjs/server";
import * as db from "firebase/firestore";

export async function getSoundboards(): Promise<Soundboards> {
  const { userId } = await auth();

  const q = db.query(db.collection(firestore, "users", userId!, "soundboards"));
  const snapshot = await db.getDocs(q);

  return new Map(
    snapshot.docs.map((doc) => {
      return [
        doc.id,
        {
          id: doc.id,
          name: doc.data().name,
          createdAt: (doc.data().createdAt as db.Timestamp)
            .toDate()
            .toISOString(),
          sounds: doc.data().sounds,
        },
      ];
    })
  );
}
