import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./VideoCard.style.css"

interface Video {
    id: string;
    title: string; 
    channelName: string;
    thumbnail: string;
    videoFile: string;
    likesCount: number;
    comments: Comment[];
  }
  

interface VideoCardProps {
    video : Video
  }

const VideoCard: React.FC<VideoCardProps> = ({ video : { id , thumbnail , videoFile ,  likesCount ,  comments , title , channelName  }}) => {


  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch?v=${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md videoCard" onClick={handleClick}>
      <img 
        src={thumbnail} 
        alt="Video Thumbnail" 
        className="w-full rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{channelName}</p>
      </div>
    </div>
  );
};

export default VideoCard;
