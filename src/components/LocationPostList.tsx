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
      if (!location) return; 

      try {
        const token = localStorage.getItem('authToken'); 
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await apiClient.get(`/postInteraction/location/${location}`, config);
        setPosts(response.data.posts); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [location]);

  return (
    <div>
      {location && posts.length > 0 ? ( 
        posts.map((post) => (
          <div key={post._id} className="mb-5">
            <Post post={post} />
          </div>
        ))
      ) : (
        <p></p> // Display a message if no posts are found or no location is selected
      )}
    </div>
  );
};

export default LocationPostList;
