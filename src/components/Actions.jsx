export function ArticleActions({ currentArticle }) {
  const { article_id, comment_count, votes } = currentArticle;
  return (
    <div>
      <h5>Article Actions</h5>
      <p>Comments: {comment_count}</p>
      <p>Votes: {votes}</p>
    </div>
  );
}
