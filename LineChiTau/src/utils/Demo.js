import React, { useEffect, useState, useCallback, useRef } from 'react';
import './Demo.scss';
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
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
function Demo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchError, setFetchError] = useState('');
  const form = useRef();
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
    if (!email.test(member.user_email)) {
      alert('請輸入正確格式email');
      return;
    }
    if (!!member.user_email === false) {
      alert('請輸入email');
      return;
    }
    if (!!member.user_name === false) {
      alert('請輸入帳號');
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
    // e.preventDefault();
    let formData = {
      email: member.user_email,
      username: member.user_name,
      password: member.password,
      confirmPassword: member.confirmPassword,
    };
    try {
      let response = await axios.post('/auth/register', formData);
      console.log(response.status);
      handleBack();
      console.log(response.status);
      console.log('成功');
      alert('請去信箱驗證');
    } catch (e) {
      alert('已經註冊過囉');
    }
  }
  // const email = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  const sendEmail = async (e) => {
    e.preventDefault();

    emailjs.sendForm('123', '123', form.current, '132V88zGq9icw4DIlao').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    handleSubmit();
  };

  const handleBack = useCallback(() => {
    if (location.state && location.state.path === '/page-with-tab') {
      navigate.goBack(); // 回上一頁
    } else {
      navigate('/login1'); // 跳轉到/target頁
    }
  }, [navigate, location.state]);
  let captchaValue;
  const [captcha, setCapcha] = useState(false);
  function onChange(value) {
    captchaValue = value;
    setCapcha(true);
    // console.log('Captcha value:', value);
    console.log(captchaValue);
  }
  console.log(captcha);

  return (
    <>
      <div className="demo">
        {/* <from className="login" ref={form}>
          <div className="firstBtn">註冊</div>
          使用第三方帳戶登入/創立帳戶
          <div className="icon">
            <img className="pic" src={line} alt="" />
            <img className="pic" src={twitter} alt="" />
            <img className="pic" src={fackbook} alt="" />
            <button className="google" onClick={() => googlelogin()}></button>
          </div>
          <div className="email">
            電子信箱
            <input
              type="text"
              placeholder="請輸入電子信箱"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="name">
            姓名
            <input
              type="text"
              placeholder="請輸入姓名"
              id="name"
              name="name"
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
          <div className="confirmPassword">
            再輸入一次密碼
            <input
              type="password"
              placeholder="請確認密碼"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <div className="btn-login">
            <button className="lastBtn" onClick={handleSubmit}>
              註冊
            </button>
            <button
              className="lastBtn"
              onClick={() => {
                navigate('/login1'); // 跳轉到/target頁
              }}
            >
              登入
            </button>
          </div>
        </from> */}
        <form className="login" ref={form} onSubmit={sendEmail}>
          <div className="firstBtn">註冊</div>
          使用第三方帳戶登入/創立帳戶
          <div className="icon">
            <img className="pic" src={line} alt="" />
            <img className="pic" src={twitter} alt="" />
            <img className="pic" src={fackbook} alt="" />
            <button className="google" onClick={() => googlelogin()}></button>
          </div>
          <div className="email">
            <label>信箱</label>
            <input type="email" name="user_email" onChange={handleChange} />
          </div>
          <div className="name">
            <label>帳號</label>
            <input type="text" name="user_name" onChange={handleChange} />
          </div>
          <div className="password">
            <label>密碼</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="confirmPassword">
            <label>再輸入一次密碼</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <div className="btn-login">
            <input
              className="lastBtn"
              type="submit"
              value="註冊"
              disabled={!(member.user_email && captcha)}

              // disabled={!member.user_email && captcha === true ? true : false}
            />
            <button
              className="lastBtn"
              onClick={() => {
                navigate('/login1'); // 跳轉到/target頁
              }}
            >
              登入
            </button>
            <ReCAPTCHA
              sitekey="6Lezp0skAAAAAJuZseTkpiebbdVpYBDp3tyM6n_6"
              onChange={onChange}
            />
          </div>
        </form>
        <img className="pic" src={bgimg} alt="" />
      </div>
    </>
  );
}

export default Demo;
