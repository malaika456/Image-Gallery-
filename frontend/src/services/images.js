import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const createHeaders = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
};

export const getImages = async (token) => {
  const response = await axios.get(`${API_URL}/images`, createHeaders(token));
  return response.data;
};

export const getImage = async (id, token) => {
  const response = await axios.get(`${API_URL}/images/${id}`, createHeaders(token));
  return response.data;
};

export const uploadImage = async (imageData, token) => {
  const response = await axios.post(`${API_URL}/images`, imageData, createHeaders(token));
  return response.data;
};

export const updateImage = async (id, imageData, token) => {
  const response = await axios.patch(`${API_URL}/images/${id}`, imageData, createHeaders(token));
  return response.data;
};

export const deleteImage = async (id, token) => {
  const response = await axios.delete(`${API_URL}/images/${id}`, createHeaders(token));
  return response.data;
};