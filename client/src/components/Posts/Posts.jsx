import React from 'react';
import Post from '../Post/Post';
import './posts.css';

const Posts = ({post}) => {
  return (
    <div className='posts'>
      {post.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  )
}

export default Posts