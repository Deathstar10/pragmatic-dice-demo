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
    <div className="border border-blue-500 px-4 py-4 shrink">
      <p className="text-center">Dice {position}</p>
      <p className="text-center">Bet: ${counter}</p>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className="bg-blue-300 rounded text-black px-4 py-2 mx-2 my-2 disabled:cursor-not-allowed"
      >
        Increment
      </button>
    </div>
  );
}
