import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

export const userLogin = async () => {
  await signInWithPopup(auth, provider);
};
