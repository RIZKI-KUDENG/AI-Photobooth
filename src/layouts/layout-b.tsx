/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC<{ previewImages: string[] }> = ({ previewImages }) => (
  <div className="grid grid-cols-2 gap-0.5 bg-gray-100 p-0.5 border border-gray-300 aspect-[3/4] w-full">
    {previewImages.map((img, i) => (
      <div key={i} className="aspect-[3/4] w-full overflow-hidden bg-gray-200">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>
    ))}
  </div>
);

const GalleryPreview: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div className="mx-auto w-full max-w-xs sm:max-w-sm border-4 border-black bg-white p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000]">
    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 bg-gray-50 p-1.5 sm:p-2 border-2 border-black">
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
    <div className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#2D2D2D]">
      ★ PHOTOBOOTH LAYOUT B ★
    </div>
  </div>
);

function downloadLayout(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], _canvas: HTMLCanvasElement) {
  _canvas.width = 2000;
  _canvas.height = 2750;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  ctx.lineWidth = 40;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(20, 20, _canvas.width - 40, _canvas.height - 40);

  const leftOffset = 100;
  const topOffset = 100;
  const gap = 50;
  const itemW = (_canvas.width - leftOffset * 2 - gap) / 2; // 875
  const itemH = 1075;

  for (let i = 0; i < 4; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = leftOffset + col * (itemW + gap);
    const y = topOffset + row * (itemH + gap);

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(x, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], x + 5, y + 5, itemW - 10, itemH - 10);
    } else {
      ctx.fillStyle = "#F3F4F6";
      ctx.fillRect(x + 5, y + 5, itemW - 10, itemH - 10);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#2D2D2D";
  ctx.font = "bold 70px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★ PHOTOBOOTH LAYOUT B ★", _canvas.width / 2, _canvas.height - 175);
}

const layout: LayoutDefinition = {
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
  MiniPreview,
  GalleryPreview,
  downloadLayout,
  cardClass: "border-black bg-white hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]",
  selectedCardClass: "border-[#FFC72C] bg-[#FFFBEB] scale-105 shadow-[4px_4px_0px_0px_#000]",
};

export default layout;
