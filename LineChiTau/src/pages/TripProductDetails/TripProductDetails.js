import './TripProductDetails.scss';
import ProductPictures from './DetailComponet/ProductPictures/ProductPictures';
import SummaryNav from './DetailComponet/SummaryNav/SummaryNav';
import ListMap from '../layouts/ListMap/ListMap';
import MainSelector from './DetailComponet/MainSelector/MainSelector';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TripIntro from './DetailComponet/TripIntro/TripIntro';
// import { add } from 'date-fns';
// import TripRecommend from './DetailComponet/TripRecommend/TripRecommend';
// import Comment from './DetailComponet/Comment/Comment';

export default function TripProductDetail() {
  //! state: 1.fetch 產品取得的資料 2. fetch 訂單取得的資料
  const [returnedData, setReturnedData] = useState({
    tripData: [],
    planData: [],
  });
  const [tripId, setTripID] = useState();
  const [tripName, setTripName] = useState();
  const [serviceArr, setServiceArr] = useState();
  const [address, setAddress] = useState();
  const [introduction, setIntroduction] = useState();
  const [introPic, setIntroPic] = useState();
  const [picIntro, setPicIntro] = useState();
  const [allPic, setAllPic] = useState();
  const [geoLocationX, setGeoLocationX] = useState();
  const [geoLocationY, setGeoLocationY] = useState();
  const [region, setRegion] = useState();
  const [grade, setGrade] = useState();
  const [cartPic, setCartPic] = useState();

  // const [ReturnedContractData, setReturnedContractData] = useState();

  //! fetch會用到的變數
  const { URLkeyword } = useParams();
  // const nowDate = new Date();

  //! 使用fetchData
  useEffect(() => {
    async function fetchData() {
      try {
        const returnedTripData = await axios.get(
          `http://localhost:3001/api/tripProductDetails/${URLkeyword}`
        );
        const returnedPlanData = await axios.get(
          `http://localhost:3001/api/tripProductDetails/${URLkeyword}/plans`
        );
        console.log(returnedTripData.data);
        console.log(returnedPlanData.data);
        setReturnedData({
          tripData: returnedTripData.data,
          planData: returnedPlanData.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    //! 在tripData的物件資料上加上service屬性
    console.log('returnedData', returnedData);
    const rawTripDataArr = returnedData.tripData;
    console.log(rawTripDataArr);
    console.log(typeof rawTripDataArr);
    const newTripData = rawTripDataArr.map((item) => {
      const {
        culture_history,
        amusement,
        meal,
        no_shopping,
        self_trip,
        guide_trip,
        mountain,
        in_water,
        snow,
      } = item;
      const ItemServiceList = [
        { service: '人文歷史', value: culture_history },
        { service: '娛樂享受', value: amusement },
        { service: '供餐', value: meal },
        { service: '無購物行程', value: no_shopping },
        { service: '自助旅行', value: self_trip },
        { service: '導遊帶隊', value: guide_trip },
        { service: '登山踏青', value: mountain },
        { service: '水上活動', value: in_water },
        { service: '雪上活動', value: snow },
      ];
      const ItemActualService = ItemServiceList.filter((v) => {
        return v.value !== 0;
      }).map((v) => {
        return v.service;
      });
      item.service = ItemActualService;
      return item;
    });
    console.log('NewTripData', newTripData);
    console.log('NewTripData[0]', newTripData[0]);
    const newTripDataObj = newTripData[0];
    console.log(newTripDataObj);
    if (newTripDataObj) {
      const {
        trip_id,
        trip_name,
        service,
        address,
        introduction,
        intro_pic,
        pic_intro,
        all_pic,
        geo_locationX,
        geo_locationY,
        region,
        comment_amount,
        comment_grade,
      } = newTripDataObj;
      const stringIntro = JSON.parse(introduction).introduction;

      const allPicArr = all_pic.split(',');
      const picForCart = allPicArr[0];

      setTripID(trip_id);
      setTripName(trip_name);
      setServiceArr(service);
      setAddress(address);
      setIntroduction(stringIntro);
      setIntroPic(intro_pic);
      setPicIntro(pic_intro);
      setAllPic(all_pic);
      setGeoLocationX(geo_locationX);
      setGeoLocationY(geo_locationY);
      setRegion(region);
      setGrade(comment_grade / comment_amount);
      setCartPic(picForCart);
    }
  }, [returnedData]);

  useEffect(() => {
    console.log(serviceArr);
  }, [serviceArr]);

  // useEffect(() => {
  //   console.log(returnedData.planData);
  // }, [returnedData]);

  console.log('outsideOfEffect', serviceArr);

  return (
    <>
      <div className="container-xxl" style={{ backgroundColor: 'white' }}>
        <ProductPictures />
        <div className="row mt-4">
          <div className="col-8 d-flex flex-column justify-content-between">
            <SummaryNav listItems={['行程介紹', '地圖', '評論區']} />
            <h3>{tripName === undefined ? 0 : tripName}</h3>
            <div className="d-flex">
              {serviceArr === undefined
                ? 0
                : serviceArr.map((v) => {
                    return (
                      <>
                        <div className="service">{v}</div>
                      </>
                    );
                  })}
            </div>
            <p className="my-p d-flex align-items-center">
              <span className="material-symbols-outlined address">
                location_on
              </span>
              {address === undefined ? 0 : address}
            </p>
          </div>

          <div className="col-4">
            <ListMap maxWidth={420} height={215} />
          </div>
        </div>
      </div>
      <div className="container-xxl" style={{ backgroundColor: 'white' }}>
        <div className="mt-3 d-flex justify-content-between">
          {returnedData.planData === undefined ? (
            0
          ) : (
            <MainSelector
              planData={returnedData.planData}
              tripId={tripId}
              tripName={tripName}
              cartPic={cartPic}
            />
          )}
        </div>
        <TripIntro tripIntroduction={introduction} />
        {/* <TripMap /> */}
        {/* <Comment/> */}
        {/* <TripRecommend/> */}
      </div>
    </>
  );
}
