import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Articles from './Articles';
import { getTopics } from '@/utils/apis';
import { Button } from './ui/button';
import Sort from './SortArticles';

export function Topics() {
  const [availableTopics, setAvailableTopics] = useState([]);
  const [filter, setFilter] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setAvailableTopics(topics);
    });
  }, []);

  const setTopicFilter = (topicSlug) => {
    setFilter({ topic: topicSlug });
    navigate(`/topics/${topicSlug}`);
  };

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
