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
  }, [topic]);

  const setTopicFilter = (topicSlug) => {
    setFilter({ topic: topicSlug });
    navigate(`/topics/${topicSlug}`);
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <Sort setSortParams={setFilter} />
      <div className="marg m2 flex justify-center gap-1">
        {availableTopics.map((topic) => (
          <Button key={topic.slug} onClick={() => setTopicFilter(topic.slug)}>
            {topic.slug}
          </Button>
        ))}
      </div>
      {filter && topic ? (
        <Articles filter={filter} />
      ) : (
        <p className="text-center">Select a topic!</p>
      )}
    </>
  );
}
