import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
        <div className='headerTitles'>
            <span className='headerTitleSm'>Sharing ideas, connecting communities – Welcome to our blog platform!</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImage' src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp" alt="" />
    </div>
  )
}

export default Header
