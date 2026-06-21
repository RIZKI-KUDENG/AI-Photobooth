/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC<{ previewImages: string[] }> = ({ previewImages }) => (
  <div className="grid grid-cols-4 gap-0.5 bg-[#FFF9EB] p-0.5 border border-[#E6A04D] w-full aspect-[4/3] items-center justify-center">
    {previewImages.map((img, i) => (
      <div key={i} className="aspect-[3/4] w-full overflow-hidden bg-[#FFF9EB]">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>
    ))}
  </div>
);

const GalleryPreview: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div className="mx-auto w-full max-w-lg sm:max-w-xl border-4 border-[#E6A04D] bg-[#FFF9EB] p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000]">
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 bg-gray-50 p-1.5 sm:p-2 border-2 border-[#E6A04D]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="aspect-3/4 overflow-hidden border-2 border-[#E6A04D] bg-gray-100 relative"
        >
          {photos[i] ? (
            <img
              src={photos[i]}
              alt={`Photo ${i + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] font-black text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200">
              <span>SLOT</span>
              <span>0{i + 1}</span>
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="mt-2 sm:mt-3 text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#E6A04D]">
      🐾 DOG FILTER LAYOUT 🐾
    </div>
  </div>
);

function downloadLayout(
  ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  _canvas: HTMLCanvasElement,
) {
  _canvas.width = 3600;
  _canvas.height = 1200;

  ctx.fillStyle = "#FFF9EB";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  ctx.lineWidth = 36;
  ctx.strokeStyle = "#E6A04D";
  ctx.strokeRect(18, 18, _canvas.width - 36, _canvas.height - 36);

  const leftOffset = 90;
  const topOffset = 90;
  const gap = 60;
  const itemW = 795;
  const itemH = 840;

  for (let i = 0; i < 4; i++) {
    const x = leftOffset + i * (itemW + gap);
    const y = topOffset;

    ctx.lineWidth = 12;
    ctx.strokeStyle = "#E6A04D";
    ctx.strokeRect(x, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], x + 6, y + 6, itemW - 12, itemH - 12);
    } else {
      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(x + 6, y + 6, itemW - 12, itemH - 12);
      ctx.fillStyle = "#E6A04D";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#E6A04D";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "🐾 DOG FILTER LAYOUT 🐾",
    _canvas.width / 2,
    _canvas.height - 120,
  );
}

const layout: LayoutDefinition = {
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
  MiniPreview,
  GalleryPreview,
  downloadLayout,
  cardClass: "border-black bg-white hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]",
  selectedCardClass: "border-[#E6A04D] bg-[#FFF9EB] scale-105 shadow-[4px_4px_0px_0px_#000]",
};

export default layout;
