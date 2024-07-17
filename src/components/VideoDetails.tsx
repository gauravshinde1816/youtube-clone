import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { Video , getVideoFromId} from '../data/MockVideoData';

const VideoDetails: React.FC<{ video: Video | undefined}> = ({ video}) => {
  const [videoDetails, setVideoDetails] = useState<Video|undefined>(video);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const apiKey = '';
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
      );
      const data = await response.json();
      setVideoDetails(data.items[0]); // Assuming there's only one video in the response
    };
    setVideoDetails(video)

    console.log(video)

    // fetchVideoDetails();
  }, [video]);

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  const {title , thumbnail , channelName , likesCount , videoFile } = videoDetails;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <VideoPlayer videoUrl={videoFile}/>
      <div className="flex items-center mt-2">
        <img 
          src={thumbnail} 
          alt="Channel Thumbnail" 
          className="h-8 w-8 rounded-full mr-2" 
        />
        <p>{channelName}</p>
      </div>
      <p className="mt-2">
        {likesCount} views •
      </p>
    </div>
  );
};

export default VideoDetails;
