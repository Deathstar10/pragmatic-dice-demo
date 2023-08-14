export default function BetPosition({
  position,
  counter,
  onIncrement,
  disabled,
}: {
  position: number;
  counter: number;
  onIncrement: () => void;
  disabled: boolean;
}) {
  return (
    <div>
      <p>Dice {position}</p>
      <p>Bet: ${counter}</p>
      <button onClick={onIncrement} disabled={disabled}>
        Increment
      </button>
    </div>
  );
}
