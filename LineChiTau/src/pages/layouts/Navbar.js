import React, { useContext } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { JwtCsrfTokenContext } from '../../utils/csrf-hook/useJwtCsrfToken';
import axios from 'axios';

const Navbar = () => {
  const { init, jwtToken, logout } = useContext(JwtCsrfTokenContext);
  init(axios);
  let toLink = '';
  const linkList = ['旅遊行程', '訂房住宿', '會員中心'];

  return (
    <div className="container-fluid fill-background">
      <div className="navbar d-flex align-items-center justify-content-around m-auto p-0">
        <div className="logo-box">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <ul className="navbar-btn list-unstyled d-flex justify-content-around align-items-center m-0">
          {linkList.map((list, index) => {
            switch (list) {
              case '旅遊行程':
                toLink = 'TripList';
                break;
              case '訂房住宿':
                toLink = '/';
                break;
              case '會員中心':
                toLink = '/profile';
                break;
              default:
                toLink = '/404';
                break;
            }
            return (
              <>
                <li className="mx-3" key={index}>
                  <Link className="nav-foot text-decoration-none" to={toLink}>
                    {list}
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
        <div className="d-flex align-items-center">
          <div>
            <Link className="my-btn nav-foot-small mx-2" to={'/login'}>
              註冊
            </Link>
          </div>
          <div>
            {jwtToken ? (
              <div>
                <Link
                  className="my-btn nav-foot-small mx-2 "
                  onClick={() => logout()}
                  to={'/login'}
                >
                  登出
                </Link>
              </div>
            ) : (
              <div>
                <Link className="my-btn nav-foot-small mx-2  " to={'/login1'}>
                  登入
                </Link>
              </div>
            )}
          </div>

          <div>
            <Link
              className="nav-foot text-decoration-none"
              to={'/ShoppingCart'}
            >
              <button className="my-btn nav-foot-small cart mx-2 pt-2 pb-1 px-0">
                <span className="material-symbols-outlined ">
                  shopping_cart
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
