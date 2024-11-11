import React from 'react';
import { Link } from '@tanstack/react-router';

const blogPosts = [
  { id: '1', title: 'Introduction to TanStack Router' },
  { id: '2', title: 'React with TypeScript Best Practices' },
];

const BlogPage: React.FC = () => {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogPosts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
