import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header id="header-container">
        <Link to="/" id="site-name">
          Fakeddit
        </Link>
      </header>
    </>
  );
}
