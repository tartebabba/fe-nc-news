import LoadingScreen from './Screens';
import Comments from './Comments';
import { useState, useEffect } from 'react';
import { getSingleArticle } from '../utils/apis';
import { useParams } from 'react-router-dom';
import { ArticleActions } from './Actions';
import moment from 'moment';

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
        <p>Posted on: {moment(created_at).format('MMMM Do YYYY')}</p>
        <h1>{title}</h1>
        <h3>{topic}</h3>
        <h5>by {author}</h5>
        <img src={article_img_url} alt="Description of the image" />
        <p>{body}</p>
        <ArticleActions
          currentArticle={currentArticle}
          setCurrentArticle={setCurrentArticle}
        />
      </div>
      <div>
        <Comments id={id} />
      </div>
    </>
  );
}
