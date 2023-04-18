import React from 'react';
import './single.css';
import SideBar from '../../SideBar/SideBar';
import SinglePost from '../../SinglePost/SinglePost';

const Single = () => {
  return (
    <div className='single'>
        <SinglePost />
        <SideBar />
    </div>
  )
}

export default Single