import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { postArticleComment } from '@/utils/apis';

export default function SubmitComment({ id }) {
  const [newComment, setNewComment] = useState('');
  const [isCommentSuccessful, setIsCommentSuccessful] = useState(false);

  const isCommentLongEnough = newComment.length > 10;

  // Hard code username for now
  const user = 'cooljmessy';

  const submitComment = () => {
    const commentBody = { username: user, body: newComment };

    postArticleComment(id, commentBody).then((res) => {
      setIsCommentSuccessful(true);
      setNewComment('');
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
          placeholder="Type your comment here."
          id="message-2"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          value={newComment}
          required
          minLength="10"
        />
        <p className="text-sm text-muted-foreground">
          Your comment will be visible to all readers.
        </p>
        <Button onClick={clearComment}>Cancel</Button>
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


