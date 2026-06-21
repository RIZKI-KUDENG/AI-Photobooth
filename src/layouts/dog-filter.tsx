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
  _canvas.width = 1200;
  _canvas.height = 400;

  ctx.fillStyle = "#FFF9EB";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  ctx.lineWidth = 12;
  ctx.strokeStyle = "#E6A04D";
  ctx.strokeRect(6, 6, _canvas.width - 12, _canvas.height - 12);

  const leftOffset = 30;
  const topOffset = 30;
  const gap = 20;
  const itemW = 265;
  const itemH = 280;

  for (let i = 0; i < 4; i++) {
    const x = leftOffset + i * (itemW + gap);
    const y = topOffset;

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#E6A04D";
    ctx.strokeRect(x, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], x + 2, y + 2, itemW - 4, itemH - 4);
    } else {
      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(x + 2, y + 2, itemW - 4, itemH - 4);
      ctx.fillStyle = "#E6A04D";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#E6A04D";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "🐾 DOG FILTER LAYOUT 🐾",
    _canvas.width / 2,
    _canvas.height - 40,
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
};

export default layout;
