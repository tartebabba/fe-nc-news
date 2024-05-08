import { useEffect, useState } from 'react';
import { getArticles, getTenMostRecentArticles } from '../utils/apis';
import { ArticleCard } from './bootstrap';
import LoadingScreen from './Screens';
import { useParams } from 'react-router-dom';

export default function Articles(props) {
  const { filter } = props;
  const pageParams = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({ limit: 20, page: 1 });

  useEffect(() => {
    setParams((currParams) => {
      return { ...currParams, ...filter, ...pageParams };
    });
  }, [filter]);

  useEffect(() => {
    setIsLoading(true);
    if (
      Object.keys(pageParams).length !== 0 ||
      Object.keys(filter).length !== 0
    ) {
      getArticles(params).then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      });
    } else {
      getTenMostRecentArticles().then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      });
    }
  }, [params]);

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
