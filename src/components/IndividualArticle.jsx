import LoadingScreen from './Screens';
import Comments from './Comments';
import { useState, useEffect } from 'react';
import { getSingleArticle } from '../utils/apis';
import { useParams, Link } from 'react-router-dom';
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
        <p>
          Posted by
          {
            <Link to={`/users/${author}`} className="article-card-link">
              u/{author}
            </Link>
          }
          in
          {
            <Link to={`/topics/${topic}`} className="article-card-link">
              f/{topic}
            </Link>
          }
        </p>
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
