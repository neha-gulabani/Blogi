import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../services/postService';
import toast from 'react-hot-toast';

const PostEdit = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
        setExistingImage(post.image);
      } catch (error) {
        toast.error('Failed to fetch post');
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      await updatePost(id, formData);
      toast.success('Post updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded h-48"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Featured Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded"
          />
          {existingImage && (
            <div className="mt-2">
              <img 
                src={existingImage} 
                alt="Current post" 
                className="max-w-full h-auto rounded"
              />
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Post
          </button>
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;