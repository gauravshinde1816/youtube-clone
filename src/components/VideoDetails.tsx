import React, { useEffect, useState } from "react";
import { Video } from "./VideoCard";
import VideoPlayer from "./VideoPlayer";

import {
  getCommentForVideo,
} from "../api/video";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import Loader from "./Loader";
import LikeDislikeButton from "./LikeDislikeButton";

export interface Comment {
  commentId?: number;
  userId: string;
  commentText: string;
  replies: Comment[];
  userName: string;
  userEmail: string;
  createdAt: string;
  parentCommentId: number;
  videoId?: number;
}

const VideoDetails: React.FC<{
  video: Video | null;
  fetchVideoDetails: () => void;
}> = ({ video, fetchVideoDetails }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const fetchComments = async (videoId: number | null | undefined) => {
    const res = await getCommentForVideo(videoId);
    if (res?.status === 200) {
      setComments(res.data.comments);
    }
  };

  useEffect(() => {
    if (video) {
      fetchComments(video.id);
    }
  }, [video]);

  if (!video) {
    return <Loader />;
  }

  const { title, thumbnailUrl, videoUrl } = video;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-3/4">
        <VideoPlayer videoUrl={videoUrl} posterUrl={thumbnailUrl} />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center mt-2">
            <p>{video?.userName}</p>
          </div>
        </div>
        <div className="m-4">
          <LikeDislikeButton
            video={video}
            refetchVideoDetails={fetchVideoDetails}
          />
        </div>

        <CommentInput fetchComments={fetchComments} video={video} />
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Comments</h3>
          {comments.map((comment) => (
            <CommentCard
              key={comment.commentId}
              comment={comment}
              refreshComments={fetchComments}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
