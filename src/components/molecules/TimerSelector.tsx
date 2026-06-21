import TimerButton from "../atoms/TimerButton";

const TIMER_OPTIONS = [3, 5, 10, 0];

interface TimerSelectorProps {
  selectedDuration: number;
  onSelect: (duration: number) => void;
}

const TimerSelector = ({ selectedDuration, onSelect }: TimerSelectorProps) => {
  return (
    <div className="mt-4">
      <h3 className="text-xs md:text-sm font-black uppercase mb-2">Timer</h3>
      <div className="flex gap-2">
        {TIMER_OPTIONS.map((duration) => (
          <TimerButton
            key={duration}
            duration={duration}
            isSelected={selectedDuration === duration}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default TimerSelector;