import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../../services/postService';
import { useAuth } from '../../context/AuthContext';
import PostCard from './PostCard';
import toast from 'react-hot-toast';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const { posts, totalPages } = await getPosts(page, 10, search);
      setPosts(posts);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link 
          to="/posts/create" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create New Post
        </Link>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search posts..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <PostCard 
            key={post._id} 
            post={post} 
            canEdit={user._id === post.author._id}
            onDelete={() => handleDelete(post._id)}
          />
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 rounded ${
              page === pageNum 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;