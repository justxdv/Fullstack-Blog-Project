import React, {useState} from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  }
  return (
    <div className='register'>
        <div className="registerF">
            <span className="registerTitle">Register</span>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="registerInput" onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username...' />
                <label>Email</label>
                <input type="email" className="registerInput" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email...' />
                <label>Password</label>
                <input type="password" className="registerInput" onChange={(e) => setPassword(e.target.value)} placeholder='Enter password...' />
                <button type="submit"  className="registerButton">Register</button>
            </form>
            <button className="registerLogin"><Link to='/login' style={{textDecoration: 'none'}}>Login</Link></button>
            {error && ( <span style={{color: 'red', marginTop: '10px'}}>Something went wrong!</span>)}
        </div>
    </div>
  )
}

export default Register