import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";

export const updateVideo = async (
  videoTitle: string,
  videoDescription: string,
  videoLink: string,
  videoThumbnail: string,
  videosId: string
) => {
  const user = auth.currentUser;
  if (user) {
    console.log("sjnsdjansdjasndjsndj");
    const videosCollectionRef = doc(db, "videos", videosId);
    await updateDoc(videosCollectionRef, {
      videoThumbnail: videoThumbnail,
      videoLink: videoLink,
      title: videoTitle,
      description: videoDescription,
    });
  } else {
    console.error("Please Login First");
  }
};
