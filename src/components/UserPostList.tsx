import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post, { IPost } from './Post';
import { apiClient } from '../utils/apiClient';
import { FaTrash, FaPen } from 'react-icons/fa';
import EditPostModal from "./EditPostModel";

interface UserPostsListProps {
  userId: string;
}

const UserPostsList: React.FC<UserPostsListProps> = ({ userId }) => {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);

  const token = localStorage.getItem('accessToken');

  const deletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem('accessToken'); 
      if (token) {
        await apiClient.delete(`/post/${postId}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        });
        setUserPosts(userPosts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
  };

  const editPost= async (postId: string)=>{
    const postToEdit = userPosts.find(post => post._id === postId);
    if (postToEdit) {
      setCurrentPost(postToEdit);
      setIsEditModalVisible(true);
    }
  };
  const fetchPosts = async () => {
    if (userId && token) {
      try {
          const config = token ? {
              headers: { Authorization: `Bearer ${token}` }
          } : {};
          const response = await apiClient.get(`/postInteraction/user/${userId}`, config);
          setUserPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, [userId, token]);

  return (
    <Container>
      {userPosts.map((post) => (
        <Row key={post._id} className="mb-3 align-items-start">
          <Col md={12} className="d-flex justify-content-end">
            <Button variant="link" className="me-2" onClick={() => editPost(post._id)}>
                <FaPen size={20} color="black" />
            </Button>
            <Button variant="link" onClick={() => deletePost(post._id)}>
                  <FaTrash size={20} color="black" />
            </Button>
          </Col>
          <Col md={12}>
            <Post post={post} />
          </Col>
        </Row>
      ))}
        {currentPost && (
            <EditPostModal
                show={isEditModalVisible}
                handleClose={() => setIsEditModalVisible(false)}
                post ={currentPost}
                onPostUpdated={fetchPosts}
            />
        )}
    </Container>
  );
};

export default UserPostsList;