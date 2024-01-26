import React, { useEffect, useState } from 'react';
import Post, { IPost } from './Post';
import { apiClient, cancelRequest } from '../utils/apiClient';

const PostsList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} /> // Make sure your IPost interface has an _id field if you're using MongoDB
      ))}
    </div>
  );
};

export default PostsList;
