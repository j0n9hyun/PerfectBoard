import React, { useState, useEffect } from 'react';
import '../../static/scss/board.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';

const BoardPage = () => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const postApi = async () => {
      await axios
        // .get('https://jsonplaceholder.typicode.com/posts')
        .get('http://localhost:4000/test')
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    };
    postApi();
  }, []);

  return (
    <>
      <div className='boardcontainer'>
        <section className='articleTitle'>
          자유페이지
          <div className='articleTitleDesc'>유저들의 자유로운 소통 공간!</div>
        </section>
        <section className='articleList'>
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th className='test'>제목</th>
                <th>글쓴이</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(({ title, name, id, created_at }: any) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    <Link to={`/post/${id}`}>
                      <div className='articles'>{title}</div>
                    </Link>
                  </td>
                  <td>{name}</td>
                  {/* <td>{date.getFullYear()}</td> */}
                  <td>{created_at.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className='paginationWrapper'>
          <Pagination
            paginate={paginate}
            perPage={perPage}
            totalPosts={data.length}
            currentPage={currentPage}
          />
        </section>
      </div>
    </>
  );
};

export default BoardPage;
