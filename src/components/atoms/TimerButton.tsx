interface TimerButtonProps {
  duration: number;
  isSelected: boolean;
  onSelect: (duration: number) => void;
}

const TimerButton = ({ duration, isSelected, onSelect }: TimerButtonProps) => {
  return (
    <button
      onClick={() => onSelect(duration)}
      className={`border-4 border-black px-4 py-2 text-sm md:text-base font-black transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] ${
        isSelected
          ? "bg-yellow-300 shadow-[4px_4px_0px_0px_#000]"
          : "bg-white"
      }`}
    >
      {duration === 0 ? "No Timer" : `${duration}s`}
    </button>
  );
};

export default TimerButton;
