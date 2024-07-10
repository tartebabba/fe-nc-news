import LoadingScreen from './Screens';
import Comments from './Comments';
import { useState, useEffect } from 'react';
import { getSingleArticle } from '../utils/apis';
import { useParams, Link } from 'react-router-dom';
import { ArticleActions } from './Actions';
import moment from 'moment';
import { ErrorPage } from './ErrorPages';

export default function ArticleView() {
  const [currentArticle, setCurrentArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleArticle(id)
      .then(({ article }) => {
        setCurrentArticle(article);
        setIsLoading(false);
      })
      .catch((err) => setError(err.response.data));
  }, []);

  if (error) return <ErrorPage error={error} />;

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
      <div className="container grid gap-2 py-2">
        <article className="grid gap-2">
          <div className="flex gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Link to={`/topics/${topic}`} className="article-card-link">
              f/{topic}
            </Link>
            <p className="">| {moment(created_at).format('MMMM Do YYYY')} |</p>
            <p>
              {
                <Link to={`/users/${author}`} className="article-card-link">
                  u/{author}
                </Link>
              }
            </p>
          </div>
          <h1 className="text-xl font-bold">{title}</h1>
          <img
            alt="Featured Image"
            className="aspect-video rounded-lg object-cover"
            height={340}
            src={article_img_url}
            width={1250}
          />
          <p>{body}</p>
          <ArticleActions
            currentArticle={currentArticle}
            setCurrentArticle={setCurrentArticle}
          />
        </article>
        <hr class="h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
        <Comments id={id} setError={setError} />
      </div>
    </>
  );
}
