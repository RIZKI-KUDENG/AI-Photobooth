interface LayoutPreviewProps {
  photos: string[];
  layoutType: string;
  selectedLayout?: string;
}

function Grid2x2({ photos }: { photos: string[] }) {
  return (
    <div className="mx-auto max-w-sm border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_#000]">
      <div className="grid grid-cols-2 gap-2.5 bg-gray-50 p-2 border-2 border-black">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] overflow-hidden border-2 border-black bg-gray-100 relative">
            {photos[i] ? (
              <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[10px] font-black text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200">
                <span>SLOT</span>
                <span>0{i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-xs font-black uppercase tracking-widest text-[#2D2D2D]">
        ★ PHOTOBOOTH LAYOUT B ★
      </div>
    </div>
  );
}

function StripVertical({ photos, selectedLayout }: { photos: string[]; selectedLayout?: string }) {
  const isHearts = selectedLayout === "hearts-filter";
  const bgClass = isHearts ? "bg-[#FFF0F2]" : "bg-white";
  const borderClass = isHearts ? "border-[#FF8DA1]" : "border-black";
  const textClass = isHearts ? "text-[#FF6B91]" : "text-black";
  const label = isHearts ? "♥ HEARTS FILTER ♥" : "★ PHOTOBOOTH ★";

  return (
    <div className={`mx-auto w-[180px] border-4 p-4 shadow-[8px_8px_0px_0px_#000] transition-colors duration-300 ${borderClass} ${bgClass}`}>
      <div className={`flex flex-col gap-3 bg-gray-50 p-1.5 border-2 ${borderClass}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`aspect-[3/4] overflow-hidden border-2 bg-gray-100 relative ${borderClass}`}>
            {photos[i] ? (
              <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[10px] font-black text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200">
                <span>SLOT</span>
                <span>0{i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`mt-4 text-center text-[10px] font-black uppercase tracking-widest ${textClass}`}>
        {label}
      </div>
    </div>
  );
}

function StripHorizontal({ photos, selectedLayout }: { photos: string[]; selectedLayout?: string }) {
  const isDog = selectedLayout === "dog-filter";
  const bgClass = isDog ? "bg-[#FFF9EB]" : "bg-white";
  const borderClass = isDog ? "border-[#E6A04D]" : "border-black";
  const textClass = isDog ? "text-[#E6A04D]" : "text-black";
  const label = isDog ? "🐾 DOG FILTER LAYOUT 🐾" : "★ PHOTOBOOTH ★";

  return (
    <div className={`mx-auto max-w-xl border-4 p-4 shadow-[8px_8px_0px_0px_#000] transition-colors duration-300 ${borderClass} ${bgClass}`}>
      <div className={`grid grid-cols-4 gap-2.5 bg-gray-50 p-2 border-2 ${borderClass}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`aspect-[3/4] overflow-hidden border-2 bg-gray-100 relative ${borderClass}`}>
            {photos[i] ? (
              <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[10px] font-black text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200">
                <span>SLOT</span>
                <span>0{i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`mt-3 text-center text-xs font-black uppercase tracking-widest ${textClass}`}>
        {label}
      </div>
    </div>
  );
}

function PolaroidStack({ photos }: { photos: string[] }) {
  return (
    <div className="relative flex justify-center py-6" style={{ minHeight: 330 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute border-4 border-black bg-[#FAF6EE] p-3 shadow-[4px_4px_0px_0px_#000] w-40 transition-all duration-300 hover:z-50 hover:scale-105"
          style={{
            transform: `rotate(${(i - 1.5) * 8}deg) translateY(${Math.abs(i - 1.5) * 8}px)`,
            zIndex: i,
            left: `calc(50% - 80px + ${(i - 1.5) * 24}px)`,
          }}
        >
          <div className="overflow-hidden border-2 border-black aspect-[3/4] bg-gray-100 relative">
            {photos[i] ? (
              <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-xs font-black text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200">
                <span>SLOT</span>
                <span>0{i + 1}</span>
              </div>
            )}
          </div>
          <div className="mt-3 text-center text-[9px] font-black uppercase tracking-widest text-gray-600">
            📷 VINTAGE 0{i + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroGrid({ photos }: { photos: string[] }) {
  return (
    <div className="mx-auto max-w-md border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_#000]">
      <div className="grid grid-cols-3 gap-2.5 bg-gray-50 p-2 border-2 border-black">
        <div className="col-span-2 border-2 border-black aspect-[3/4] overflow-hidden bg-gray-100 relative">
          {photos[0] ? (
            <img src={photos[0]} alt="Hero photo" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-xs font-black text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200">
              <span>HERO</span>
              <span>SLOT 01</span>
            </div>
          )}
        </div>

        <div className="col-span-1 flex flex-col justify-between gap-2">
          {Array.from({ length: 3 }).map((_, idx) => {
            const i = idx + 1;
            return (
              <div key={i} className="flex-1 border-2 border-black aspect-[3/4] overflow-hidden bg-gray-100 relative min-h-0">
                {photos[i] ? (
                  <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[8px] font-black text-gray-400 bg-gray-50 border border-dashed border-gray-200">
                    <span>SLOT</span>
                    <span>0{i + 1}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 text-center text-xs font-black uppercase tracking-widest text-[#2D2D2D]">
        ✧ SOLACE LAYOUT ✧
      </div>
    </div>
  );
}

const RENDERERS: Record<string, React.FC<{ photos: string[]; selectedLayout?: string }>> = {
  "grid-2x2": Grid2x2,
  "strip-vertical": StripVertical,
  "strip-horizontal": StripHorizontal,
  "polaroid-stack": PolaroidStack,
  "hero-grid": HeroGrid,
};

export default function LayoutPreview({ photos, layoutType, selectedLayout }: LayoutPreviewProps) {
  const Renderer = RENDERERS[layoutType] ?? Grid2x2;
  return <Renderer photos={photos} selectedLayout={selectedLayout} />;
}
