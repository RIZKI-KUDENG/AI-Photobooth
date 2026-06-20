import { useRef } from "react";

interface LayoutTemplate {
  id: string;
  name: string;
  badge?: "NEW LAYOUT" | "TRY IT NOW";
  size: string;
  poses: number;
  previewImages: string[];
}

interface LayoutSelectorProps {
  selectedLayout: string;
  onSelectLayout: (id: string) => void;
}

const LAYOUTS: LayoutTemplate[] = [
  {
    id: "layout-b",
    name: "Layout B",
    badge: "TRY IT NOW",
    size: "Size 6 x 2 Strip",
    poses: 4,
    previewImages: [
      "https://picsum.photos/id/237/150/200",
      "https://picsum.photos/id/1025/150/200",
      "https://picsum.photos/id/1062/150/200",
      "https://picsum.photos/id/240/150/200",
    ],
  },
  {
    id: "hearts-filter",
    name: "Hearts Filter Layout",
    badge: "NEW LAYOUT",
    size: "Size 6 x 2 Strip",
    poses: 4,
    previewImages: [
      "https://picsum.photos/id/64/150/200",
      "https://picsum.photos/id/65/150/200",
      "https://picsum.photos/id/66/150/200",
      "https://picsum.photos/id/67/150/200",
    ],
  },
  {
    id: "dog-filter",
    name: "Dog Filter Layout",
    badge: "NEW LAYOUT",
    size: "Size 6 x 2 Strip",
    poses: 4,
    previewImages: [
      "https://picsum.photos/id/1025/150/200",
      "https://picsum.photos/id/1025/150/200",
      "https://picsum.photos/id/1025/150/200",
      "https://picsum.photos/id/1025/150/200",
    ],
  },
  {
    id: "vintage-layout",
    name: "Vintage Layout",
    badge: "NEW LAYOUT",
    size: "Size 6 x 2 Strip",
    poses: 4,
    previewImages: [
      "https://picsum.photos/id/338/150/200",
      "https://picsum.photos/id/349/150/200",
      "https://picsum.photos/id/365/150/200",
      "https://picsum.photos/id/395/150/200",
    ],
  },
  {
    id: "solace-layout",
    name: "Solace Layout",
    badge: "NEW LAYOUT",
    size: "Size 6 x 2 Strip",
    poses: 4,
    previewImages: [
      "https://picsum.photos/id/445/150/200",
      "https://picsum.photos/id/446/150/200",
      "https://picsum.photos/id/447/150/200",
      "https://picsum.photos/id/448/150/200",
    ],
  },
];

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
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] relative">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tight text-[#2D2D2D]">
          choose your layout
        </h2>
        <p className="text-xs italic text-gray-500 mt-1">
          Select from our collection of photo booth layouts
        </p>
      </div>

      <div className="relative px-10">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-white font-black shadow-[2px_2px_0px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          &larr;
        </button>

        <div
          ref={scrollContainerRef}
          className="scrollbar-none flex gap-6 overflow-x-auto pb-4 pt-4 snap-x snap-mandatory"
        >
          {LAYOUTS.map((layout) => (
            <div
              key={layout.id}
              onClick={() => onSelectLayout(layout.id)}
              className="group flex flex-col items-center shrink-0 snap-center cursor-pointer"
            >
              <div
                className={`relative w-[140px] bg-white p-2 transition-all duration-200 border-4 ${
                  selectedLayout === layout.id
                    ? "border-[#FF8DA1] bg-[#FFF0F2] scale-105 shadow-[4px_4px_0px_0px_#000]"
                    : "border-black hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]"
                }`}
              >
                {layout.badge && (
                  <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap bg-black text-white border-2 border-white px-2 py-0.5 text-[8px] font-black uppercase">
                    {layout.badge}
                  </span>
                )}

                {/* Mini Layout Renderer */}
                {layout.id === "layout-b" && (
                  <div className="grid grid-cols-2 gap-0.5 bg-gray-100 p-0.5 border border-gray-300 aspect-[3/4] w-full">
                    {layout.previewImages.map((img, index) => (
                      <div key={index} className="aspect-[3/4] w-full overflow-hidden bg-gray-200">
                        <img src={img} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {layout.id === "hearts-filter" && (
                  <div className="flex flex-col gap-0.5 bg-[#FFF0F2] p-0.5 border border-[#FF8DA1] aspect-[3/4] w-full">
                    {layout.previewImages.map((img, index) => (
                      <div key={index} className="aspect-[4/3] w-full overflow-hidden bg-[#FFF0F2]">
                        <img src={img} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {layout.id === "dog-filter" && (
                  <div className="grid grid-cols-4 gap-0.5 bg-[#FFF9EB] p-0.5 border border-[#E6A04D] w-full aspect-[4/3] items-center justify-center">
                    {layout.previewImages.map((img, index) => (
                      <div key={index} className="aspect-[3/4] w-full overflow-hidden bg-[#FFF9EB]">
                        <img src={img} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {layout.id === "vintage-layout" && (
                  <div className="relative h-[95px] w-full overflow-hidden bg-gray-50 border border-gray-300 flex items-center justify-center">
                    {layout.previewImages.map((img, index) => (
                      <div
                        key={index}
                        className="absolute border border-black bg-white p-0.5 shadow-[1px_1px_0px_0px_#000] w-9 transition-all duration-300"
                        style={{
                          transform: `rotate(${(index - 1.5) * 8}deg) translateY(${Math.abs(index - 1.5) * 4}px)`,
                          zIndex: index,
                          left: `calc(50% - 18px + ${(index - 1.5) * 7}px)`,
                        }}
                      >
                        <div className="overflow-hidden aspect-[3/4] bg-gray-100">
                          <img src={img} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {layout.id === "solace-layout" && (
                  <div className="grid grid-cols-3 gap-0.5 bg-gray-100 p-0.5 border border-gray-300 aspect-[3/4] w-full">
                    <div className="col-span-2 aspect-[3/4] overflow-hidden bg-gray-200">
                      <img src={layout.previewImages[0]} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <div className="col-span-1 flex flex-col gap-0.5 justify-between">
                      {layout.previewImages.slice(1).map((img, index) => (
                        <div key={index} className="aspect-[3/4] w-full overflow-hidden bg-gray-200 min-h-0">
                          <img src={img} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-1 text-center text-[7px] tracking-widest text-gray-400 uppercase font-bold">
                  photobooth
                </div>
              </div>

              <div className="mt-3 text-center">
                <h3 className="text-xs font-black uppercase text-[#2D2D2D] truncate w-[140px]">
                  {layout.name}
                </h3>
                <p className="text-[10px] text-gray-500 font-bold">
                  {layout.size}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-white font-black shadow-[2px_2px_0px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
