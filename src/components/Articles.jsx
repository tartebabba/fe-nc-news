import { useEffect, useState } from 'react';
import { getArticles } from '../utils/apis';
import { ArticleCard } from './bootstrap';
import LoadingScreen from './Screens';
import { useParams, useSearchParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPages';

export default function Articles(props) {
  const { filter } = props;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = useParams();

  useEffect(() => {
    const params = { ...filter, ...urlParams };
    setIsLoading(true);

    getArticles(params)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data);
      });

    let searchQuery = { ...params };
    delete searchQuery.topic;
    setSearchParams(searchQuery);
  }, [filter]);

  if (isLoading) return <LoadingScreen />;

  if (error) return <ErrorPage error={error} />;

  return (
    <div id="card-container">
      <div className="card">
        {articles.map((article) => {
          return (
            <article className="article-card" key={article.article_id}>
              <ArticleCard article={article} />
            </article>
          );
        })}
      </div>
    </div>
  );
}
