import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import mockdata from "../data/MockVideoData"

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const apiKey = ''; // Replace with your actual API key
      const response = await fetch(
     `https://www.googleapis.com/youtube/v3/search?part=snippet&q=cricket+highlights&type=video&videoCategoryId=17&maxResults=50&key=${apiKey}`
      );
      const data = await response.json();
      if(!data){
       
      }else{
        setVideos(data.items);
      }
      
    };

    setVideos(mockdata);

    // fetchVideos();
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">{/* Sidebar Content */}</aside>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
