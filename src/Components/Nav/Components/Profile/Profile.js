import React, { useState } from 'react';
import ProfileBox from './Components/ProfileBox';
import './Profile.scss';

const Profile = ({ showLoginModal }) => {
  const [isShow, setIsShow] = useState(false);

  const showProfileBox = () => {
    setIsShow(prev => !prev);
  };

  return (
    <div onClick={showProfileBox} className="Profile">
      <img className="menuIcon" alt="menu" src="/images/Nav/menu.png" />
      <img
        className="profileIcon"
        alt="profile"
        src="/images/Nav/profile-user.png"
      />
      <div className="profileBox">
        {isShow && <ProfileBox showLoginModal={showLoginModal} />}
      </div>
    </div>
  );
};

export default Profile;
