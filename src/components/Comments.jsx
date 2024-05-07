import { useEffect, useState } from 'react';
import { deleteArticleComment, getArticleComments } from '../utils/apis';
import moment from 'moment';
import SubmitComment from './SubmitComment';
import { CircleCheck, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  // Hard coded for now as don't have a user login.
  const user = 'cooljmessy';
  const { comment_id, votes, created_at, author, body, article_id } = comment;
  const [isDeleteComplete, setIsDeleteComplete] = useState({
    loading: false,
    complete: false,
  });
  const isUsersComment = user === author;

  const deleteComment = () => {
    setIsDeleteComplete(() => {
      return { ...isDeleteComplete, loading: true };
    });

    deleteArticleComment(comment_id).then(() => {
      setIsDeleteComplete({ loading: false, complete: true });
    });
  };

  function displayButton() {
    // Planned re-factor as this is overly excessive, <Button> tag does not need to be repeated.
    if (!isDeleteComplete.loading && !isDeleteComplete.complete) {
      return (
        <Button variant="outline" size="sm-icon" onClick={deleteComment}>
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    }

    if (isDeleteComplete.loading && !isDeleteComplete.complete) {
      return (
        <Button
          variant="outline"
          size="sm-icon"
          onClick={deleteComment}
          disabled
        >
          {<Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      );
    }

    if (!isDeleteComplete.loading && isDeleteComplete.complete) {
      return (
        <Button variant="outline" size="sm-icon">
          <CircleCheck className="h-4 w-4" />
        </Button>
      );
    }
  }

  return (
    <div className="comment-card">
      <p>
        {moment(created_at).format('MMMM Do YYYY')} - <span>u/{author}</span>
      </p>
      <p>{body}</p>
      <div>{isUsersComment && displayButton()}</div>
    </div>
  );
}
