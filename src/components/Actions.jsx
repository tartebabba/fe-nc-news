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
    // Initalise change in vote.
    const voteChange = userAction.hasVoted ? -1 : 1;

    // Optimistically render change in vote.
    setCurrentArticle((prevArticle) => {
      return { ...prevArticle, votes: votes + voteChange };
    });

    // Update state of userAction to disable voting again, allowing only to remove upvote.
    setUserAction({ ...userAction, hasVoted: !userAction.hasVoted });

    // Update article with vote change.
    patchArticleByID(article_id, voteChange).catch((err) => {
      setCurrentArticle((prevArticle) => {
        return { ...prevArticle, votes: votes + voteChange };
      });
      // Reverse userAction.hasVoted to allow to vote again.
      setUserAction({ ...userAction, hasVoted: !userAction.hasVoted });
      // Notify occurence of error
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
