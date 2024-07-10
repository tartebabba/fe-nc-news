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

  const minCommentLength = 3;
  const isCommentLongEnough = newComment.length > minCommentLength;

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
    <>
      <h2 className="text-xl font-bold">Comments</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <Textarea
            placeholder={
              username
                ? `Type your comment here. Minimum ${minCommentLength} characters.`
                : 'Please login to submit a comment'
            }
            id="message-2"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
            required
            minLength={minCommentLength}
            disabled={!username}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
          <div className="flex justify-between py-1">
            <p className="mx-2 content-center text-sm text-gray-500">
              Your comment will be visible to all readers.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={clearComment}
                disabled={!username}
                size="sm"
                className="rounded-lg bg-slate-300 px-4 py-2 text-xs text-black hover:text-white disabled:opacity-50"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  submitComment();
                }}
                disabled={!isCommentLongEnough}
                size="sm"
                className={`rounded-lg px-4 py-2 text-xs text-white ${
                  isCommentLongEnough
                    ? 'bg-slate-600 hover:bg-slate-900'
                    : 'bg-gray-500'
                } disabled:opacity-50`}
              >
                {isCommentSuccessful ? 'Comment Posted' : 'Comment'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}


