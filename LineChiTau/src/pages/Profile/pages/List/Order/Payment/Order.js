import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { JwtCsrfTokenContext } from '../../../../../../utils/csrf-hook/useJwtCsrfToken';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import './Order.scss';
function Order(props) {
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);

  const [order, setOrder] = useState({});
  const { id } = useParams();
  const [productName1, setProductName1] = useState('測試商品1');
  const [price1, setPrice1] = useState(100);
  const [quantity1, setQuantity1] = useState(1);

  const [productName2, setProductName2] = useState('測試商品2');
  const [price2, setPrice2] = useState(100);
  const [quantity2, setQuantity2] = useState(2);
  const detailList = async () => {
    const [res, resdetail] = await Promise.all([
      fetch(
        `http://localhost:3001/api/userlist/list/${jwtDecodedData.email}/${id}`
      ),
      fetch(
        `http://localhost:3001/api/userlist/listdetail/${jwtDecodedData.email}/${id}`
      ),
    ]);
    const listdata = await res.json();
    const listdatadetail = await resdetail.json();
    return { listdata, listdatadetail };
  };

  const { data, isLoading, isError } = useQuery(
    ['listdetail', jwtDecodedData.email, id],
    detailList,
    {
      cacheTime: 1000,
    }
  );
  let result, detail;
  if (data === undefined) {
    return <>Loading...</>;
  }
  const { listdatadetail, listdata } = data;
  console.log('data', listdata);

  if (listdata.error) {
    return <>error</>;
  }
  if (data !== undefined) {
    [result] = listdata;
    detail = listdatadetail;
  }

  console.log('data', listdata);
  console.log('listdatadetail', listdatadetail);

  const handleLinePay = async () => {
    confirmAlert({
      title: '確認付款',
      message: '確認要導向至LINE Pay進行付款？',
      buttons: [
        {
          label: '確定',
          onClick: () => {
            console.log(
              `http://localhost:3001/api/pay/reserve?orderId=${order.orderId}`
            );
            window.location.href = `http://localhost:3001/api/pay/reserve?orderId=${order.orderId}`;
            // 在本window直接導至node付款(reverse)url，之後會導向至line pay
            /*  window.location.href =
              process.env.REACT_APP_PAYMENT_API_URL +
              '?orderId=' +
              order.orderId */
          },
        },
        {
          label: '取消',
          onClick: () => {},
        },
      ],
    });
    const insertresponse = await axios.post(
      `/api/userlist/order/${result.order_id}/${order.orderId}`
    );
    console.log(order.orderId);
  };

  const createOrder = async () => {
    // 送至server建立訂單，packages與order id由server產生
    // products將會組合在packages屬性之下
    const response = await axios.post(`/api/pay/create-order`, {
      amount: result.total_amount * result.total_price,
      products: [
        {
          id: 'prod1',
          name: result.company_name,
          quantity: result.total_amount,
          price: result.total_price,
        },
        // {
        //   id: 'prod2',
        //   name: productName2,
        //   quantity: quantity2,
        //   price: price2,
        // },
      ],
    });

    // TODO: try-catch錯誤處理
    setOrder(response.data);
  };

  return (
    <div className="pay-order">
      <h1>購買商品清單</h1>
      {/* <p>
        訂單JSON結構參考`order-demo-only.json`檔案，packages id與order
        id將由server產生
      </p> */}
      <div>
        <div className="line-name my-2">
          <label htmlFor="" className="mx-2">
            商品:
          </label>
          <input
            type="text"
            name="productName1"
            value={result.company_name}
            onChange={(e) => {
              setProductName1(e.target.value);
            }}
            disabled
          />
        </div>
        <div className="line-amount my-2">
          <label htmlFor="" className="mx-2">
            數量:
          </label>
          <input
            type="number"
            name="quantity1"
            // value={quantity1 === 0 ? '' : quantity1}
            value={result.total_amount}
            onChange={(e) => {
              setQuantity1(Number(e.target.value));
            }}
            disabled
          />
        </div>
        <div className="line-price">
          <label htmlFor="" className="mx-2">
            單價:
          </label>

          <input
            type="number"
            name="price1"
            // value={price1 === 0 ? '' : price1}
            value={result.total_price}
            onChange={(e) => {
              setPrice1(Number(e.target.value));
            }}
            disabled
          />
        </div>
        <br />
        小計: {result.total_amount * result.total_price}
      </div>
      <hr />
      {/*  <div>
        id=prod2 商品名稱:
        <br />
        <input
          type="text"
          name="productName2"
          value={productName2}
          onChange={(e) => {
            setProductName2(e.target.value);
          }}
        />
        數量:
        <input
          type="number"
          name="quantity2"
          value={quantity2 === 0 ? '' : quantity2}
          onChange={(e) => {
            setQuantity2(Number(e.target.value));
          }}
        />
        單價:
        <input
          type="number"
          name="price2"
          value={price2 === 0 ? '' : price2}
          onChange={(e) => {
            setPrice2(Number(e.target.value));
          }}
        />
        <br />
        小計: {quantity2 * price2}
      </div> */}
      <br />
      總價: {result.total_amount * result.total_price}
      <button className="my-btn mx-2" onClick={createOrder}>
        確認付款
      </button>
      <hr />
      <h2>訂單明細</h2>
      <p>Order ID: {order.orderId}</p>
      <p>總金額: {order.orderId && order.amount}</p>
      {order.orderId &&
        order.packages[0].products.map((v, i) => {
          return (
            <div key={i}>
              {v.name}/{v.quantity}/{v.price}
            </div>
          );
        })}
      <img
        alt=""
        src={`${process.env.REACT_APP_REACT_URL}/linepay/LINE-Pay(h)_W85_n.png`}
      />
      <button
        className="my-btn"
        onClick={handleLinePay}
        // 限制有orderId產生後才能點按
        disabled={!order.orderId}
      >
        前往付款
      </button>
    </div>
  );
}

export default Order;
