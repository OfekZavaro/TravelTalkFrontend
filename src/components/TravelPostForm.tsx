import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { apiClient } from '../utils/apiClient';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ITravelPostFormState {
  city: string;
  description: string;
  location: string;
  photo: string[] | null;
  userId:string;
}

const TravelPostForm = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<ITravelPostFormState>({
    city: '',
    description: '',
    location: '',
    photo: [],
    userId: '',
  });

  const [fileData, setFileData] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setFileData(Array.from(e.target.files));
        console.log("what we search" + Array.from(e.target.files));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(''); 
    setErrorMessage('');

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const config = token && userId ? {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
    } : {};

    if (!fileData.length) {
        setErrorMessage('Please select at least one photo.');
        return; 
    }

    if (userId && token) {
        try {
            console.log(fileData);
            const photoUrls = await Promise.all(fileData.map(uploadPhoto));
            console.log(photoUrls);
            //const userResponse = await apiClient.get(`/user/${userId}`, config);
            //const userName = userResponse.data.userProfile.Name;
            const postObject = {
                city: post.city,
                description: post.description,
                location: post.location,
                photos: photoUrls, 
                userId: userId 
            };
            console.log(postObject);
            const response =await apiClient.post('/post', postObject, config);
            console.log(response)
            setSuccessMessage('Your post is created successfully!');
            navigate("/profile");
        } catch (error) {
            console.error('There was an error submitting the post', error);
            setErrorMessage('There was an error submitting your post.');
        }
    }
  };

  return (
    <div className="travel-post-form" style={{ display: 'flex', marginTop: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Left Container for Camera */}
          <div className="photo-container" style={{ flex: '1', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <label htmlFor="photo" style={{ cursor: 'pointer' }}>
            <FaCamera size={50} />
            {fileData.map((file, index) => (
                <div key={index}>{file.name}</div>
            ))}
          </label>
          <input 
            type="file" 
            id="photo" 
            name="photo"
            onChange={handlePhotoChange}
            style={{ display: 'none' }} // The actual file input is hidden
            multiple // Allow multiple file selection
            required 
          />
        </div>
  
          {/* Right Container for Form Fields */}
          <div className="form-fields-container" style={{ flex: '2', padding: '1rem' }}>
            {/* City Input */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City of your travel</label>
              <input 
                type="text" 
                className="form-control" 
                id="city" 
                name="city" 
                value={post.city}
                onChange={handleChange}
                required 
              />
            </div>
            
            {/* Description Input */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Your post</label>
              <textarea 
                className="form-control" 
                id="description" 
                name="description"
                value={post.description}
                onChange={handleChange}
                rows={3}
                required
              ></textarea>
            </div>
  
            {/* Location and City */}
            <div className="mb-3 d-flex">
              <div className="flex-fill me-2">
                <label htmlFor="location" className="form-label">Location</label>
                <select 
                  className="form-select" 
                  id="location" 
                  name="location"
                  value={post.location}
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
            
            {/* Submit Button */}
            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">Submit Post</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '3rem' }}> </div>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </form>
    </div>
  );
  
};

export default TravelPostForm;
