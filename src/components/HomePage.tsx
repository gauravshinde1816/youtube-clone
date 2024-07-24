import React, { useEffect, useState } from "react";
import { fetchVideos } from "../api/video";
import VideoCard from "./VideoCard";
import Loader from "./Loader";

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getVideos = async () => {
    const res = await fetchVideos();
    if (res?.status == 200) {
      console.log(res.data);
      setVideos(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="flex h-screen">
      {/* <aside className="w-64 bg-gray-100 p-4">
        SideBar
      </aside> */}

      {loading ? (
        <Loader/>
      ) : (
        <main className="flex-grow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default HomePage;
