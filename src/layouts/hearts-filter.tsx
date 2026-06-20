/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC = () => (
  <div className="flex flex-col gap-0.5 bg-[#FFF0F2] p-0.5 border border-[#FF8DA1] aspect-[3/4] w-full">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="aspect-[4/3] w-full overflow-hidden bg-[#FFF0F2]" />
    ))}
  </div>
);

const GalleryPreview: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div className="mx-auto w-full max-w-[180px] border-4 border-[#FF8DA1] bg-[#FFF0F2] p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000]">
    <div className="flex flex-col gap-2 sm:gap-3 bg-gray-50 p-1.5 border-2 border-[#FF8DA1]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-[3/4] overflow-hidden border-2 border-[#FF8DA1] bg-gray-100 relative">
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
    <div className="mt-3 sm:mt-4 text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#FF6B91]">
      ♥ HEARTS FILTER ♥
    </div>
  </div>
);

function downloadLayout(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], _canvas: HTMLCanvasElement) {
  _canvas.width = 400;
  _canvas.height = 1200;

  ctx.fillStyle = "#FFF0F2";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  ctx.lineWidth = 12;
  ctx.strokeStyle = "#FF8DA1";
  ctx.strokeRect(6, 6, _canvas.width - 12, _canvas.height - 12);

  const leftOffset = 30;
  const topOffset = 30;
  const gap = 20;
  const itemW = _canvas.width - leftOffset * 2;
  const itemH = 240;

  for (let i = 0; i < 4; i++) {
    const x = leftOffset;
    const y = topOffset + i * (itemH + gap);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#FF8DA1";
    ctx.strokeRect(x, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], x + 2, y + 2, itemW - 4, itemH - 4);
    } else {
      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(x + 2, y + 2, itemW - 4, itemH - 4);
      ctx.fillStyle = "#FF8DA1";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#FF6B91";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("♥ HEARTS FILTER ♥", _canvas.width / 2, _canvas.height - 70);
}

const layout: LayoutDefinition = {
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
  MiniPreview,
  GalleryPreview,
  downloadLayout,
};

export default layout;
