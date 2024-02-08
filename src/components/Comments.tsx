import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const config = token ? {
            headers: { Authorization: `Bearer ${token}` }
          } : {};
        const response = await apiClient.get(`/postInteraction/postId/${postId}`, config);
        if (response.data && response.data.length > 0) {
          setComments(response.data[0].comments || []);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div></div>;
  }

  const firstTwoComments = comments.slice(0, 2);

  return (
    <div>
      {firstTwoComments.map((comment, index) => (
        <div key={index} className="comment">
          <strong>{ comment.userId}</strong> { comment.comment}
        </div>
      ))}
    </div>
  );
};

export default Comments;
