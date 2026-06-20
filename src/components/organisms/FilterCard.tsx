import ThemeSelector from "../molecules/ThemeSelector";
import LayoutSelector from "./LayoutSelector";

interface FilterCardProps {
  selectedTheme: string;
  selectedLayout: string;
  onSelectTheme: (theme: string) => void;
  onSelectLayout: (layout: string) => void;
}

export default function FilterCard({
  selectedTheme,
  selectedLayout,
  onSelectTheme,
  onSelectLayout,
}: FilterCardProps) {
  return (
    <div className="space-y-6">
      <ThemeSelector
        selectedTheme={selectedTheme}
        onSelectTheme={onSelectTheme}
      />
      <LayoutSelector
        selectedLayout={selectedLayout}
        onSelectLayout={onSelectLayout}
      />
    </div>
  );
}
