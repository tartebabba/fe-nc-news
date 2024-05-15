import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className='text-center place-content-center box-content h-16 dark:bg-[#020617]'>
        <Link to="/" id="site-name" className='text-red-600 text-xl font-mono font-bold dark:text-yellow-400'>
          Fakeddit
        </Link>
      </header>
    </>
  );
}
