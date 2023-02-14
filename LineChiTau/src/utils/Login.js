import React, { useEffect, useState, useCallback } from 'react';
import './Login.scss';
import axios from 'axios';
import { useJwtCsrfToken } from './csrf-hook/useJwtCsrfToken';
import { ClipLoader } from 'react-spinners';
import bgimg from './image/silder1.jpeg';
import fackbook from './image/fackbook.png';
import google from './image/google.png';
import line from './image/line.png';
import twitter from './image/twitter.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { googleauth, provide } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchError, setFetchError] = useState('');
  const {
    csrfToken,
    jwtToken,
    jwtDecodedData,
    init,
    login,
    register,
    logout,
    getNewAccessToken,
    auth,
    googlelogin,
    Googleauth,
  } = useJwtCsrfToken();
  console.log(Googleauth);
  // const { spinner, setLoading } = useSpinner(1300);

  init(axios);

  const [member, setMember] = useState({});

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }
  function checkpassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      alert('密碼與確認密碼不一致');
      return false;
    }
    return true;
  }
  async function handleSubmit(e) {
    console.log('handleSubmit');
    const email = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!email.test(member.email)) {
      alert('請輸入正確格式email');
      return;
    }
    if (!!member.email === false) {
      alert('請輸入email');
      return;
    }
    if (!!member.name === false) {
      alert('請輸入姓名');
      return;
    }
    if (!!member.password === false) {
      alert('請輸入密碼');
      return;
    }
    if (!!member.confirmPassword === false) {
      alert('請輸入確認密碼');
      return;
    }

    if (member.password.length < 4 || member.password.length > 12) {
      alert('密碼請在長度 4~12 之間');
      return;
    }
    if (!checkpassword(member.password, member.confirmPassword)) return;

    // 關閉表單的預設行為
    e.preventDefault();
    // 作法1: 沒有檔案的表單
    // ajax
    // let response = await axios.post('http://localhost:3001/api/auth/register', member);
    // 作法2: 有檔案的表單
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    let formData = {
      email: member.email,
      username: member.name,
      password: member.password,
      confirmPassword: member.confirmPassword,
    };

    try {
      let response = await axios.post('/auth/register', formData);
      console.log(response.status);
      handleBack();
      console.log(response.status);
      console.log('成功');
    } catch (e) {
      alert('已經註冊過囉');
    }
  }
  const handleBack = useCallback(() => {
    if (location.state && location.state.path === '/page-with-tab') {
      navigate.goBack(); // 回上一頁
    } else {
      navigate('/login1'); // 跳轉到/target頁
    }
  }, [navigate, location.state]);
  const goRegister = () => {
    navigate('/login'); // 跳轉到/target頁
  };
  const googlelogout = async () => {
    googleauth.signOut();
  };
  let captchaValue;
  const [captcha, setCapcha] = useState(false);
  function onChange(value) {
    captchaValue = value;
    setCapcha(true);
    // console.log('Captcha value:', value);
    console.log(captchaValue);
  }
  return (
    <>
      <div className="demo">
        <from className="login">
          <div className="firstBtn">登入</div>
          使用第三方帳戶登入/創立帳戶
          <div className="icon">
            <img className="pic" src={line} alt="" />
            <img className="pic" src={twitter} alt="" />
            <img className="pic" src={fackbook} alt="" />
            <button className="google" onClick={() => googlelogin()}></button>
          </div>
          {/* <div className="email">
            電子信箱
            <input
              type="text"
              placeholder="請輸入電子信箱"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div> */}
          <div className="login-name">
            信箱
            <input
              type="text"
              placeholder="請輸入信箱"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="password">
            密碼
            <input
              type="password"
              placeholder="請輸入密碼"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          
          {/* <div className="confirmPassword">
            再輸入一次密碼
            <input
              type="password"
              placeholder="請確認密碼"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div> */}
          <div className="btn-login">
            <button className="lastBtn" onClick={() => goRegister()}>
              註冊
            </button>
            <button
              className="lastBtn"
              onClick={() => {
                if (member.email && member.password) {
                  login({ email: member.email, password: member.password });
                } else {
                  alert('請先填入資料');
                }
              }}
            >
              登入
            </button>
          </div>
          <ReCAPTCHA
            sitekey="6Lezp0skAAAAAJuZseTkpiebbdVpYBDp3tyM6n_6"
            onChange={onChange}
          />
          {/*  <button
            onClick={() =>
              register({ username: member.name, password: member.password })
            }
          >
            register
          </button>
          <button onClick={() => googlelogout()}>登出</button> */}
        </from>
        <img className="pic" src={bgimg} alt="" />
      </div>
    </>
  );
}

export default Login;
