import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../static/scss/board.scss';
import axios from 'axios';
import Comment from '../comment';
import '../../static/fontawesome/css/all.css';
const Post = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const postApi = async () =>
      await axios
        // .get('https://jsonplaceholder.typicode.com/posts')
        .get('http://localhost:4000/test')
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    postApi();
  }, []);

  // console.log(data);
  const params = useParams();
  const desc = data.map((v) => v.content);
  const user = data.map((v) => v.name);
  const title = data.map((v) => v.title);

  return (
    <div className='boardcontainer'>
      <section className='articleTitle'>
        제목: {title[params.no - 1]} <hr />
        <div className='contents'>
          <div className='header'>
            <i className='fas fa-user' /> &nbsp;작성자: {user[params.no - 1]}
          </div>
          <div className='contents-view'>{desc[params.no - 1]}</div>
        </div>
      </section>
      <section className='post-react'>
        <button className='like-button'>
          <i className='fas fa-thumbs-up' />
          <br />
          좋아요
        </button>

        <button className='hate-button'>
          <i className='fas fa-thumbs-down' />
          <br />
          싫어요
        </button>
      </section>
      <section className='comment-wrapper'>
        <Comment />
      </section>
    </div>
  );
};

export default Post;
