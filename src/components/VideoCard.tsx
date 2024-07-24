import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import "./VideoCard.style.css"

export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  timeDuration: string; 
  uploadTime: string;   
  likeCount: number;
  likedByCurrentUser: boolean;
  userName?:string
}
  
interface VideoCardProps {
    video : Video
  }

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {


  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch?v=${video.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md videoCard cursor-pointer" onClick={handleClick}>
      <img
        src={video.thumbnailUrl}
        alt="Video Thumbnail"
        className="w-80 h-80 rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
        <div className="flex items-center text-gray-600">
          <p className="mr-2">{video.userName}</p>
          <div className="flex items-center">
            <HandThumbUpIcon className="h-4 w-4 mr-1" />
            <span>{video.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
