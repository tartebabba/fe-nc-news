// import Card from 'react-bootstrap/Card';
// import moment from 'moment';
// import { Link, useNavigate } from 'react-router-dom';

// export function ArticleCard({ article }) {
//   const {
//     title,
//     topic,
//     author,
//     body,
//     created_at,
//     votes,
//     article_img_url,
//     comment_count,
//     article_id,
//   } = article;
//   const navigate = useNavigate();
//   const navigateToArticle = (e) => {
//     navigate(`/articles/${article_id}`);
//   };

//   return (
//     <Card style={{ width: 'auto' }}>
//       <Link to={`/users/${author}`} className="article-card-link">
//         u/{author}
//       </Link>
// <Link to={`/topics/${topic}`} className="article-card-link">
//   f/{topic}
// </Link>
//       <Card.Subtitle className="mb-2 text-muted">
// {moment(created_at).format('MMMM Do YYYY')}
//       </Card.Subtitle>
//       <Card.Body onClick={navigateToArticle}>
//         <Card.Title>{title}</Card.Title>
//         <Card.Text>{body.substring(0, 140) + '...'}</Card.Text>

//         <Card.Link href="#"> Comments: {comment_count}</Card.Link>
//         <Card.Link href="#"> Votes: {votes}</Card.Link>
//       </Card.Body>
//     </Card>
//   );
// }

import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardDescription, CardFooter } from '../ui/card';
import { Separator } from '@/components/ui/separator';
import {
  CalendarDaysIcon,
  UserIcon,
  TextIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { Button } from '../ui/button';

export function ArticleCard({ article }) {
  const {
    title,
    topic,
    author,
    body,
    created_at,
    votes,
    article_img_url,
    comment_count,
    article_id,
  } = article;
  const navigate = useNavigate();
  const navigateToArticle = (e) => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <Card className="flex items-start gap-6 p-6 rounded-lg shadow-md">
      <img
        alt="Article Thumbnail"
        className="rounded-lg object-cover articles-card-img"
        height={150}
        src={article_img_url}
        style={{
          aspectRatio: '200/150',
          objectFit: 'cover',
        }}
        width={200}
      />
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span>
            <Link to={`/topics/${topic}`} className="article-card-link">
              f/{topic}
            </Link>
          </span>
        </div>
        <h2 className="text-2xl font-bold" onClick={navigateToArticle}>
          {title}
        </h2>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <UserIcon className="h-4 w-4" />
          <span>
            <Link to={`/users/${author}`} className="article-card-link">
              u/{author}
            </Link>
          </span>
          <Separator className="h-4" orientation="vertical" />
          <CalendarDaysIcon className="h-4 w-4" />
          <span> {moment(created_at).format('MMMM Do YYYY')}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {body.substring(0, 140) + '...'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost">
              <ThumbsUpIcon className="h-5 w-5" />
            </Button>
            <span className="text-gray-500 dark:text-gray-400">
              {votes} votes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost">
              <TextIcon className="h-5 w-5" />
            </Button>
            <span className="text-gray-500 dark:text-gray-400">
              {comment_count} comments
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
