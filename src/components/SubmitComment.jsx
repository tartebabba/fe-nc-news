import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { postArticleComment } from '@/utils/apis';
import { UserContext } from './Context';

export default function SubmitComment({ id, setUserHasPostedComment }) {
  const [newComment, setNewComment] = useState('');
  const [isCommentSuccessful, setIsCommentSuccessful] = useState(false);

  const isCommentLongEnough = newComment.length > 10;

  const user = useContext(UserContext);
  console.log(user);

  const submitComment = () => {
    const commentBody = { username: user, body: newComment };

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
      <form onSubmit={(e) => e.preventDefault()}>
        <Label htmlFor="message-2">Add comment</Label>
        <Textarea
          placeholder={
            user
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
          disabled={!user}
        />
        <p className="text-sm text-muted-foreground">
          Your comment will be visible to all readers.
        </p>
        <Button onClick={clearComment} disabled={!user}>
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
      </form>
    </div>
  );
}


