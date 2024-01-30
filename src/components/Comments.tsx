import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';

interface CommentProps {
  postId: string;
}

interface IComment {
  userId: string;
  comment: string;
}

const Comments = ({ postId }: CommentProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = token ? {
            headers: { Authorization: `Bearer ${token}` }
          } : {};
        const response = await apiClient.get(`/postInteraction/postId/${postId}`, config);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);


  const firstTwoComments = comments.slice(0, 2);

  return (
    <div>
      {firstTwoComments.map((comment, index) => (
        <div key={index} className="comment">
          <strong>{comment.userId}</strong> {comment.comment}
        </div>
      ))}
    </div>
  );
};

export default Comments;
