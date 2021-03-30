import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Comment = () => {
  const [commentData, setCommentData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [comments, setComments] = useState([]);
  const params = useParams();
  const ddd = useRef();

  useEffect(() => {
    const commentApi = async () => {
      await axios
        // .get('https://jsonplaceholder.typicode.com/comments')
        .get('http://localhost:4000/test2')
        .then((res) => setCommentData(res.data))
        .catch((err) => console.log(err));
    };
    commentApi();
  }, []);

  const reply = () => {
    axios
      .post('http://localhost:4000/test2', {
        post_id: parseInt(params.no),
        comment: userInput,
        commenter: parseInt(params.no - 1),
        created_at: new Date(),
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const filtering = commentData.filter(
    (v) => v.post_id === parseInt(params.no)
  );
  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!userInput) {
        e.preventDefault();
      } else {
        handleComment();
      }
    }
  };

  const onClick = (e) => {
    if (!userInput) {
      e.preventDefault();
    } else {
      handleComment();
    }
  };
  const handleComment = () => {
    setComments(comments.concat(userInput));
    reply();
    setUserInput('');
  };

  const RemoveClass = () => {
    const test = document.querySelector('.comment-header');
    test.classList.remove('comment-header');
  };

  return (
    <div>
      <div className='comment-counter'>
        <i className='far fa-comment-dots' /> 댓글 {filtering.length}개
      </div>
      {commentData.map((comment) => (
        <div key={comment.id}>
          {comment.post_id === parseInt(params.no) ? (
            <div className='comment'>
              <div className='comment-header'>
                {comment.commenter} <i className='fas fa-reply' />
              </div>
              <div className='reply-content'>{comment.comment}</div>
            </div>
          ) : null}
        </div>
      ))}

      {comments.map((text, idx) => (
        <div className='comment'>
          <div className='comment-header'>
            {params.no - 1} <i className='fas fa-reply' />
          </div>
          <div className='reply-content'>{text}</div>
        </div>
      ))}
      <div className='comment-input-wrapper'>
        <textarea
          className='comment-input'
          placeholder='댓글을 입력해주세요.'
          onChange={onChange}
          onKeyUp={onKeyPress}
          value={userInput}
          ref={ddd}
        />
        <div className='comment-button-wrapper'>
          <button className='comment-button' onClick={onClick}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
