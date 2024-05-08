import Card from 'react-bootstrap/Card';
import moment from 'moment';

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
  } = article;
  return (
    <Card style={{ width: 'auto' }}>
      <Card.Link href="#">u/{author}</Card.Link>
      <Card.Subtitle className="mb-2 text-muted">
        {moment(created_at).format('MMMM Do YYYY')}
      </Card.Subtitle>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body.substring(0, 140) + '...'}</Card.Text>

        <Card.Link href="#"> Comments: {comment_count}</Card.Link>
      </Card.Body>
    </Card>
  );
}

