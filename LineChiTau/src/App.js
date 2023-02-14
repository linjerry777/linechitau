import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import './css/global.css';
import Profile from './pages/Profile/Profile';
import HotelHome from './pages/Hotel/pages/HotelHome';
import Payment from './pages/Payment/layout/Payment';
import ShoppingCart from './pages/Payment/ShoppingCart/ShoppingCart';
import TravelPaymentDetail from './pages/Payment/PaymentDetail/TravelPaymentDetail';
import TravelPaymentCheckOut from './pages/Payment/PaymentCheckOut/TravelPaymentCheckOut';
import HotelPaymentDetail from './pages/Payment/PaymentDetail/HotelPaymentDetail';
import HotelPaymentCheckOut from './pages/Payment/PaymentCheckOut/HotelPaymentCheckOut';
import Navbar from './pages/layouts/Navbar';
import Footer from './pages/layouts/Footer';
import List from './pages/Profile/pages/List/List';
import Coupon from './pages/Profile/pages/Coupon/Coupon';
import Mylove from './pages/Profile/pages/Mylove/Mylove';
import Message from './pages/Profile/pages/Message/Message';
import Pay from './pages/Profile/pages/Pay/Pay';
import Setting from './pages/Profile/pages/Setting/Setting';
import ListDetail from './pages/Profile/pages/List/ListDetail/ListDetail';
import Demo from './utils/Demo';
import TripList from './pages/TripList/TripList';
import TripProductDetails from './pages/TripProductDetails/TripProductDetails';

import { JwtCsrfTokenProvider } from './utils/csrf-hook/useJwtCsrfToken';

import Login from './utils/Login';
import Hotellist from './pages/Hotel/pages/Hotellist';
import HotelDetail from './pages/Hotel/pages/HotelDetail';
import Hotel from './pages/Hotel/Hotel';
import Alllist from './pages/Profile/pages/List/Alllist';
import ScrollToTop from './pages/layouts/ScrollToTop';
import Token from './utils/Token';
import Order from './pages/Profile/pages/List/Order/Payment/Order';
import Confirm from './pages/Profile/pages/List/Order/Payment/Confirm';
import Cancel from './pages/Profile/pages/List/Order/Payment/Cancel';
import CheckTransaction from './pages/Profile/pages/List/Order/Payment/CheckTransaction';
function App() {
  return (
    <>
      <JwtCsrfTokenProvider>
        <Navbar />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Hotel />}>
              <Route index element={<HotelHome />}></Route>
              <Route path="/HotelHome" element={<HotelHome />} />
              <Route path="/Hotellist/:region" element={<Hotellist />} />
              <Route
                path="/HotelDetail/:companyName"
                element={<HotelDetail />}
              />
            </Route>
            <Route path="TripList" element={<TripList />}></Route>
            <Route
              path="TripProductDetails/:URLkeyword"
              element={<TripProductDetails />}
            ></Route>

            <Route path="login" element={<Demo />} />
            <Route path="token/:token" element={<Token />} />
            <Route path="login1" element={<Login />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<List />} />
              <Route path="list" element={<List />} />
              <Route path="alllist" element={<Alllist />} />
              <Route path="listdetail/:id" element={<ListDetail />} />

              <Route path="pay-order/:id" element={<Order />} />
              <Route path="pay-confirm" element={<Confirm />} />
              <Route path="pay-cancel" element={<Cancel />} />
              <Route
                path="pay-check-transaction"
                element={<CheckTransaction />}
              />

              <Route path="coupon" element={<Coupon />} />
              <Route path="mylove" element={<Mylove />} />
              <Route path="message" element={<Message />} />
              <Route path="pay" element={<Pay />} />
              <Route path="setting" element={<Setting />} />
            </Route>
            <Route path="ShoppingCart" element={<ShoppingCart />} />
            <Route path="/payment" element={<Payment />}>
              <Route path="Hotel/Detail" element={<HotelPaymentDetail />} />
              <Route
                path="Hotel/CheckOut/:orderId"
                element={<HotelPaymentCheckOut />}
              />
              <Route path="Travel/Detail" element={<TravelPaymentDetail />} />
              <Route
                path="Travel/CheckOut/:orderId"
                element={<TravelPaymentCheckOut />}
              />
            </Route>
          </Routes>
        </ScrollToTop>

        <Footer />
      </JwtCsrfTokenProvider>
    </>
  );
}

export default App;
