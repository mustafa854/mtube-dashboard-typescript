import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import Channel from "../../../models/Channel";

export const getCurrentUserChannel = async (): Promise<Channel | undefined> => {
  const user = auth.currentUser;
  let output: Channel[] = [];
  if (user) {
    const channelsDocRef = query(
      collection(db, "channels"),
      where("user_id", "==", user.uid)
    );
    const channelDoc = await getDocs(channelsDocRef);
    channelDoc.forEach((element) => {
      let channelData = element.data();
      const channel: Channel = {
        Subscribers: channelData.Subscribers,
        channelAbout: channelData.channelAbout,
        channelCover: channelData.channelCover,
        channelImage: channelData.channelImage,
        channelName: channelData.channelName,
        channelsId: channelData.channelsId,
        createdAt: channelData.createdAt,
        user_id: channelData.user_id,
        videos: channelData.videos,
      };
      output.push(channel);
    });
  }
  return output[0];
};
