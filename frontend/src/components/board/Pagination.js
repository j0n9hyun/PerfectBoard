import React, { useEffect } from 'react';

const Pagination = ({ paginate, perPage, totalPosts, currentPage }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / perPage); i++) {
    pageNumber.push(i);
  }

  // console.log(pageNumber);
  useEffect(() => {
    let lists = document.querySelectorAll('.pagination');
    for (let i = 0; i < lists.length; ++i) {
      if (currentPage - 1 === i) {
        lists[i].classList.add('active');
      } else {
        lists[i].classList.remove('active');
      }
    }
  });

  return (
    <>
      {pageNumber.map((pageNum) => (
        <li
          key={pageNum}
          className='pagination'
          onClick={() => paginate(pageNum)}
        >
          {pageNum}
        </li>
      ))}
    </>
  );
};

export default Pagination;
