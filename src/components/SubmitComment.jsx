import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { postArticleComment } from '@/utils/apis';
import { UserContext, useUser } from './Context';
import LoadingScreen from './Screens';

export default function SubmitComment({ id, setUserHasPostedComment }) {
  const { username, isUserLoading } = useContext(UserContext);

  const [newComment, setNewComment] = useState('');
  const [isCommentSuccessful, setIsCommentSuccessful] = useState(false);

  const isCommentLongEnough = newComment.length > 10;

  if (isUserLoading) {
    return <LoadingScreen />;
  }

  const submitComment = () => {
    const commentBody = { username: user.username, body: newComment };

    postArticleComment(id, commentBody)
      .then((res) => {
        setIsCommentSuccessful(true);
        setNewComment('');
        setUserHasPostedComment(true);
      })
      .then(() => {
        setTimeout(() => {
          setIsCommentSuccessful(false);
          setUserHasPostedComment(false);
        }, 1000);
      });
  };

  const clearComment = () => {
    setNewComment('');
  };

  return (
    <div className="grid w-full gap-1.5">
      <h2 className="text-2xl font-bold">Comments</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message-2">Add comment</Label>
          <Textarea
            placeholder={
              username
                ? 'Type your comment here.'
                : 'Please login to submit a comment'
            }
            id="message-2"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
            required
            minLength="10"
            disabled={!username}
          />
          <p className="text-sm text-muted-foreground">
            Your comment will be visible to all readers.
          </p>
        </div>
        <div className="grid w-full gap-1.5">
          <Button onClick={clearComment} disabled={!username}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitComment();
            }}
            disabled={!isCommentLongEnough}
          >
            {isCommentSuccessful ? 'Comment Posted' : 'Comment'}
          </Button>
        </div>
      </form>
    </div>
  );
}


