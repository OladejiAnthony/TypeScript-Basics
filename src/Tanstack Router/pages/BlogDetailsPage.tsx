import React from 'react';
import { useParams } from '@tanstack/react-router';

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Blog Details - {id}</h1>
      <p>This is the detailed view of blog post with ID: {id}</p>
    </div>
  );
};

export default BlogDetailsPage;
