import './App.css';
import Home from './components/Home';
import Articles from './components/Articles';
import IndividualArticle from './components/IndividualArticle';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navigation';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
      </Routes>
    </>
  );
}

export default App;
