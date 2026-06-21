import  TimerButton  from '../atoms/TimerButton';

interface TimerSelectorProps {
  selectedDuration: number;
  onSelect: (duration: number) => void;
}

const TimerSelector = ({ selectedDuration, onSelect }: TimerSelectorProps) => {
  return (
    <div className="bg-amber-100">
      <TimerButton duration={selectedDuration} onSelect={onSelect} isSelected={true} />
    </div>
  );
};

export default TimerSelector;