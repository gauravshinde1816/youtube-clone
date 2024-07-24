import React , {useState} from 'react'
import {addComment} from "../api/video"
import {Video} from "./VideoCard"

type CommentInputProps = {
    fetchComments: (videoId: number | undefined | null)=>void
    video: Video
}

function CommentInput(props: CommentInputProps) {
    const {video , fetchComments} = props
    const [newComment , setNewComment] = useState<string>("")

    const handleAddComment = async () => {
        const res = await addComment(video?.id, newComment);
        if (res?.status == 200) {
          setNewComment("");
          fetchComments(video?.id)
        }
      };

  return (
    <div className="flex items-start mb-4">
    <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
    <input
      type="text"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Add a comment..."
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
    />
    <button
      onClick={handleAddComment}
      disabled={!newComment}
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
    >
      Comment
    </button>
  </div>
  )
}

export default CommentInput
