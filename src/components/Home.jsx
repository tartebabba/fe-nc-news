import { useState } from 'react';
import Articles from './Articles';
import Sort from './SortArticles';

export default function Home() {
  const [sortParams, setSortParams] = useState({
    sort_by: 'created_at',
    order_by: 'desc',
  });
  return (
    <div id="home">
      <Sort setSortParams={setSortParams} />
      <Articles filter={sortParams} />
    </div>
  );
}
