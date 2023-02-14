import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './Footer.scss';
const Footer = () => {
  return (
    <div className="container-fluid fill-background">
      <footer className="row footer m-auto p-3">
        <div className="col-4">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <ul className="col-2 list-unstyled">
          <li className="nav-foot">Menu</li>
          <li className="my-p">Home</li>
          <li className="my-p">Tours</li>
          <li className="my-p">Category</li>
          <li className="my-p">About Us</li>
        </ul>
        <ul className="col-3 list-unstyled">
          <li className="nav-foot">Booking Plan</li>
          <li className="my-p">Personal Trip</li>
          <li className="my-p">Group Trip</li>
        </ul>
        <ul className="col-2 list-unstyled">
          <li className="nav-foot">Support</li>
          <li className="my-p">FAQ</li>
          <li className="my-p">Terms &amp; Conditions</li>
          <li className="my-p">Privacy Policy</li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
