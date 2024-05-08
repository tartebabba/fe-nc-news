import { useEffect, useState } from 'react';
import { getArticles, getTenMostRecentArticles } from '../utils/apis';
import { ArticleCard } from './bootstrap';
import LoadingScreen from './Screens';
import { useLocation } from 'react-router-dom';

export default function Articles() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({ limit: 20, page: 1 });

  console.log(pathname);

  useEffect(() => {
    setIsLoading(true);

    switch (pathname) {
      case '/articles':
        getArticles(params).then(({ articles }) => {
          setArticles(articles);
          setIsLoading(false);
        });
        break;
      case '/':
        getTenMostRecentArticles().then(({ articles }) => {
          setArticles(articles);
          setIsLoading(false);
        });
        break;

      default:
    }
  }, []);

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
