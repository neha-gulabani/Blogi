import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostList from './components/Posts/PostList';
import PostCreate from './components/Posts/PostCreate';
import PostEdit from './components/Posts/PostEdit';
import PrivateRoute from './components/Common/PrivateRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <PostList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/posts/create" 
            element={
              <PrivateRoute>
                <PostCreate />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/posts/edit/:id" 
            element={
              <PrivateRoute>
                <PostEdit />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;