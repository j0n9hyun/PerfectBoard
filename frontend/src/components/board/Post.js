import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../../static/scss/board.scss';
import axios from 'axios';

const Post = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let lists = document.querySelector('table');
    lists.classList.add('active');
    const postApi = async () =>
      await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    postApi();
  }, []);
  const params = useParams();
  const desc = data.map((v) => v.body);
  const user = data.map((v) => v.userId);
  return (
    <div className='boardcontainer'>
      <section className='articleTitle'>
        {user[params.no]}님의 게시글
        <div className='articleTitleDesc'>유저들의 자유로운 소통 공간!</div>
        {desc[params.no]}
      </section>
    </div>
  );
};

export default Post;
