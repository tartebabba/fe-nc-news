import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Articles from './Articles';
import { getTopics } from '@/utils/apis';
import Sort from './SortArticles';
import TopicCards from './topics/topic-cards';
import { ErrorPage } from './ErrorPages';

export function Topics() {
  const [availableTopics, setAvailableTopics] = useState([]);
  const [filter, setFilter] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { topic } = useParams();

  useEffect(() => {
    getTopics()
      .then(({ topics }) => setAvailableTopics(topics))
      .catch((err) => setError(err.response.data));
  }, []);

  const setTopicFilter = (topicSlug) => {
    setFilter({ topic: topicSlug });
    navigate(`/topics/${topicSlug}`);
  };

  const goBackToTopics = () => {
    setFilter(null);
    navigate('/topics');
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <Sort setSortParams={setFilter} />
      {topic ? (
        <h1
          className="my-2 text-center text-xl font-bold"
          onClick={goBackToTopics}
        >
          f/{topic}
        </h1>
      ) : (
        <TopicCards
          availableTopics={availableTopics}
          setTopicFilter={setTopicFilter}
        />
      )}
      {filter && topic && <Articles filter={filter} />}
    </>
  );
}
