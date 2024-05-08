import { useState } from 'react';
import { patchArticleByID } from '../utils/apis';

export function ArticleActions({ currentArticle, setCurrentArticle }) {
  const { article_id, comment_count, votes } = currentArticle;
  const [userAction, setUserAction] = useState({
    hasCommented: false,
    hasVoted: false,
  });
  const [err, setErr] = useState(null);



  const changeVoteCount = () => {
    const voteChange = userAction.hasVoted ? -1 : 1;
    const newHasVoted = !userAction.hasVoted;

    setCurrentArticle((prevArticle) => {
      return { ...prevArticle, votes: votes + voteChange };
    });
    setUserAction({ ...userAction, hasVoted: newHasVoted });

    patchArticleByID(article_id, voteChange).catch((err) => {
      setCurrentArticle((prevArticle) => {
        return { ...prevArticle, votes: votes + voteChange };
      });
      setUserAction({ ...userAction, hasVoted: newHasVoted });
      setErr(err.response.data.errorMessage);
    });
  };



  return (
    <div>
      <button onClick={changeVoteCount}>
        Votes: {votes} {userAction.hasVoted ? `▽` : `△`}
      </button>
      <button>Comments: {comment_count}</button>
    </div>
  );
}
