import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header id="header-container">
        <Link to="/" id="site-name">
          Fakeddit
        </Link>
      </header>
      <Navbar />
    </>
  );
}

function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}
