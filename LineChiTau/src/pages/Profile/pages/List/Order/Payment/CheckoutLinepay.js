import React, { useState, useContext, useEffect } from 'react';
import {
  useParams,
  useNavigate,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';

import { motion, Reorder } from 'framer-motion';
import { useQuery } from 'react-query';
import { JwtCsrfTokenContext } from '../../../../../../utils/csrf-hook/useJwtCsrfToken';

const CheckoutLinepay = ({ value }) => {
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  console.log('userF', userF.email);
  console.log(jwtToken);
  console.log('jwtDecodedData', jwtDecodedData);
  const [items, setItems] = useState({});
  console.log(jwtDecodedData.email);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');
  console.log(orderId);
  /*  const urlParams = new URLSearchParams(new URL(url).search);
  const orderId = urlParams.get('orderId');
   */

  useEffect(() => {
    const check = async () => {
      const response = await axios.get(`/auth/order/${orderId}`);
    };
    check();
  }, [jwtToken]);
  return <></>;
};

export default CheckoutLinepay;
