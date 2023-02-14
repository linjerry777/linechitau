import React, { useEffect, useState } from 'react';
import './PopularSearch.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PopularSearch = () => {
  const [popularSearch, setPopularSearch] = useState([]);
  const [popularSearch2, setPopularSearch2] = useState([]);
  useEffect(() => {
    async function getPopularSearch() {
      let response = await axios.get(
        'http://localhost:3001/api/hotel/popularSearch'
      );
      setPopularSearch(response.data);
      let response2 = await axios.get(
        'http://localhost:3001/api/hotel/popularSearch2'
      );
      setPopularSearch2(response2.data);
    }
    getPopularSearch();
  }, []);
  return (
    <>
      <div class="popular-search py-5 container-xxl">
        <h4 class="title my-heading d-flex justify-content-center">熱門搜尋</h4>
        <div class="search-tag-box my-4">
          <ul className="d-flex list-unstyled d-flex justify-content-center">
            {popularSearch.map((v, i) => {
              return (
                <li key={i}>
                  <Link
                    to={`/HotelDetail/${v.company_name}`}
                    className="search-tag my-border-radius nav-foot mx-3 px-2"
                  >
                    {v.company_name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="d-flex list-unstyled d-flex justify-content-center">
            {popularSearch2.map((v, i) => {
              return (
                <li key={i}>
                  <Link
                    to={`/HotelDetail/${v.company_name}`}
                    className="search-tag my-border-radius nav-foot mx-3 px-2"
                  >
                    {v.company_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PopularSearch;
