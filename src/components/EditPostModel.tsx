import { ChangeEvent, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiClient } from '../utils/apiClient';

interface IPost {
    _id: string;
    city: string;
    description: string;
    location: string;
    photos: string[]; 
  }
  

  interface EditPostModalProps {
    show: boolean;
    handleClose: () => void;
    post: IPost;
    onPostUpdated: () => void;
  }

const EditPostModal = ({ show, handleClose, post, onPostUpdated }: EditPostModalProps) => {
  const [editedPost, setEditedPost] = useState({
    city: post.city,
    description: post.description,
    location: post.location,
    photos: post.photos,
  });
  const [newPhotos, setNewPhotos] = useState<File[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setNewPhotos(Array.from(e.target.files));
    }
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await apiClient.post('/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url; 
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    let updatedPhotoUrls = editedPost.photos;
    if (newPhotos.length > 0) {
      try {
        const uploadedUrls = await Promise.all(newPhotos.map(uploadPhoto));
        updatedPhotoUrls = uploadedUrls;
      } catch (error) {
        console.error('Error uploading new photos:', error);
        return;
      }
    }
  
    const updatedPostData = {
      ...editedPost,
      photos: updatedPhotoUrls,
    };
  
    try {
      const token = localStorage.getItem('accessToken');
      await apiClient.patch(`/post/${post._id}`, updatedPostData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Post updated successfully');
      onPostUpdated();
      handleClose(); 
    } catch (error) {
      console.error('Error updating the post:', error);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="city">
            <Form.Label>City of your travel</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={editedPost.city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Your post</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={editedPost.description}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="mb-3 d-flex">
            <div className="flex-fill me-2">
              <label htmlFor="location" className="form-label">Location</label>
              <select 
                className="form-select" 
                id="location" 
                name="location"
                value={editedPost.location}
                onChange={handleChange}
                required
              >
                <option value="">Select One</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
              </select>
            </div>
          </div>
          <Form.Group controlId="photos">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              multiple
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostModal;
