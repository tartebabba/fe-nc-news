import './App.css';
import Home from './components/Home';
import IndividualArticle from './components/IndividualArticle';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navigation';
import { Topics } from './components/Topics';
import { ArticleBase } from './components/ArticlesBase';
import { PageNotFound } from './components/ErrorPages';
import { UserProvider } from './components/Context';
import Account from './components/Account';
import { Dashboard } from './components/main/dashboard';

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/articles" element={<ArticleBase />} />
          <Route path="/articles/:article_id" element={<IndividualArticle />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<Topics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
