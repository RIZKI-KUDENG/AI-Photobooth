import { useRef } from "react";
import { layouts } from "../../layouts/registry";
import type { LayoutDefinition } from "../../layouts/types";

interface LayoutSelectorProps {
  selectedLayout: string;
  onSelectLayout: (id: string) => void;
}

function LayoutCard({
  layout,
  isSelected,
  onSelect,
}: {
  layout: LayoutDefinition;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(layout.id)}
      className="group flex flex-col items-center shrink-0 snap-center cursor-pointer"
    >
      <div
        className={`relative w-[120px] md:w-[140px] bg-white p-2 transition-all duration-200 border-4 ${
          isSelected
            ? "border-[#FF8DA1] bg-[#FFF0F2] scale-105 shadow-[4px_4px_0px_0px_#000]"
            : "border-black hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]"
        }`}
      >
        {layout.badge && (
          <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap bg-black text-white border-2 border-white px-2 py-0.5 text-[8px] font-black uppercase">
            {layout.badge}
          </span>
        )}

        <layout.MiniPreview previewImages={layout.previewImages} />

        <div className="mt-1 text-center text-[7px] tracking-widest text-gray-400 uppercase font-bold">
          photobooth
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-xs font-black uppercase text-[#2D2D2D] truncate w-[120px] md:w-[140px]">
          {layout.name}
        </h3>
        <p className="text-[10px] text-gray-500 font-bold">{layout.size}</p>
      </div>
    </div>
  );
}

export default function LayoutSelector({
  selectedLayout,
  onSelectLayout,
}: LayoutSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="border-4 border-black bg-white p-4 md:p-6 shadow-[8px_8px_0px_0px_#000] relative">
      <div className="mb-4 md:mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#2D2D2D]">
          choose your layout
        </h2>
        <p className="text-[10px] md:text-xs italic text-gray-500 mt-1">
          Select from our collection of photo booth layouts
        </p>
      </div>

      <div className="relative overflow-hidden">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 z-10 flex h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-white font-black text-sm md:text-base shadow-[2px_2px_0px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          &larr;
        </button>

        <div
          ref={scrollContainerRef}
          className="scrollbar-none flex gap-4 md:gap-6 overflow-x-auto px-8 md:px-10 py-3 md:py-4 snap-x snap-mandatory"
        >
          {layouts.map((layout) => (
            <LayoutCard
              key={layout.id}
              layout={layout}
              isSelected={selectedLayout === layout.id}
              onSelect={onSelectLayout}
            />
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 z-10 flex h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-white font-black text-sm md:text-base shadow-[2px_2px_0px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
