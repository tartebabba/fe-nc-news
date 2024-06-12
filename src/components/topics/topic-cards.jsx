const topicImages = {
  coding: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  football: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  cooking: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
};

import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default function TopicCards(props) {
  const { availableTopics, setTopicFilter } = props;

  return (
    <div className="mx-2 flex flex-wrap justify-center px-2">
      {availableTopics.map((topic) => {
        return (
          <Card
            key={topic.slug}
            className="max-h-md m-2 w-1/4 max-w-xs"
            onClick={() => setTopicFilter(topic.slug)}
          >
            <img
              src={topicImages[topic.slug]}
              alt={topic.slug}
              className="h-1/2 w-full rounded-lg object-cover"
            />
            <CardTitle className="m-2 text-center text-lg">
              f/{topic.slug}
            </CardTitle>
            <CardContent className="text-center text-sm">
              {topic.description}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
