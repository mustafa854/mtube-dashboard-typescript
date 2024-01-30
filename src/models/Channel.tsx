export default interface Channel {
  Subscribers: number;
  channelAbout: string;
  channelCover: string;
  channelImage: string;
  channelName: string;
  channelsId: string;
  createdAt: {
    seconds: string;
    nanoseconds: string;
  };
  user_id: string;
  videos: string[];
}
