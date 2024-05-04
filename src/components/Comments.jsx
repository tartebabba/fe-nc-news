import { useEffect, useState } from 'react';
import { getArticleComments } from '../utils/apis';

export default function Comments({ id }) {
  // Does this need to be even in a state?
  const [articleComments, setArticleComments] = useState([]);
  const [params, setParams] = useState({ limit: 20, page: 1 });

  useEffect(() => {
    getArticleComments(id, params).then(({ comments }) => {
      setArticleComments(comments);
    });
    //
  }, []);
  // console.log(articleComments);
  return (
    <div className="comment-cards">
      <h3>Comments</h3>
      {articleComments.map((comment) => (
        <Comment comment={comment} key={comment.comment_id} />
      ))}
    </div>
  );
}

function Comment({ comment }) {
  const { comment_id, votes, created_at, author, body, article_id } = comment;
  return (
    <div className="comment-card">
      <p>{created_at}</p>
      <p>{author}</p>
      <p>{body}</p>
    </div>
  );
}
