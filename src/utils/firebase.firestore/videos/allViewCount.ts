import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";

export const allViewCount = async (): Promise<number> => {
  let output = 0;
  const user = auth.currentUser;

  if (user) {
    const videosCollectionRef = collection(db, "videos");
    const q = query(videosCollectionRef, where("user_id", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((element) => {
      output = output + Number(element.data().views);
    });
  }

  return output;
};
