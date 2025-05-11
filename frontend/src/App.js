import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';
import UploadImage from './pages/UploadImage';
import ImageDetail from './pages/ImageDetail';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/gallery" element={
              <PrivateRoute>
                <Gallery />
              </PrivateRoute>
            } />
            <Route path="/upload" element={
              <PrivateRoute>
                <UploadImage />
              </PrivateRoute>
            } />
            <Route path="/images/:id" element={
              <PrivateRoute>
                <ImageDetail />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;