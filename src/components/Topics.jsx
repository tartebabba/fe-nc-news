import { useEffect, useState } from 'react';
import Articles from './Articles';
import { getTopics } from '@/utils/apis';
import { Button } from './ui/button';

export default function Topics() {
  const [availableTopics, setAvailableTopics] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setAvailableTopics(topics);
    });
  }, []);

  const setTopicFilter = (e) => {
    setFilter((curr) => {
      return { ...curr, topic: e.target.value };
    });
  };

  return (
    <div id="topics">
      {availableTopics.map((topic) => {
        return (
          <Button value={topic.slug} onClick={(e) => setTopicFilter(e)}>
            {topic.slug}
          </Button>
        );
      })}
      <Articles filter={filter} />
    </div>
  );
}
