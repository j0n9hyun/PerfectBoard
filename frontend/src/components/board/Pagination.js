import React, { useEffect } from 'react';

const Pagination = ({ paginate, perPage, totalPosts }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / perPage); i++) {
    pageNumber.push(i);
  }
  useEffect(() => {
    let lists = document.querySelector('table');
    document.addEventListener('click', function () {
      lists.classList.add('active');
    });
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
