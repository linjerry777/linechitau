import React, { useState, useEffect, useContext } from 'react';
import './UserLikeBookmark.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';

function UserLikeBookmark({ hotel, position, setLove }) {
  const navigate = useNavigate();
  const { jwtToken, init, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  init(axios);
  const [userLikeList, setUserLikeList] = useState([]);
  const [userLikeListObject, setUserLikeListObject] = useState({});
  useEffect(() => {
    async function getUserLikeList() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelDetail/userLike/${jwtDecodedData.email}`
      );
      setUserLikeList(response.data);
      // console.log('setUserLikeList', response.data);
    }
    if (jwtToken) getUserLikeList();
  }, []);
  useEffect(() => {
    const result = {};
    userLikeList.forEach((v) => {
      result[v.company_name] = v.valid;
    });
    // console.log('result', result);
    setUserLikeListObject(result);
  }, [userLikeList]);
  // console.log('UserLikeListObject', userLikeListObject);
  const postUserLikeDB = async function (url, userEmail, hotel, valid) {
    let response = await axios.post(url, {
      email: userEmail,
      hotel: hotel,
      valid: valid,
    });
    async function getUserLikeList() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelDetail/userLike/${jwtDecodedData.email}`
      );
      setUserLikeList(response.data);
      // console.log('setUserLikeList', response.data);
    }
    if (jwtToken) getUserLikeList();
    // console.log(response.data);
  };

  const postNewUserLikeDB = async function (url, userEmail, hotel, valid) {
    let response = await axios.post(url, {
      email: userEmail,
      hotel: hotel,
      valid: valid,
    });
    async function getUserLikeList() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelDetail/userLike/${jwtDecodedData.email}`
      );
      setUserLikeList(response.data);
      // console.log('setUserLikeList', response.data);
    }
    if (jwtToken) getUserLikeList();
    // console.log(response.data);
  };
  return (
    <div className="bookmark-conp">
      <span
        className={`material-symbols-rounded my-p ${position} recommand-tag ${
          userLikeListObject[hotel] === 1 ? 'bookmark-active' : 'bookmark'
        }`}
        onClick={() => {
          if (
            Object.keys(userLikeListObject).includes(hotel) &&
            userLikeListObject[hotel] == 1
          ) {
            postUserLikeDB(
              `http://localhost:3000/auth/setUserLikeValid`,
              jwtDecodedData.email,
              hotel,
              0
            );
          } else if (
            Object.keys(userLikeListObject).includes(hotel) &&
            userLikeListObject[hotel] == 0
          ) {
            postUserLikeDB(
              `http://localhost:3000/auth/setUserLikeValid`,
              jwtDecodedData.email,
              hotel,
              1
            );
          } else if (
            !Object.keys(userLikeListObject).includes(hotel) &&
            jwtToken
          ) {
            postNewUserLikeDB(
              `http://localhost:3000/auth/setNewUserLike`,
              jwtDecodedData.email,
              hotel,
              1
            );
          } else {
            navigate('/Login');
          }
        }}
      >
        bookmark
      </span>
    </div>
  );
}

export default UserLikeBookmark;
