import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="bg-red-600 py-2 text-center">
        <Link
          to="/"
          id="site-name"
          className="font-mono font-bold text-slate-50"
        >
          Fakeddit
        </Link>
      </header>
    </>
  );
}
