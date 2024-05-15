import { ring } from 'ldrs'
ring.register()

export default function LoadingScreen() {

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <l-ring
        size="100"
        stroke="5"
        bg-opacity="0"
        speed="2" 
        color="black"
      ></l-ring>
    </div>
  );
}
