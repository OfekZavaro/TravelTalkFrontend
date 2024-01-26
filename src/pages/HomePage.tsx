import React from 'react';
import NavBar from '../components/NavBar'; 
import TopBar from '../components/TopBar'; 
import Post from '../components/Post';
import PostsList from '../components/PostList';


const HomePage = () => {
  return (
    <div>
      <NavBar />
      <TopBar />
      <PostsList />
      {/* The rest of your home page content will go here */}
    </div>
  );
};

export default HomePage;

