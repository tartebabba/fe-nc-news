import { useEffect, useState } from 'react';
import { getTenMostRecentArticles } from '../utils/apis';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { ArticleCard } from './bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [mostRecentArticles, setMostRecentArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getTenMostRecentArticles().then(({ articles }) => {
      setMostRecentArticles(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>loading</p>;

  // Links can be converted into components
  return (
    <div id="home">
      <div>
        <Link to="/">New</Link>
        <Link to="/articles">All</Link>
      </div>
      <h4>search</h4>
      <div id="card-container">
        <div className="card">
          {mostRecentArticles.map((article) => {
            return (
              <article className="article-card" key={article.article_id}>
                {/* {ArticleCard(article)} */}
                <ArticleCard article={article} />
                {/* <img src={article.article_img_url} /> */}
                {/* <p>{article.title}</p>
            <p>{article.author}</p> */}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Home will only show top few articles.
// Pagination should and will be routed through to articles
// [] Create loading screen for home page.
