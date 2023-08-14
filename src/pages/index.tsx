import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function handleStart() {
    setCountdown(10);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
  }

  useEffect(() => {
    if (countdown <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [countdown]);

  return (
    <>
      <p>hello world</p>
      <button onClick={handleStart}>Start the game</button>
      <p>{countdown}</p>
    </>
  );
}
