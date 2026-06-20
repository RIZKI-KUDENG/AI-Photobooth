import ThemeButton from "../atoms/ThemeButton";

const THEMES = [
  "NORMAL",
  "ALL BLACK",
  "OLD MONEY",
  "K-POP",
  "Y2K",
  "VINTAGE",
  "CORPORATE",
];

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
}

export default function ThemeSelector({
  selectedTheme,
  onSelectTheme,
}: ThemeSelectorProps) {
  return (
    <div className="border-4 border-black bg-cyan-300 p-4 md:p-6 shadow-[8px_8px_0px_0px_#000]">
      <div className="mb-3 md:mb-4 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-black uppercase">Choose Filter</h2>
        <span className="border-2 border-black bg-white px-2 py-1 text-[10px] md:text-xs font-black uppercase">
          Active: {selectedTheme}
        </span>
      </div>
      <div className="grid gap-3 md:gap-4 grid-cols-2">
        {THEMES.map((theme) => (
          <ThemeButton
            key={theme}
            theme={theme}
            isSelected={selectedTheme === theme}
            onClick={() => onSelectTheme(theme)}
          />
        ))}
      </div>
    </div>
  );
}
