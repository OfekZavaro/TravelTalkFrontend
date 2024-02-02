// LocationPostList.tsx
import React, { useEffect, useState } from 'react';
import Post, { IPost } from './Post';
import { apiClient } from '../utils/apiClient';

interface LocationPostListProps {
  location: string;
}

const LocationPostList = ({ location }: LocationPostListProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!location) return; // Exit if no location is selected

      try {
        const token = localStorage.getItem('accessToken');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await apiClient.get(`/postInteraction/location/${location}`, config);
        setPosts(response.data); // Directly set the response data as posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [location]);

  if (location && !posts) {
    return <p>Loading posts for {location}...</p>;
  }

  if (location && posts && posts.length === 0) {
    return <p>No posts found for {location}.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="mb-5">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default LocationPostList;
