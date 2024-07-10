import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardTitle } from '../ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDaysIcon, UserIcon } from 'lucide-react';
import { ArticleActions } from '../Actions';
import { useState } from 'react';

export function ArticleCard({ article }) {
  const [currentArticle, setCurrentArticle] = useState(article);
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
  } = currentArticle;

  const navigate = useNavigate();
  const navigateToArticle = (e) => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <Card className="flex items-start gap-6 rounded-lg p-6 shadow-md hover:bg-slate-50">
      <img
        alt="Article Thumbnail"
        className="articles-card-img hidden rounded-lg object-cover md:block "
        height={150}
        src={article_img_url}
        style={{
          aspectRatio: '200/150',
          objectFit: 'cover',
        }}
        width={200}
      />
      <div className="space-y-2">
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span>
            <Link to={`/topics/${topic}`} className="article-card-link">
              f/{topic}
            </Link>
          </span>
        </div>
        <CardTitle onClick={navigateToArticle} className="text-lg">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
        <img
          alt="Article Thumbnail"
          className="aspect-video max-h-[25%] rounded-lg object-cover md:hidden"
          src={article_img_url}
        />
        <p
          className="text-sm text-slate-700 dark:text-slate-300"
          onClick={navigateToArticle}
        >
          {body.substring(0, 140) + '...'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArticleActions
              currentArticle={currentArticle}
              setCurrentArticle={setCurrentArticle}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
