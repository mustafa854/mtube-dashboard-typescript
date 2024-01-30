// VideoProvider.jsx
import React, { useContext, useState } from "react";
import { ReactNode } from "react";
import Channel from "../models/Channel";

interface ChannelproviderProp {
  children: ReactNode;
}

interface ChannelContextValue {
  channel: Channel | undefined;
  setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>;
}

export const ChannelContext = React.createContext<
  ChannelContextValue | undefined
>(undefined);

export const ChannelProvider = ({ children }: ChannelproviderProp) => {
  const [channel, setChannel] = useState<Channel | undefined>(undefined);

  return (
    <ChannelContext.Provider value={{ channel, setChannel }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = (): ChannelContextValue => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error("useChannel must be used within a ChannelProvider");
  }
  return context;
};
