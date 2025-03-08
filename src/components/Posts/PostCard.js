import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PostCard = ({ post, canEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <div className="text-gray-600 text-sm mb-2">
          <span>By {post.author.username}</span>
          <span className="mx-2">•</span>
          <span>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {post.content}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/posts/edit/${post._id}`} 
            className={`${
              canEdit 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } px-3 py-2 rounded`}
            {...(!canEdit && { disabled: true })}
          >
            Edit
          </Link>
          <button 
            onClick={onDelete}
            className={`${
              canEdit 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } px-3 py-2 rounded`}
            disabled={!canEdit}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;