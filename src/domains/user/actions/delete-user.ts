import { firestore } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteUser(id: string) {
  try {
    // Check if user exists.
    const userRef = doc(firestore, "users", id);

    if (userRef) {
      await deleteDoc(userRef);
    }

    return true;
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    return false;
  }
}
