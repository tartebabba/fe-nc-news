import { useEffect, useState } from 'react';
import { getArticleComments } from '../utils/apis';
import moment from 'moment';
import SubmitComment from './SubmitComment';

export default function Comments({ id }) {
  const [articleComments, setArticleComments] = useState([]);
  const [params, setParams] = useState({ limit: 20, page: 1 });

  useEffect(() => {
    getArticleComments(id, params).then(({ comments }) => {
      setArticleComments(comments);
    });
  }, []);
  return (
    <>
      <div>
        <h3>Comments</h3>
        <SubmitComment id={id} />
      </div>
      <div className="comment-cards">
        {articleComments.map((comment) => (
          <Comment comment={comment} key={comment.comment_id} />
        ))}
      </div>
    </>
  );
}

function Comment({ comment }) {
  const { comment_id, votes, created_at, author, body, article_id } = comment;
  return (
    <div className="comment-card">
      <p>
        {moment(created_at).format('MMMM Do YYYY')} - <span>u/{author}</span>
      </p>
      <p>{body}</p>
    </div>
  );
}
