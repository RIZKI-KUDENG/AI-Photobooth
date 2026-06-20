interface SnapButtonProps {
  onClick: () => void;
  disabled: boolean;
  isCapturing: boolean;
  slotsFull: boolean;
}

export default function SnapButton({
  onClick,
  disabled,
  isCapturing,
  slotsFull,
}: SnapButtonProps) {
  const label = isCapturing
    ? "Get Ready..."
    : slotsFull
      ? "Slots Full"
      : "Snap Photo";

  return (
    <button
      disabled={disabled}
      className={`mt-5 w-full border-4 border-black py-4 text-xl font-black uppercase transition shadow-[6px_6px_0px_0px_#000] ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-x-1 translate-y-1"
          : "bg-lime-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
