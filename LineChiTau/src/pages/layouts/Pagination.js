import React from 'react';
import './Pagination.scss';
const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="page">
      {pages.map((v, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              setCurrentPage(v);
            }}
            className={
              currentPage === v
                ? 'pagenation-border px-2 my-p px-2 active'
                : 'pagenation-border px-2 my-p px-2'
            }
          >
            {v}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
