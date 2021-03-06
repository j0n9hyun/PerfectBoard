import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Comment = () => {
  const [commentData, setCommentData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [comments, setComments] = useState<any>([]);
  const params = useParams<any>();
  const ddd = useRef<any>();

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

  function reply() {
    axios
      .post('http://localhost:4000/test2', {
        post_id: parseInt(params.no),
        comment: userInput,
        commenter: params.no - 1,
        created_at: new Date(),
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  interface CommentProps {
    id: number,
    Replies: never[],
    post_id: number,
    commenter: number,
    commenter_id: number,
    comment: string,
  }

  interface ReplyProps {
    commenter_id: number,
    reply: string,
  }


  const filtering = commentData.filter(
    (v: any) => v.post_id === parseInt(params.no)
  );

  const filtering2 = commentData.map(({Replies}: CommentProps) => Replies.filter(({commenter_id} : ReplyProps ) => commenter_id === parseInt(params.no)));

  function onChange (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(e.target.value);
  };

  function onKeyPress (e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      if (!userInput) {
        e.preventDefault();
      } else {
        handleComment();
      }
    }
  };

  function onClick (e: React.MouseEvent<HTMLButtonElement>) {
    if (!userInput) {
      e.preventDefault();
    } else {
      handleComment();
    }
  };

  function handleComment() {
    setComments(comments.concat(userInput));
    reply();
    setUserInput('');
  };

  return (
    <div>
      <div className='comment-counter'>
        <i className='far fa-comment-dots' /> ?????? {filtering.length === 0 ? 0 : filtering.length + Object(filtering2[params.no-1]).length}??? 
      </div>
      {commentData.map((comment: CommentProps) => (
        <div key={comment.id}>
          {comment.post_id === parseInt(params.no) ? (
            <div className='comment'>
              <div className='comment-header'>
                {comment.commenter} <i className='fas fa-reply' />
              </div>
              <div className='reply-content'>{comment.comment}</div>
              <div>
              </div>
            </div>
          ) : null}

          {comment.Replies.map((v: ReplyProps) => (
            <div> 
            {comment.commenter_id === parseInt(params.no) ? (
              <div className='comment reply'>
                <div className='comment-header'> ????????? <i className='fas fa-reply'/></div>
                <div className='reply-content'>
                  {`${v.reply}`}
                </div>
              </div>
            ): null}
            </div>
          ))}
        </div>
      ))}

      {comments.map((text: string) => (
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
          placeholder='????????? ??????????????????.'
          onChange={onChange}
          onKeyUp={onKeyPress}
          value={userInput}
          ref={ddd}
        />
        <div className='comment-button-wrapper'>
          <button className='comment-button' onClick={onClick}>
            ??????
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;