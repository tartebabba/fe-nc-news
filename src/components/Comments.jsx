import { useContext, useEffect, useState } from 'react';
import { deleteArticleComment, getArticleComments } from '../utils/apis';
import moment from 'moment';
import SubmitComment from './SubmitComment';
import { CircleCheck, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ErrorPage } from './ErrorPages';
import { UserContext } from './Context';

export default function Comments({ id }) {
  const [articleComments, setArticleComments] = useState([]);
  const [params, setParams] = useState({ limit: 20, page: 1 });
  const [userHasDeletedComment, setUserHasDeletedComment] = useState(false);
  const [userHasPostedComment, setUserHasPostedComment] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleComments(id, params)
      .then(({ comments }) => {
        if (comments.length === 0) {
          setError({
            errorMessage:
              "Looks like there's no comments at the moment. Be the first!",
          });
        } else {
          setArticleComments(comments);
          setError(null);
        }
      })
      .catch((err) => setError(err.response.data));
  }, [userHasDeletedComment, userHasPostedComment]);

  return (
    <>
      <div>
        <h3>Comments</h3>
        <SubmitComment
          id={id}
          setUserHasPostedComment={setUserHasPostedComment}
        />
      </div>
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <div className="comment-cards">
          {articleComments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.comment_id}
              setUserHasDeletedComment={setUserHasDeletedComment}
            />
          ))}
        </div>
      )}
    </>
  );
}

function Comment({ comment, setUserHasDeletedComment }) {
  const user = useContext(UserContext);
  const { comment_id, votes, created_at, author, body, article_id } = comment;

  const isUsersComment = user === author;

  return (
    <div className="comment-card">
      <p>
        {moment(created_at).format('MMMM Do YYYY')} -{' '}
        <Link to={`/users/${author}`} className="article-card-link">
          u/{author}
        </Link>
      </p>
      <p>{body}</p>
      <div>
        {isUsersComment && (
          <DisplayButton
            comment_id={comment_id}
            setUserHasDeletedComment={setUserHasDeletedComment}
          />
        )}
      </div>
    </div>
  );
}

function DisplayButton({ comment_id, setUserHasDeletedComment }) {
  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    complete: false,
  });

  useEffect(() => {
    if (deleteStatus.complete) {
      setUserHasDeletedComment(true);
    } else setUserHasDeletedComment(false);
  }, [deleteStatus.complete]);

  let displayedButton = null;
  let disabled = false;

  if (!deleteStatus.loading && !deleteStatus.complete) {
    displayedButton = <Trash2 className="h-4 w-4" />;
  } else if (deleteStatus.loading && !deleteStatus.complete) {
    displayedButton = <Loader2 className="h-4 w-4 animate-spin" />;
    disabled = true;
  } else if (!deleteStatus.loading && deleteStatus.complete) {
    displayedButton = <CircleCheck className="h-4 w-4" />;
  }
  const deleteComment = () => {
    setDeleteStatus({ loading: true, complete: false });

    deleteArticleComment(comment_id)
      .then(() => {
        setDeleteStatus({ loading: false, complete: true });
      })
      .then(() =>
        setTimeout(() => {
          setDeleteStatus({ loading: false, complete: false });
        }, 1000)
      );
  };

  return (
    <Button
      variant="outline"
      size="sm-icon"
      onClick={
        !deleteStatus.loading && !deleteStatus.complete
          ? deleteComment
          : undefined
      }
      disabled={disabled}
    >
      {displayedButton}
    </Button>
  );
}
