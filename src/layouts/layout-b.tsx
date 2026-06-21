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
  _canvas.width = 800;
  _canvas.height = 1100;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  ctx.lineWidth = 16;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(8, 8, _canvas.width - 16, _canvas.height - 16);

  const leftOffset = 40;
  const topOffset = 40;
  const gap = 20;
  const itemW = (_canvas.width - leftOffset * 2 - gap) / 2;
  const itemH = 430;

  for (let i = 0; i < 4; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = leftOffset + col * (itemW + gap);
    const y = topOffset + row * (itemH + gap);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(x, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], x + 2, y + 2, itemW - 4, itemH - 4);
    } else {
      ctx.fillStyle = "#F3F4F6";
      ctx.fillRect(x + 2, y + 2, itemW - 4, itemH - 4);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#2D2D2D";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.fillText("★ PHOTOBOOTH LAYOUT B ★", _canvas.width / 2, _canvas.height - 70);
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
};

export default layout;
