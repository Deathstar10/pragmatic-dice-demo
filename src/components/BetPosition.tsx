export default function BetPosition({
  position,
  counter,
  onIncrement,
}: {
  position: number;
  counter: number;
  onIncrement: () => void;
}) {
  return (
    <div>
      <p>Dice {position}</p>
      <p>Bet: ${counter}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}
