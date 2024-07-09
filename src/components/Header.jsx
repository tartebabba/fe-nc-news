import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="relative flex items-center bg-red-600 py-2">
        <Link
          to="https://www.jezpie.dev/"
          id="personal-logo"
          className="absolute left-2"
        >
          <img
            src="/JP-icon-32x32.png"
            alt="personal logo"
            className="h-4 w-4 rounded-md hover:bg-red-500"
          />
        </Link>
        <div className="flex-grow text-center">
          <Link
            to="/"
            id="site-name"
            className="font-mono font-bold text-slate-50"
          >
            Fakeddit
          </Link>
        </div>
      </header>
    </>
  );
}
