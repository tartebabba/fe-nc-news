import { useState } from 'react';
import Articles from './Articles';
import Sort from './SortArticles';

export function ArticleBase() {
  const [filter, setFilter] = useState({});
  return (
    <>
      <Sort setSortParams={setFilter} />
      <Articles filter={filter} />
    </>
  );
}
