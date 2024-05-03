import { useEffect, useState } from 'react';
import { getArticleComments } from '../utils/apis';
import Accordion from 'react-bootstrap/Accordion';

export default function Comments({ id }) {
  // Does this need to be even in a state?
  const [articleComments, setArticleComments] = useState([]);

  useEffect(() => {
    getArticleComments(id).then(({ comments }) => {
      setArticleComments(comments);
    });
    //
  }, []);
  // console.log(articleComments);
  return (
    <div className="comment-cards">
      <Accordion>
        {articleComments.map((comment) => (
          <Comment comment={comment} key={comment.comment_id} />
        ))}
      </Accordion>
    </div>
  );
}

function Comment({ comment }) {
  const { comment_id, votes, created_at, author, body, article_id } = comment;
  return (
    <Accordion.Item eventKey={comment_id.toString()}>
      <Accordion.Header>{author}</Accordion.Header>
      <Accordion.Body>{body}</Accordion.Body>
    </Accordion.Item>
  );
}
