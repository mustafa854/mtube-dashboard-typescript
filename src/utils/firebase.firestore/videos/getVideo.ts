import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const getVideo = async (videosId: string | undefined) => {
  if (videosId) {
    const videosRef = doc(db, "videos", videosId);
    const response = await getDoc(videosRef);
    console.log("andar hu mein");
    return response.data();
  }
};
