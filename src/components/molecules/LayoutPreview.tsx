interface LayoutPreviewProps {
  photos: string[];
  layoutType: string;
}

function Grid2x2({ photos }: { photos: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {photos.map((photo, i) => (
        <div key={i} className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000]">
          <div className="overflow-hidden border-2 border-black aspect-3/4 bg-gray-100">
            <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
          <div className="mt-2 text-center text-xs font-black uppercase">SHR-0{i + 1}</div>
        </div>
      ))}
    </div>
  );
}

function StripVertical({ photos }: { photos: string[] }) {
  return (
    <div className="flex flex-col gap-3 max-w-xs mx-auto">
      {photos.map((photo, i) => (
        <div key={i} className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000] flex gap-3 items-center">
          <div className="overflow-hidden border-2 border-black w-20 aspect-3/4 bg-gray-100 shrink-0">
            <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-black uppercase">SHR-0{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function StripHorizontal({ photos }: { photos: string[] }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {photos.map((photo, i) => (
        <div key={i} className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000]">
          <div className="overflow-hidden border-2 border-black aspect-3/4 bg-gray-100">
            <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
          <div className="mt-2 text-center text-xs font-black uppercase">SHR-0{i + 1}</div>
        </div>
      ))}
    </div>
  );
}

function PolaroidStack({ photos }: { photos: string[] }) {
  return (
    <div className="relative flex justify-center" style={{ minHeight: 280 }}>
      {photos.map((photo, i) => (
        <div
          key={i}
          className="absolute border-4 border-black bg-white p-3 shadow-[4px_4px_0px_0px_#000] w-40"
          style={{
            transform: `rotate(${(i - 1.5) * 6}deg)`,
            zIndex: i,
            top: Math.abs(i - 1.5) * 12,
          }}
        >
          <div className="overflow-hidden border-2 border-black aspect-3/4 bg-gray-100">
            <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
          <div className="mt-3 text-center text-[10px] font-black uppercase tracking-widest text-gray-600">
            SHR-0{i + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroGrid({ photos }: { photos: string[] }) {
  const [first, ...rest] = photos;
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-3 sm:col-span-2 row-span-2 border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000]">
        <div className="overflow-hidden border-2 border-black aspect-3/4 bg-gray-100">
          {first && <img src={first} alt="Hero photo" className="w-full h-full object-cover" />}
        </div>
        <div className="mt-2 text-center text-xs font-black uppercase">SHR-01</div>
      </div>
      <div className="col-span-3 sm:col-span-1 flex flex-col gap-3">
        {rest.map((photo, i) => (
          <div key={i} className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000]">
            <div className="overflow-hidden border-2 border-black aspect-3/4 bg-gray-100">
              <img src={photo} alt={`Photo ${i + 2}`} className="w-full h-full object-cover" />
            </div>
            <div className="mt-1 text-center text-[10px] font-black uppercase">SHR-0{i + 2}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const RENDERERS: Record<string, React.FC<{ photos: string[] }>> = {
  "grid-2x2": Grid2x2,
  "strip-vertical": StripVertical,
  "strip-horizontal": StripHorizontal,
  "polaroid-stack": PolaroidStack,
  "hero-grid": HeroGrid,
};

export default function LayoutPreview({ photos, layoutType }: LayoutPreviewProps) {
  const Renderer = RENDERERS[layoutType] ?? Grid2x2;
  return <Renderer photos={photos} />;
}
