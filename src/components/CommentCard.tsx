import React, { useState  } from "react";
import { Comment } from "./VideoDetails";
import { addComment} from "../api/video";

const CommentCard: React.FC<{ comment: Comment , refreshComments:(video:number|null | undefined)=>void }> = ({ comment, refreshComments }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => {
    setShowReplyForm(true);
  };


  const handleReplySubmit = async () => {
    const res = await addComment(
      comment.videoId,
      replyText,
      comment.commentId
    );
    setReplyText("");
    setShowReplyForm(false);
    await refreshComments(comment.videoId)
  };


  return (
    <div className="mb-4 p-4 border rounded-md shadow-sm">
      <div className="flex items-start">
        <div>
          <p className="font-bold">{comment.userName}</p>
          <p>{comment.commentText}</p>
          <button
            className="text-blue-500 hover:underline mt-1"
            onClick={handleReplyClick}
          >
            Reply
          </button>
          {showReplyForm && (
            <div className="mt-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                onClick={handleReplySubmit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit Reply
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.commentId} comment={reply} refreshComments={refreshComments} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
