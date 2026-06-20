interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border-2 border-black bg-red-400 px-3 py-1 text-sm font-black uppercase shadow-[2px_2px_0px_0px_#000] hover:bg-red-500"
    >
      Reset Session
    </button>
  );
}
