import {
  Timestamp,
  arrayUnion,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { runTransaction, doc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import Video from "../../../models/Video";

export const createVideo = async (
  videoTitle: string,
  videoDescription: string,
  videoLink: string,
  videoThumbnail: string,
  myChannelLink: string
): Promise<Video | undefined> => {
  const user = auth.currentUser;
  if (user) {
    const channelDetail = doc(db, "channels", myChannelLink);
    const docSnap = await getDoc(channelDetail);
    if (docSnap.exists()) {
      const fetchedChannelName = docSnap.data().channelName;
      const fetchedChannelImage = docSnap.data().channelImage;
      const fetchedChannelSubscribers = docSnap.data().Subscribers;
      const docRef = doc(collection(db, "videos"));

      await runTransaction(db, async (transaction) => {
        transaction.set(docRef, {
          views: 0,
          videosId: docRef.id,
          user_id: user.uid,
          publishDate: serverTimestamp(),
          channel_id: myChannelLink,
          channel: {
            channelName: fetchedChannelName,
            channelImage: fetchedChannelImage,
            subscribers: fetchedChannelSubscribers,
          },
          description: videoDescription,
          title: videoTitle,
          videoLink: videoLink,
          videoThumbnail: videoThumbnail,
        });

        const userMetaRef = doc(db, "channels", myChannelLink);
        transaction.update(userMetaRef, {
          videos: arrayUnion(docRef.id),
        });
      });

      return {
        views: 0,
        videosId: docRef.id,
        user_id: user.uid,
        publishDate: serverTimestamp() as Timestamp,
        channel_id: myChannelLink,
        channel: {
          channelName: fetchedChannelName,
          channelImage: fetchedChannelImage,
          subscribers: fetchedChannelSubscribers,
        },
        description: videoDescription,
        title: videoTitle,
        videoLink: videoLink,
        videoThumbnail: videoThumbnail,
      };
    }
  } else {
    console.error("Please Login First");
  }
};
