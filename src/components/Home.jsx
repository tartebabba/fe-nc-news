import { useState } from 'react';
import Articles from './Articles';
import Sort from './SortArticles';

export default function Home() {
  const [sortParams, setSortParams] = useState({});
  return (
    <div id="home">
      <Sort setSortParams={setSortParams} />
      <Articles filter={sortParams} />
    </div>
  );
}
