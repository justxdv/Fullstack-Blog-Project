import React, {useState, useContext} from 'react';
import './settings.css';
import Sidebar from '../SideBar/SideBar'
import { Context } from '../../context/Context';
import axios from 'axios';


const Settings = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/uploads/";

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({type: "UPDATE_START"});
      const updateUser = {
          userId: user._id,
          username,
          email,
          password
      }
      if(file) {
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updateUser.profilePicture = filename;
          try {
              await axios.post("http://localhost:5000/api/upload", data);
          } catch (error) {
              console.log("error", error);
              dispatch({type: "UPDATE_FAILURE"});
          }
      }
      try {
          const res = await axios.put("http://localhost:5000/api/user/"+user._id, updateUser);
          setSuccess(true);
          dispatch({type: "UPDATE_SUCCESS", payload: res.data});
        } catch (error) {
          console.log("error in updation", error);
      }
  }

  return (
    <div className='settings'>
        <div className='settingsWrapper'>
            <div className='settingsTitle'>
                <span className='settingsUpdateTitle'>Update Your Account</span>
                <span className='settingsDeleteTitle'>Delete Your Account</span>
            </div>
            <form className='settingsForm' onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className='settingsPP'>
                    <img src={file?URL.createObjectURL(file):PF+user.profilePicture} alt="" />
                    <label htmlFor='fileInput'>
                        <i className='settingsPPIcon fa-regular fa-circle-user'></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: 'none'}} onChange={(e)=>setFile(e.target.files[0])} />

        </div>
        <label>Username</label>
        <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input type='email' placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        <button className='settingsSubmit' type='submit'>Update</button>
        {success && <span style={{color: 'green', textAlign: 'center', marginTop: '20px'}}>Profile has been updated successfully</span>}
      </form>
    </div>
    <Sidebar />
  </div>
  )
}

export default Settings