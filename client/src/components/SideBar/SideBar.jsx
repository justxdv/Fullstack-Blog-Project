import React from 'react';
import './sidebar.css';

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img className='sidebarImage' src="http://www.themarketingsage.com/wp-content/uploads/2015/08/about-me-leon-severan-we-buy-houses.jpg" alt="" />
            <p>Welcome to our community-driven blog platform! We believe that everyone has a story to tell and a unique perspective to share, which is why we've created a space where anyone can freely post their own blog and read others. Whether you're a seasoned writer or just starting out, our platform provides a supportive and inclusive environment where you can share your thoughts, experiences, and ideas with a diverse audience. From personal reflections and creative writing to news and opinion pieces, we welcome a wide range of topics and writing styles. So join us today and start sharing your voice with the world!</p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                <li className="sidebarListItem">Life</li>
                <li className="sidebarListItem">Music</li>
                <li className="sidebarListItem">Tech</li>
                <li className="sidebarListItem">Science</li>
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
            </div>
        </div>

    </div>
  )
}

export default SideBar