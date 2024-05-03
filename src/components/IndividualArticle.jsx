import LoadingScreen from './Screens';
import Comments from './Comments';
import { useState, useEffect } from 'react';
import { getSingleArticle } from '../utils/apis';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

export default function ArticleView() {
  const [currentArticle, setCurrentArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const id = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleArticle(id).then(({ article }) => {
      setCurrentArticle(article);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingScreen />;

  // console.log(currentArticle);
  const {
    article_id,
    title,
    topic,
    body,
    author,
    comment_count,
    created_at,
    votes,
    article_img_url,
  } = currentArticle;

  return (
    <>
      <div id="article-container">
        {/* <Breadcrumb/> */}
        <p>{article_id}</p>
        <p>{created_at}</p>
        <h1>{title}</h1>
        <h3>{topic}</h3>
        <h5>by {author}</h5>
        <img src={article_img_url} alt="Description of the image" />
        <p>{body}</p>
        <p>Comment: {comment_count}</p>
        <p>Votes: {votes}</p>
      </div>
      <div>
        <Comments id={id} />
      </div>
    </>
  );
}
