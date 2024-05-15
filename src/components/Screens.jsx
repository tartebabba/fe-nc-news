import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { ring } from 'ldrs'
ring.register()

export default function LoadingScreen() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
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
