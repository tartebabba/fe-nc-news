import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Articles from './Articles';
import { getTopics } from '@/utils/apis';
import { Button } from './ui/button';
import Sort from './SortArticles';

export function Topics() {
  const [availableTopics, setAvailableTopics] = useState([]);
  const [filter, setFilter] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { topic } = useParams();

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setAvailableTopics(topics);
      })
      .catch((err) => setError(err.response.data));
    // setFilter to fix bug when clicking topics - triggerring rerender
    setFilter({});
  }, [topic]);

  const setTopicFilter = (topicSlug) => {
    setFilter({ topic: topicSlug });
    navigate(`/topics/${topicSlug}`);
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <div id="topics">
      <Sort setSortParams={setFilter} />
      {availableTopics.map((topic) => (
        <Button key={topic.slug} onClick={() => setTopicFilter(topic.slug)}>
          {topic.slug}
        </Button>
      ))}
      <Articles filter={filter} />
    </div>
  );
}
