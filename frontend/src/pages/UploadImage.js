import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { uploadImage } from '../services/images';
import './UploadImage.css';

const UploadImage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          file
        });

        // Create a preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.file) {
      setError('Please select an image to upload');
      setLoading(false);
      return;
    }

    try {
      // Convert the file to base64
      const reader = new FileReader();
      reader.readAsDataURL(formData.file);
      reader.onload = async () => {
        const base64Image = reader.result;
        
        await uploadImage({
          title: formData.title,
          description: formData.description,
          base64Image
        }, token);
        
        setLoading(false);
        navigate('/gallery');
      };
      reader.onerror = () => {
        setError('Error reading the file');
        setLoading(false);
      };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image');
      setLoading(false);
    }
  };

  return (
    <div className="upload-image">
      <h2>Upload New Image</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            id="file"
            name="file"
            className="form-control"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button 
          type="submit" 
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default UploadImage;