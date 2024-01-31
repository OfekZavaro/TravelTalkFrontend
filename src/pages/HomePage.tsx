import React from 'react'; 
import TopBar from '../components/TopBar'; 
import PostsList from '../components/PostList';
import Footer from '../components/Footer';


const HomePage = () => {
  return (
    <div>
      <TopBar />
      <div style={{ marginTop: '5rem' }}> 
        <PostsList />
      </div>
      {/* The rest of your home page content will go here */}
      <Footer/>
    </div>
  );
};

export default HomePage;

