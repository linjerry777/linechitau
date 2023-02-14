import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Token.scss';
import bgimg from './image/silder1.jpeg';
import { Button, Modal } from 'antd';
const Token = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();

  async function handleSubmit(e) {
    console.log('handleSubmit');
    try {
      let response = await axios.get(`/auth/token/${token}`);
      console.log(response.status);
      console.log('成功');
      navigate('/login1');
      alert('驗證成功');
    } catch (e) {
      alert('驗證失敗');
    }
  }
  return (
    <>
      <div className="token">
        <button className="btn-token" onClick={handleSubmit}>
          驗證成功
        </button>
        <img className="img-token" src={bgimg} alt="" />
      </div>
    </>
  );
};

export default Token;
