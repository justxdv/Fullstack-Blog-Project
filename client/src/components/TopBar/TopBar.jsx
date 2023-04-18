import React, {useContext} from 'react';
import { Context } from '../../context/Context';

import { Link } from 'react-router-dom';
import './topbar.css';

const TopBar = () => {
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/uploads/";
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
        window.location.replace("/login");
    };
  return (
    <div className='topContainer'>
        <div className='left'>
            <i className="fa-brands fa-linkedin topIcon"></i>
            <i className="fa-brands fa-instagram topIcon"></i>
            <i className="fa-brands fa-twitter topIcon"></i>
        </div>
        <div className='center'>
            <ul className='topList'>
                <li className='topListItem'><Link to='/' style={{textDecoration: 'none'}}>Home</Link></li>
                <li className='topListItem'><Link to='/write' style={{textDecoration: 'none'}}>Write</Link></li>
                <li className='topListItem' onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
        </div>
        <div className='right'>
            {user ? (
                <Link to="/settings">
            <img className='topImage' src={PF + user.profilePicture} alt="" />
            </Link>
            ) : (
            <ul className='topList'>
                <li className='topListItem'><Link to='/login' style={{textDecoration: 'none'}}>Login</Link></li>
                <li className='topListItem'><Link to='/register' style={{textDecoration: 'none'}}>Register</Link></li>
            </ul>
            )}
            <i className="fa-solid fa-magnifying-glass topSearchIcon"></i>
        </div>
    </div>
  )
}

export default TopBar