import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Calendar from './HotelConponent/Calendar/Calendar';

const Hotel = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Hotel;
