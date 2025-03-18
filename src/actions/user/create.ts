import { firestore } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

interface UserCreateParams {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function create(user: UserCreateParams) {
  // Check if user document already exists
  const userRef = doc(firestore, "users", user.id);

  if (!userRef) {
    // User document does not exist, create it
    return setDoc(userRef, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  // User document already exists, update it
  return setDoc(userRef, {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
}
