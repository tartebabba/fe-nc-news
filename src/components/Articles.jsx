import { useEffect, useState } from 'react';
import { getArticles } from '../utils/apis';
import { ArticleCard } from './bootstrap';

export default function Articles() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({ limit: 20, page: 1 });

  useEffect(() => {
    setIsLoading(true);
    getArticles(params).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

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
