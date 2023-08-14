import BetPosition from "@/components/BetPosition";
import { useEffect, useRef, useState } from "react";

type GameState = "start" | "end" | "pending" | "result";

export default function Home() {
  const [countdown, setCountdown] = useState(10);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [gameState, setGameState] = useState<GameState>("end");
  const [userBalance, setUserBalance] = useState(10);
  const [bets, setBets] = useState(Array(6).fill(0));
  const [disableBet, setDisableBet] = useState(false);
  const [waitTime, setWaitTime] = useState(2000);
  const [result, setResult] = useState<number | null>(null);
  const [finalAmount, setFinalAmount] = useState(0);

  function handleStart() {
    // Start the timer when the user clicks the button
    setGameState("start");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);
  }

  function handleBetCounter(index: number) {
    // Update the bet for corresponding Dice number
    const newBets = bets.slice();
    newBets[index] += 1;
    const totalSum = newBets.reduce(
      (acumulator, currentValue) => acumulator + currentValue,
      0
    );

    if (userBalance <= 0) {
      alert("You have insufficient funds");
    } else if (totalSum > userBalance) {
      alert(`Your bet exceeded your balance of ${userBalance}`);
    } else {
      setBets(newBets);
    }
  }

  useEffect(() => {
    if (countdown <= 0 && intervalRef.current) {
      // When the timer is below zero, we stop it and the game goes into pending mode
      clearInterval(intervalRef.current);

      // Disable all the bets
      setDisableBet(true);

      setGameState("pending");

      // We wait for 2 seconds before the dice is rolled
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 6 + 1);
        setResult(randomNumber);
        setGameState("result");

        // We display the result for 5 seconds
        setTimeout(() => {
          setGameState("end");

          // Clear all the bets upon reset
          setBets(Array(6).fill(0));

          setDisableBet(false);
          setCountdown(10);
        }, 5000);
      }, waitTime);
    }
  }, [countdown, waitTime]);

  useEffect(() => {
    const updatedBets = bets.slice();
    let finalAmount = 0;

    if (result) {
      for (let i = 0; i < updatedBets.length; i++) {
        if (result === i + 1) {
          finalAmount += updatedBets[i] * 2;
        } else {
          finalAmount = finalAmount - updatedBets[i];
        }
      }
      setFinalAmount(finalAmount);
      setUserBalance((c) => c + finalAmount);
    }
  }, [result, bets]);

  return (
    <>
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

      <div>{gameState === "result" && <p>Dice Rolled is {result}</p>}</div>
      <div>{gameState === "pending" ? <p>Dice is being rolled</p> : ""}</div>
      <div>
        {gameState === "result" ? (
          finalAmount >= 0 ? (
            <p>Your winning amount is ${finalAmount}</p>
          ) : (
            <p>You lost ${finalAmount * -1}</p>
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}
