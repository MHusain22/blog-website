import React from 'react';
import BlogItem from './BlogItem';
import './styles.css';

const BlogList = ({ blogs }) => {
  return (
    <div className='blogList-wrap'>
        <BlogItem  />
     
    </div>
  );
};

export default BlogList;
