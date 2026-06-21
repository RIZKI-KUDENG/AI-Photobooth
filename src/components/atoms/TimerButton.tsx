interface TimerButtonProps {
  duration: number;
  isSelected: boolean;
  onSelect: (duration: number) => void;
}

const TimerButton = ({ duration, isSelected, onSelect }: TimerButtonProps) => {
  return (
    <button
      onClick={() => onSelect(duration)}
      className={`bg-[#5A0612] text-white px-4 py-2 rounded ${isSelected ? 'border border-white' : ''}`}
    >
      {duration}
    </button>
  );
};

export default TimerButton;
