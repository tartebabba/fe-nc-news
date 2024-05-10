import { useState } from 'react';
import { patchArticleByID } from '../utils/apis';
import { Button } from './ui/button';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

export function ArticleActions({ currentArticle, setCurrentArticle }) {
  const { article_id, comment_count, votes } = currentArticle;
  const [userAction, setUserAction] = useState({
    hasCommented: false,
    hasVoted: false,
  });
  const [err, setErr] = useState(null);

  const changeVoteCount = () => {
    const voteChange = userAction.hasVoted ? -1 : 1;

    setCurrentArticle((prevArticle) => {
      return { ...prevArticle, votes: votes + voteChange };
    });

    setUserAction({ ...userAction, hasVoted: !userAction.hasVoted });

    patchArticleByID(article_id, voteChange).catch((err) => {
      setCurrentArticle((prevArticle) => {
        return { ...prevArticle, votes: votes + voteChange };
      });

      setUserAction({ ...userAction, hasVoted: !userAction.hasVoted });
      setErr(err.response.data.errorMessage);
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Button onClick={changeVoteCount} variant="outline">
        <ThumbsUpIcon className="w-4 h-4 mr-2" />
        Votes: {votes}
      </Button>
      <Button variant="outline">
        <MessageSquareIcon className="mr-2 h-4 w-4" />
        Comments: {comment_count}
      </Button>
    </div>
  );
}

