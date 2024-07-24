import React, { useState } from "react";
import { likeVideo, unlikeVideo } from "../api/video";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import { Video } from "./VideoCard";

type LikeDislikeButtonProps = {
  video?: Video;
  refetchVideoDetails: () => void;
};

const LikeDislikeButton = (props: LikeDislikeButtonProps) => {
  const { video} = props;
  const [liked, setLiked] = useState<boolean | undefined>(video?.likedByCurrentUser);
  const [disliked, setDisliked] = useState<boolean>(false);

  const handleLike = async () => {
    const res = await likeVideo(video?.id);
    if (res?.status == 200) {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = async () => {
    const res = await unlikeVideo(video?.id);
    if (res?.status == 200) {
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleLike}
        disabled={liked}
        className={`${
          liked ? "text-blue-500" : "text-gray-600"
        } hover:text-blue-500 mr-4`}
      >
        <HandThumbUpIcon className="h-6 w-6" />
      </button>
      <button
        onClick={handleDislike}
        disabled={disliked}
        className={`${
          disliked ? "text-blue-500" : "text-gray-600"
        } hover:text-blue-500`}
      >
        <HandThumbDownIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default LikeDislikeButton;
