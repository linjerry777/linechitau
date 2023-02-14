import './TripList.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductsCard from './ListComponent/ProductsCard/ProductsCard';
import ListMap from '../layouts/ListMap/ListMap';
import FilterBox from './ListComponent/FilterBox/FilterBox';
import SortSelect from './ListComponent/SortSelect/SortSelect';
// import Pagination from './ListComponent/Pagination/Pagination';
// import TripSearchBar from './ListComponent/TripSearchBar/TripSearchBar';
// import { useParams } from 'react-router-dom';

export default function TestList() {
  //TODO 更新收藏資料庫、
  //TODO 將從API調出的資料傳進去產品卡片

  const URLRawkeyword = '台北';
  // const [newRawKeyword, setNewRawKeyword] = useState();

  //將回傳資料設為本元件的state
  const [returnedTripData, setReturnedTripData] = useState([]);
  //將回傳資料加上Service屬性並儲存
  const [serviceAddedData, setServiceAddedData] = useState([]);
  //最終要render成卡片的資料
  const [dataForDisplay, setDataForDisplay] = useState([]);

  //!處理關鍵字的函式

  function makeRawKeywordsAnArr(URLRawkeyword) {
    const URLRawKeywordArr = URLRawkeyword.split(' ');
    console.log('生成未分類關鍵字陣列', URLRawKeywordArr);
    return URLRawKeywordArr;
  }
  function seperateRawKeywordArr(URLRawKeywordArr, isRegion) {
    const name = [];
    const region = [];
    URLRawKeywordArr.forEach((element) => {
      if (isRegion(element)) {
        region.push(element);
      } else {
        name.push(element);
      }
    });
    return [name, region];
  }
  function isRegion(element) {
    const regionArr = [
      '基隆',
      '宜蘭',
      '台北',
      '桃園',
      '新竹',
      '苗栗',
      '台中',
      '彰化',
      '南投',
      '雲林',
      '嘉義',
      '台南',
      '高雄',
      '屏東',
      '台東',
      '花蓮',
      '澎湖',
      '金門',
      '馬祖',
      '蘭嶼',
    ];
    if (regionArr.includes(element)) {
      return true;
    } else {
      return false;
    }
  }

  //!藉由關鍵字獲取資料的函式

  async function fetchData(regionKeywordArr, nameKeywordArr) {
    const regionKeyword =
      regionKeywordArr[0] !== undefined ? regionKeywordArr[0] : 'none';
    const nameKeyword =
      nameKeywordArr[0] !== undefined ? nameKeywordArr.join('&') : 'none';
    try {
      if (
        URLRawkeyword !== 'all' &&
        (regionKeywordArr[0] || nameKeywordArr[0])
      ) {
        const dataArr = await axios.get(
          `http://localhost:3001/api/tripList/r=${regionKeyword}+n=${nameKeyword}`
        );
        setReturnedTripData(dataArr.data);
      } else if (URLRawkeyword === 'all') {
        const dataArr = await axios.get(
          `http://localhost:3001/api/tripList/all`
        );
        setReturnedTripData(dataArr.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //! filter時會使用的state
  // 行程特色
  const [selectedServiceFilter, setSelectedServiceFilter] = useState([]);

  const tripServiceList = [
    '人文歷史',
    '娛樂享受',
    '登山踏青',
    '戲水活動',
    '雪上活動',
    '無購物行程',
    '供餐',
    '自助旅行',
    '導遊帶隊',
  ];
  // 價格單選
  const [priceRange, setPriceRange] = useState('所有');

  const tripPriceArr = [
    '所有',
    '0001~2000',
    '2001~4000',
    '4001~6000',
    '6001~8000',
    '8001以上',
  ];

  //! filter函式
  const handlePriceRange = (serviceAddedData, priceRange) => {
    let filteredData = [...serviceAddedData];

    switch (priceRange) {
      case '0001~2000':
        filteredData = serviceAddedData.filter((item) => {
          return item.price_adu >= 1 && item.price_adu <= 2000;
        });
        break;
      case '2001~4000':
        filteredData = serviceAddedData.filter((item) => {
          return item.price_adu >= 2001 && item.price_adu <= 4000;
        });
        break;
      case '4001~6000':
        filteredData = serviceAddedData.filter((item) => {
          return item.price_adu >= 4001 && item.price_adu <= 6000;
        });
        break;
      case '6001~8000':
        filteredData = serviceAddedData.filter((item) => {
          return item.price_adu >= 6001 && item.price_adu <= 8000;
        });
        break;
      case '8001以上':
        filteredData = serviceAddedData.filter((item) => {
          return (
            item.price_adu >= 8001 && item.price_adu <= Number.MAX_SAFE_INTEGER
          );
        });
        break;
      default:
        break;
    }

    return filteredData;
  };
  const handleSelectedServiceFilter = (
    serviceAddedData,
    selectedServiceFilter
  ) => {
    let filteredData = [...serviceAddedData];
    if (selectedServiceFilter.length > 0) {
      filteredData = [...filteredData].filter((item) => {
        let isFound = false;

        const itemService = item.service.join('');

        for (let i = 0; i < selectedServiceFilter.length; i++) {
          if (itemService.includes(selectedServiceFilter[i])) {
            isFound = true;
            break;
          }
        }
        return isFound;
      });
    }
    return filteredData;
  };

  //! Sort使用的state 和 函式

  const [sortBy, setSortBy] = useState('1');

  const handleSort = (serviceAddedData, sortBy) => {
    let filteredData = [...serviceAddedData];
    // 以價格排序-高到低
    if (sortBy === '1') {
      filteredData = [...filteredData].sort(
        (a, b) => a.price_adu - b.price_adu
      );
    }
    // 以價格排序-低到高
    if (sortBy === '2') {
      filteredData = [...filteredData].sort(
        (a, b) => b.price_adu - a.price_adu
      );
    }
    //以 評價排序 高到低
    if (sortBy === '3') {
      filteredData = [...filteredData].sort(
        (a, b) =>
          a.comment_grade / a.comment_amount -
          b.comment_grade / b.comment_amount
      );
    }
    if (sortBy === '4') {
      filteredData = [...filteredData].sort(
        (a, b) =>
          a.comment_grade / a.comment_amount -
          b.comment_grade / b.comment_amount
      );
    }
    return filteredData;
  };

  //! fetch 資料庫
  useEffect(() => {
    const [nameKeywordArr, regionKeywordArr] = seperateRawKeywordArr(
      makeRawKeywordsAnArr(URLRawkeyword),
      isRegion
    );
    fetchData(regionKeywordArr, nameKeywordArr);
  }, []);

  //! 將fetch過的資料加上 service 屬性
  useEffect(() => {
    const ArrangedData = returnedTripData.map((item) => {
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
      //替每個row創立一個陣列
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
      //將這陣列篩選，並把其中的字串取出來
      const ItemActualService = ItemServiceList.filter((v) => {
        return v.value !== 0;
      }).map((v) => {
        return v.service;
      });
      //將字串加進原本的元素中
      item.service = ItemActualService;
      return item;
    });
    setServiceAddedData(ArrangedData);
  }, [returnedTripData]);

  console.log('加上sevice的Data', serviceAddedData);
  console.log('現在的價錢篩選', priceRange);
  console.log('現在的條件篩選', selectedServiceFilter);
  console.log('篩選完的data', dataForDisplay);
  //! 當資料第一次載入和當表單有更動時，開始篩選
  useEffect(() => {
    let filteredData = [];
    filteredData = handlePriceRange(serviceAddedData, priceRange);
    filteredData = handleSelectedServiceFilter(
      filteredData,
      selectedServiceFilter
    );
    setDataForDisplay(filteredData);
  }, [priceRange, selectedServiceFilter, serviceAddedData]);

  //!渲染從搜尋關鍵字獲取的資料
  const renderReturnedTripData = returnedTripData.map((e, i) => {
    return (
      <ProductsCard
        key={i}
        tripName={e.trip_name}
        introduction={e.introduction}
        region={e.region}
      />
    );
  });
  // 沒結果的話
  const thereIsNoReturnedTripData = () => {
    return (
      <>
        <div className="container-fluid d-flex justify-content-center align-items-center my-topic">
          查無結果
        </div>
      </>
    );
  };

  return (
    <>
      {/* <TripSearchBar setNewRawKeyword={setNewRawKeyword} /> */}
      <div className="page-wrapper container-xl">
        <div className="result-sort d-flex justify-content-between align-items-end">
          <p className="result my-topic">
            關鍵字：共 {dataForDisplay ? dataForDisplay.length : 0} 項 結果
          </p>
          <SortSelect setSortBy={setSortBy} sortBy={sortBy} />
        </div>
        <div className="row mb-5">
          <div className="col-3 px-3">
            <ListMap />
            <div className="filter-wrapper mx-auto">
              <div className="filter-container my-border-radius m-auto mt-3">
                <div className="filter-box px-5 py-3">
                  <h5 className="filter-box-title nav-foot">目的地</h5>
                </div>
              </div>
              <FilterBox
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                tripPriceArr={tripPriceArr}
                selectedServiceFilter={selectedServiceFilter}
                setSelectedServiceFilter={setSelectedServiceFilter}
                tripServiceList={tripServiceList}
              />
            </div>
          </div>
          <div className="col-9 ">
            {dataForDisplay.map((item) => (
              <ProductsCard
                key={item.trip_id}
                tripName={item.trip_name}
                introduction={item.introduction}
                service={item.service}
                price_adu={item.price_adu}
                grade={item.comment_grade / item.comment_amount}
                pic={item.intro_pic}
              />
            ))}
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </>
  );
}
