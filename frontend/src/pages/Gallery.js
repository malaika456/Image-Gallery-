import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getImages } from '../services/images';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImages(token);
        setImages(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load images');
        setLoading(false);
      }
    };

    fetchImages();
  }, [token]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1>My Gallery</h1>
        <Link to="/upload" className="btn btn-primary">Upload New Image</Link>
      </div>
      
      {images.length === 0 ? (
        <div className="no-images">
          <p>You haven't uploaded any images yet.</p>
          <Link to="/upload" className="btn btn-primary">Upload Your First Image</Link>
        </div>
      ) : (
        <div className="image-grid">
          {images.map(image => (
            <div key={image.id} className="image-card">
              <img src={image.imageUrl} alt={image.title} />
              <div className="image-card-body">
                <h3>{image.title}</h3>
                <p>{image.description || 'No description'}</p>
                <Link to={`/images/${image.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;