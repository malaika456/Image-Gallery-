import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getImage, updateImage, deleteImage } from '../services/images';
import './ImageDetail.css';

const ImageDetail = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const data = await getImage(id, token);
        setImage(data);
        setFormData({
          title: data.title,
          description: data.description || ''
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load image');
        setLoading(false);
      }
    };

    fetchImage();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const updatedImage = await updateImage(id, formData, token);
      setImage(updatedImage.image);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update image');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteImage(id, token);
        navigate('/gallery');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete image');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!image) {
    return <div className="error">Image not found</div>;
  }

  return (
    <div className="image-detail">
      <div className="image-detail-header">
        <Link to="/gallery" className="btn btn-secondary">Back to Gallery</Link>
        <div className="image-actions">
          <button 
            onClick={() => setEditing(!editing)} 
            className="btn btn-primary"
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="image-detail-content">
        <div className="image-container">
          <img src={image.imageUrl} alt={image.title} />
        </div>
        
        {editing ? (
          <div className="image-form">
            <form onSubmit={handleUpdate}>
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
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        ) : (
          <div className="image-info">
            <h1>{image.title}</h1>
            <p>{image.description || 'No description'}</p>
            <p className="image-date">
              Uploaded on {new Date(image.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDetail;