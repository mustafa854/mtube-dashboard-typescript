import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { auth } from "./config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SideNav from "./components/SideNav";
import Content from "./pages/Content";
import { useVideo } from "./context/video";
import { getAllVideos } from "./utils/firebase.firestore/videos/getAllVideos";
import CreateVideo from "./pages/CreateVideo";
import { useChannel } from "./context/channel";
import UpdateVideo from "./pages/UpdateVideo";
import { allViewCount } from "./utils/firebase.firestore/videos/allViewCount";
import { getCommentCount } from "./utils/firebase.firestore/getCommentCount";
import { getCurrentUserChannel } from "./utils/firebase.firestore/channel/getCurrentuserChannel";
import UserInterface from "./models/User";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [viewCount, setViewCount] = useState<number | undefined>(undefined);
  const [commentCount, setCommentCount] = useState<number | undefined>(
    undefined
  );
  const [userDetails, setUserDetails] = useState<UserInterface>({
    name: undefined,
    email: undefined,
    profilePhoto: "/image/img/profile.jpeg",
    uid: undefined,
  });
  const { channel, setChannel } = useChannel();
  const fetchViewCount = async () => {
    const response: number = await allViewCount();

    setViewCount(response);
  };
  const fetchCommentCount = async () => {
    if (channel) {
      const response = await getCommentCount(channel.videos);
      setCommentCount(response);
    }
  };
  const fetchCurrentUserChannel = async () => {
    const response = await getCurrentUserChannel();
    if (response) {
      setChannel({
        Subscribers: response.Subscribers,
        channelAbout: response.channelAbout,
        channelCover: response.channelCover,
        channelImage: response.channelImage,
        channelName: response.channelName,
        channelsId: response.channelsId,
        createdAt: response.createdAt,
        user_id: response.user_id,
        videos: response.videos,
      });
    }
  };
  const { setVideos } = useVideo();
  useEffect(() => {
    fetchCommentCount();
  }, [channel]);
  const fetchAllVideos = async () => {
    try {
      const response = await getAllVideos();

      setVideos(response);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDetails({
          name: user.displayName ? user.displayName : undefined,
          email: user.email ? user.email : undefined,
          profilePhoto: user.photoURL
            ? user.photoURL
            : "/image/img/profile.jpeg",
          uid: user.uid ? user.uid : undefined,
        });
        setLoggedIn(true);
        fetchCurrentUserChannel();
        fetchAllVideos();
        fetchViewCount();
      } else {
        // User is signed out
        setUserDetails({
          name: undefined,
          email: undefined,
          uid: undefined,
          profilePhoto: "/image/img/profile.jpeg",
        });
      }
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen max-h-screen overflow-auto w-full mx-auto">
        <Router>
          <Header userDetails={userDetails} />
          {loggedIn ? (
            <div className=" flex md:flex-row flex-col grow">
              <div className="md:container md:w-1/5 md:border-r">
                <SideNav />
              </div>
              <div className="md:w-4/5 w-full">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Dashboard
                        viewCount={viewCount}
                        commentCount={commentCount}
                      />
                    }
                  />
                  <Route path="/content" element={<Content />} />
                  <Route path="/upload-video" element={<CreateVideo />} />
                  <Route path="/update-video/:id" element={<UpdateVideo />} />
                </Routes>
              </div>
            </div>
          ) : (
            <div className="container w-full my-auto flex flex-row justify-center content-center">
              <h1 className="text-3xl font-bold">Please Login</h1>
            </div>
          )}
        </Router>
      </div>
    </>
  );
}

export default App;
