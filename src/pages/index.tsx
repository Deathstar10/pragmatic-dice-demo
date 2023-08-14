import BetPosition from "@/components/BetPosition";
import { useEffect, useRef, useState } from "react";

type GameState = "start" | "end" | "pending";

export default function Home() {
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [gameState, setGameState] = useState<GameState>("end");
  const [userBalance, setUserBalance] = useState(10);
  const [bets, setBets] = useState(Array(6).fill(0));
  const [disableBet, setDisableBet] = useState(false);

  function handleStart() {
    setGameState("start");
    setCountdown(10);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);
  }

  function handleBetCounter(index: number) {
    const newBets = bets.slice();
    newBets[index] += 1;
    const totalSum = newBets.reduce(
      (acumulator, currentValue) => acumulator + currentValue,
      0
    );
    if (totalSum > userBalance) {
      alert(`Your exceeded your balance of ${userBalance}`);
    } else {
      setBets(newBets);
    }
  }

  useEffect(() => {
    if (countdown <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setDisableBet(true);
      setGameState("pending");
    }
  }, [countdown]);

  return (
    <>
      <p>hello world</p>
      <button onClick={handleStart}>Start the game</button>
      <p>{countdown}</p>

      <h2>Your balance is ${userBalance}</h2>
      <div className="flex gap-2">
        {Array(6)
          .fill(0)
          .map((value, index) => (
            <BetPosition
              position={index + 1}
              key={index}
              counter={bets[index]}
              onIncrement={() => handleBetCounter(index)}
              disabled={disableBet}
            />
          ))}
      </div>
    </>
  );
}
