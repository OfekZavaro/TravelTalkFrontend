import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiClient } from '../utils/apiClient';

interface IComment {
  userId: string;
  comment: string;
}

interface ShowCommentsProps {
  postId: string;
}

const ShowComments: React.FC<ShowCommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const config = token ? {
        headers: { Authorization: `Bearer ${token}` }
      } : {};
      const response = await apiClient.get(`/postInteraction/postId/${postId}`, config);
      console.log('API response:', response.data);
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

  useEffect(() => {
    if (showModal) {
      // Fetch comments when the modal is opened
      fetchComments();
    }
  }, [showModal, postId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="text-end">
        <div style={{ cursor: 'pointer' }} onClick={toggleModal}>
          <i className="fas fa-comment text-muted mr-2"></i>
          <span className="align-middle"> Comments</span>
        </div>
      </div>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            comments.map((comment, index) => (
              <div key={index}>
                <strong>{comment.userId}</strong>: {comment.comment}
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowComments;
