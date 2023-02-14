import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';

const Timer = () => {
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);
  if (seconds === 0) {
    // window.location.href = '/profile';
    navigate('/profile');
    return null;
  }
  return <div>{seconds} 秒後跳轉回清單頁頁面</div>;
};

export default Timer;
