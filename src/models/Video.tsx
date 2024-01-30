import { Timestamp } from "firebase/firestore";

export default interface Video {
  channel: {
    channelImage: string;
    channelName: string;
    subscribers: string;
  };
  channel_id: string;
  description: string;
  publishDate: Timestamp;
  title: string;
  user_id: string;
  videoLink: string;
  videoThumbnail: string;
  videosId: string;
  views: number;
}
