import React from 'react';
import "../components/profile.css";
import profile from "../components/assets/profile.jpeg";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  }

  return (
    <div className="profile--section">
      <div className="profile--header">
        <h2>Profile</h2>
      </div>
      <div className="profile--content">
        <div className="profile--image">
          <img src={profile} alt="Profile Picture" />
        </div>
        <div className="profile--info">
          <h3>Nakul Armarkar</h3>
          <p>Software Engineer</p>
          <p>nakularmarkar99@gmail.com</p>
        </div>
        <div className="profile--actions">
          <button className="logout--button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
