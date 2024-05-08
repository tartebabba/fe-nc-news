import { useEffect, useState } from 'react';
import { getArticles, getTenMostRecentArticles } from '../utils/apis';
import { ArticleCard } from './bootstrap';
import LoadingScreen from './Screens';
import { useLocation } from 'react-router-dom';

export default function Articles(props) {
  const { filter } = props;
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({ limit: 20, page: 1 });

  useEffect(() => {
    setParams((currParams) => {
      return { ...currParams, ...filter };
    });
  }, [filter]);

  useEffect(() => {
    setIsLoading(true);

    switch (pathname) {
      case '/':
        getTenMostRecentArticles().then(({ articles }) => {
          setArticles(articles);
          setIsLoading(false);
        });
        break;
      case '/articles':
        getArticles(params).then(({ articles }) => {
          setArticles(articles);
          setIsLoading(false);
        });
        break;
      case '/topics':
        getArticles(params).then(({ articles }) => {
          setArticles(articles);
          setIsLoading(false);
        });
        break;

      default:
    }
  }, [params, pathname]);

  if (isLoading) return <LoadingScreen />;

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
