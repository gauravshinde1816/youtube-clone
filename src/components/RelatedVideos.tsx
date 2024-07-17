import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';

const RelatedVideos: React.FC<{ videoId: string | null }> = ({ videoId }) => {
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      const apiKey = 'AIzaSyCo3VfcjrHkVTd80rSdZMb_76Xmk5CiFyc';
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=10&key=${apiKey}`
      );
      const data = await response.json();
      setRelatedVideos(data.items);
    };

    fetchRelatedVideos();
  }, [videoId]);

  return (
    <div>
      <h3 className="text-xl font-semibold mt-4 mb-2">Related Videos</h3>
      <div className="grid grid-cols-1 gap-4"> 
        {relatedVideos.map((video) => (
          <VideoCard key={video.id.videoId} video={video} /> 
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos;
