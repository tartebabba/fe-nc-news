import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className='text-center place-content-center   bg-[#001B2B]  box-content h-16 '>
        <Link to="/" id="site-name" className=' text-yellow-400 text-xl font-mono font-bold dark:text-red-700'>
          Fakeddit
        </Link>
      </header>
    </>
  );
}
