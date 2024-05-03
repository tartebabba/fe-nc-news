import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Articles from './components/Articles';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/users" element={<Users />} /> */}
        <Route path="/articles" element={<Articles />} />
        {/* <Route path="/users/:user_id" element={<User />} /> */}
      </Routes>
    </>
  );
}

export default App;
