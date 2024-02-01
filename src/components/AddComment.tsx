import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiClient } from '../utils/apiClient';

interface AddCommentProps {
  postId: string;
  onCommentAdded: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, onCommentAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setError('');
  };
  const handleShow = () => setShowModal(true);

  const submitComment = async () => {
    setIsSubmitting(true);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const config = token ? {
        headers: { Authorization: `Bearer ${token}` }
      } : {};

    if (userId && token) {
      try {
        const userResponse = await apiClient.get(`/user/${userId}`, config);
        const userName = userResponse.data.userProfile.Name;
        

        const commentData = {
            postId: postId,
            userId: userName, 
            comment: commentText,
        };
        
        const commentResponse = await apiClient.post('/postInteraction/comment', commentData, config);

      if (commentResponse.status === 200) {
        onCommentAdded(); 
        setCommentText(''); 
      } else {
        setError('Failed to post comment. Please try again later.');
      }

    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment. Please try again later.');
    }
    } else {
    setError('You must be logged in to post a comment.');
     }
    setIsSubmitting(false);
    handleClose();
 };

  return (
    <>
      <div style={{ cursor: 'pointer' }} onClick={handleShow}>
        <i className="fas fa-plus mr-2"></i>
        <span className="align-middle"> Add Comment</span>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="text-danger">{error}</div>}
          <Form>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={isSubmitting}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Close
          </Button>
          <Button variant="primary" onClick={submitComment} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddComment;