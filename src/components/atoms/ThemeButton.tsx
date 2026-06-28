interface ThemeButtonProps {
  theme: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ThemeButton({
  theme,
  isSelected,
  onClick,
}: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border-4 border-black px-3 md:px-3 py-2.5 md:py-3 text-center text-[10px] md:text-xs font-black transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] ${
        isSelected
          ? "bg-yellow-300 shadow-[4px_4px_0px_0px_#000]"
          : "bg-white"
      }`}
    >
      {theme}
    </button>
  );
}
