import { AppError } from "@/errors/app-error";
import { firestore } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

interface UserCreateParams {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function create(user: UserCreateParams) {
  try {
    const userRef = doc(firestore, "users", user.id);
    const soundboardCollectionRef = collection(
      firestore,
      "users",
      user.id,
      "soundboards"
    );
    const newSoundboardRef = doc(soundboardCollectionRef, crypto.randomUUID());

    // Verificamos se o usuário já existe
    const createUser = async () => {
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      }
    };

    // Criamos o soundboard
    const createSoundboard = async () => {
      await setDoc(newSoundboardRef, {
        name: "Soundboard 1",
        createdAt: Timestamp.now(),
        sounds: [],
      });
    };

    return Promise.all([createUser(), createSoundboard()]);
  } catch (error) {
    console.error(error);
    throw new AppError("UserCreate", "Error creating user.");
  }
}
