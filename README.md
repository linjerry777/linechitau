# linechitau
### `npm start`

在開發模式下運行應用程序。
在瀏覽器中打開http://localhost:3000即可查看。

### `MySQL、環境變數`
根據.env設置 這邊已經提供配置好的



<h3>我負責的部分是會員相關功能。其中包括：</h3>

<li>會員註冊、登入、登出 <br>
<li>LinePay金流串接<br>
<li>使用reCAPTCHA技術防止機器人帳號註冊<br>
<li>系統發送驗證信到該會員的信箱<br>
<li>使用JWT Token來判斷用戶是否登入，並將會員資料存儲在Token中<br>
<li>使用useContext將資料接收，以便網站可以得到使用者的相關資料<br>
<li>登出部分會將會員狀態清除，以確保未登入用戶無法訪問某些內容<br>

<h3>會員中心具體功能如下：</h3>

<li>會員訂單：可以查看最近3筆訂單，點擊查看全部則可以查看所有訂單，點擊查看更多則可以看到更詳細的訂單資訊<br>
<li>優惠券功能：可以查看自己所擁有的優惠券，並且可以輸入正確的優惠碼以兌換優惠券。<br>
<li>我的最愛功能，會員可以將喜愛的飯店或行程加入到自己的收藏夾中，方便隨時查看。<br>
<li>RWD切版，確保網站能夠在不同的設備上都有較好的顯示效果。<br>
<li>Toast吐司條右上角提醒用戶在何頁面
