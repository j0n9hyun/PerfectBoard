import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../static/scss/board.scss';
import axios from 'axios';

const Post = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
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
  const title = data.map((v) => v.title);

  return (
    <div className='boardcontainer'>
      <section className='articleTitle'>
        제목: {title[params.no - 1]} <hr />
        <div className='contents'>
          <div className='header'>글쓴이: {user[params.no]}</div>
          {desc[params.no - 1]}
        </div>
      </section>
      <section className='comment-wrapper'>
        <div className='comment-counter'> 댓글 땡개 </div>
        <div className='comment'>
          <div className='comment-header'>닉네임</div>
          <div className='reply-content'>안녕하세요</div>
        </div>
      </section>
    </div>
  );
};

export default Post;
