import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Timer from './Timer';
import CheckoutLinepay from './CheckoutLinepay';
function Confirm() {
  // 重新導向用
  const navigate = useNavigate();
  // 獲取網址上的查詢字串用
  const location = useLocation();

  // 記錄確認後，line pay回傳訊息與代碼
  // {returnCode: '1172', returnMessage: 'Existing same orderId.'}
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  });

  // 重新導向(無transactionId或orderId時)
  const [shouldRedirect, setSouldRedirect] = useState(false);

  // 重新導向(無transactionId或orderId時)，導至首頁(或其它路由)
  useEffect(() => {
    if (shouldRedirect) {
      navigate('profile/');
    }
  });

  // 處理伺服器通知line pay已確認付款，為必要流程
  // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
  useEffect(() => {
    // ex.
    // http://localhost:3000/pay-confirm?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
    // 這裡要得到交易id
    const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get('transactionId');
    const orderId = searchParams.get('orderId');

    // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
    if (!transactionId || !orderId) {
      setSouldRedirect(true);
    }

    // TODO: 失敗處理，只有`returnCode:0000`才能算成功
    // 向server發送確認交易api
    if (transactionId) {
      axios
        .get(`api/pay/confirm?transactionId=${transactionId}`)
        .then((response) => {
          console.log(response);

          if (response.data.returnCode) {
            setResult({
              returnCode: response.data.returnCode,
              returnMessage: response.data.returnMessage,
            });
          }

          // line pay確認，有錯誤發生時
          if (response.data.error) {
            setResult({
              returnCode: response.data.error.data.returnCode,
              returnMessage: response.data.error.data.returnMessage,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <h1>已確認付款</h1>
      <Timer />
      <CheckoutLinepay />
      {/* <div>returnCode: {result.returnCode}</div>
      <div>returnMessage: {result.returnMessage}</div> */}
    </>
  );
}

export default Confirm;
