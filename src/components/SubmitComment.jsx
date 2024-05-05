import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SubmitComment() {
  const [newComment, setNewComment] = useState({});

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Add comment</Label>
      <Textarea
        placeholder="Type your comment here."
        id="message-2"
        onChange={(e) => {
          setNewComment(e.target.value);
        }}
      />
      <p className="text-sm text-muted-foreground">
        Your comment will be visible to all readers.
      </p>
      <Button>Cancel</Button>
      <Button>Comment</Button>
    </div>
  );
}
