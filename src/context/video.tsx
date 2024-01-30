// VideoProvider.jsx
import React, { ReactNode, useContext, useState } from "react";
import Video from "../models/Video";

interface VideoProviderProps {
  children: ReactNode;
}

interface VideoContextValue {
  videos: Video[] | undefined;
  setVideos: React.Dispatch<React.SetStateAction<Video[] | undefined>>;
}

export const VideoContext = React.createContext<VideoContextValue>({
  videos: undefined,
  setVideos: () => {},
});
export const VideoProvider = ({ children }: VideoProviderProps) => {
  const [videos, setVideos] = useState<Video[] | undefined>(undefined);

  return (
    <VideoContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextValue => {
  return useContext(VideoContext);
};
