import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import './Profile.css';
import { useContext, useState } from 'react';
import { JwtCsrfTokenContext } from '../../utils/csrf-hook/useJwtCsrfToken';
import { googleauth } from '../../config/firebase';

const Profile = () => {
  const { jwtToken, jwtDecodedData, Googleauth } =
    useContext(JwtCsrfTokenContext);
  console.log(jwtToken, jwtDecodedData);
  console.log(Googleauth);
  return (
    <div className="profile screen">
      <div className="main">
        <Sidebar />

        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
