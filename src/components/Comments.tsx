import React, { useEffect, useState } from 'react';

const Comments: React.FC<{ videoId: string | null }> = ({ videoId }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const apiKey ='';
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=10&key=${apiKey}`
      );
      const data = await response.json();
      setComments(data.items);
    };

    fetchComments();
  }, [videoId]);

  return (
    <div>
      <h3 className="text-xl font-semibold mt-4 mb-2">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <div className="flex items-center mb-2">
            <img 
              src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} 
              alt="Comment Author" 
              className="h-8 w-8 rounded-full mr-2"
            />
            <p className="font-semibold">{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
          </div>
          <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;

