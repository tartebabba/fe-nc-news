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
      <div className="px-4 py-6 md:px-6 lg:py-16 md:py-12">
        <article className="prose prose-gray mx-auto dark:prose-invert">
          <div className="space-y-2 not-prose">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              <Link to={`/topics/${topic}`} className="article-card-link">
                f/{topic}
              </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Posted on: {moment(created_at).format('MMMM Do YYYY')}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
              {title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Posted by
              {
                <Link to={`/users/${author}`} className="article-card-link">
                  u/{author}
                </Link>
              }
            </p>
          </div>
          <img
            alt="Featured Image"
            className="aspect-video object-cover"
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
      </div>
      <Comments id={id} setError={setError} />
    </>
  );
}
