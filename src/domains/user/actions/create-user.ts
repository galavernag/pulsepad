import { firestore } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
interface UserCreateParams {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export function createUser(user: UserCreateParams) {
  try {
    const userRef = doc(firestore, "users", user.id);
    const soundboardCollectionRef = collection(
      firestore,
      "users",
      user.id,
      "soundboards"
    );
    const newSoundboardRef = doc(soundboardCollectionRef, crypto.randomUUID());

    // Check if user already exists, if not, create
    async function checkIfUserExistsAndCreate() {
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      }
    }

    // Create a new soundboard for user
    async function createSoundboard() {
      await setDoc(newSoundboardRef, {
        name: "Soundboard 1",
        createdAt: Timestamp.now(),
        sounds: [],
      });
    }

    return Promise.all([checkIfUserExistsAndCreate(), createSoundboard()]);
  } catch (error) {
    // TODO: Handle error
    console.error(error);
    return false;
  }
}
