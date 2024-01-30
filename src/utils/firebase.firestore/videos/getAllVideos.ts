import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import Video from "../../../models/Video";

export const getAllVideos = async () => {
  const user = auth.currentUser;
  if (user) {
    let output: Video[] = [];
    const videosRef = collection(db, "videos");
    const q = query(videosRef, where("user_id", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((element) => {
      const videosData = element.data();
      const videos: Video = {
        channel: videosData.channel,
        channel_id: videosData.channel_id,
        description: videosData.description,
        publishDate: videosData.publishDate,
        title: videosData.title,
        user_id: videosData.user_id,
        videoLink: videosData.videoLink,
        videoThumbnail: videosData.videoThumbnail,
        videosId: videosData.videosId,
        views: videosData.views,
      };
      output.push(videos);
    });

    return output;
  }
};
