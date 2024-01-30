import { FormEvent, useEffect, useState } from "react";
import { useVideo } from "../context/video";
import { getVideo } from "../utils/firebase.firestore/videos/getVideo";
import { useParams } from "react-router-dom";
import { updateVideo } from "../utils/firebase.firestore/videos/updateVideo";
import Loader from "../components/Loader";

function UpdateVideo() {
  const { id } = useParams<string>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  const [video, setVideo] = useState<string | undefined>(undefined);
  const { setVideos } = useVideo();

  const fetchCurrentVideo = async () => {
    const response = await getVideo(id);
    if (response) {
      setTitle(response.title);
      setDescription(response.description);
      setThumbnail(response.videoThumbnail);
      setVideo(response.videoLink);
    }
  };

  useEffect(() => {
    fetchCurrentVideo();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("jsnjasndjasdnjasndjsand");
    if (title && description && thumbnail && video && id) {
      await updateVideo(title, description, video, thumbnail, id);
      setVideos((prevArray) =>
        prevArray
          ? prevArray.map((element) =>
              element.videosId === id
                ? {
                    ...element,
                    title: title,
                    description: description,
                    videoLink: video,
                    videoThumbnail: thumbnail,
                  }
                : element
            )
          : []
      );
    }
  };

  if (title && description && thumbnail && video) {
    return (
      <div className="container w-full h-full">
        <div className="p-7 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Upload Video</h1>
        </div>
        <div className="sm:w-1/2 mx-auto mt-7 sm:mt-0 sm:px-0 px-4">
          <form className="max-w-sm sm:p-7 mx-auto">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video Description
              </label>
              <textarea
                rows={4}
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="thumbnail"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video Thumbnail
              </label>
              <input
                type="text"
                id="thumbnail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="video"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video
              </label>
              <input
                type="text"
                id="video"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <Loader height={""} />;
  }
}

export default UpdateVideo;
