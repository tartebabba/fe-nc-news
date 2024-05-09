import './App.css';
import Home from './components/Home';
import IndividualArticle from './components/IndividualArticle';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navigation';
import { Topics } from './components/Topics';
import { ArticleBase } from './components/ArticlesBase';
import { PageNotFound } from './components/ErrorPages';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleBase />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic" element={<Topics />} />
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
