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
import { useEffect } from 'react';

function App() {

  // Toggle Dark Mode to respond to system settings not context.
  useEffect(() => {
    // Check if dark mode is preferred on first load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }

    // Listener for system theme changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setDarkMode = (e) => {
      document.documentElement.classList.toggle('dark', e.matches);
    }
      
    darkModeMediaQuery.addEventListener('change', setDarkMode);
      
    return () => {
      // Cleanup event listener
      darkModeMediaQuery.removeEventListener('change', setDarkMode);
    };
      
  }, []);
  return (
    <div className='dark:bg-[#0D1113]'>
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
    </div>
  );
}

export default App;
