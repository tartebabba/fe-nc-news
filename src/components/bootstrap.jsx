import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

export function ArticleCard({ article }) {
  const {
    title,
    topic,
    author,
    body,
    created_at,
    botes,
    article_img_url,
    comment_count,
    article_id,
  } = article;
  const navigate = useNavigate();
  const navigateToArticle = (e) => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <Card style={{ width: 'auto' }}>
      <Link to={`/users/${author}`} className="article-card-link">
        u/{author}
      </Link>
      <Link to={`/topics/${topic}`} className="article-card-link">
        f/{topic}
      </Link>
      <Card.Subtitle className="mb-2 text-muted">
        {moment(created_at).format('MMMM Do YYYY')}
      </Card.Subtitle>
      <Card.Body onClick={navigateToArticle}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body.substring(0, 140) + '...'}</Card.Text>

        <Card.Link href="#"> Comments: {comment_count}</Card.Link>
      </Card.Body>
    </Card>
  );
}

