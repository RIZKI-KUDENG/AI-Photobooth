/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC<{ previewImages: string[] }> = ({ previewImages }) => (
  <div className="grid grid-cols-3 gap-0.5 bg-gray-100 p-0.5 border border-gray-300 aspect-[3/4] w-full">
    <div className="col-span-2 aspect-[3/4] overflow-hidden bg-gray-200">
      <img src={previewImages[0]} alt="" className="h-full w-full object-cover" />
    </div>
    <div className="col-span-1 flex flex-col gap-0.5 justify-between">
      {previewImages.slice(1).map((img, i) => (
        <div key={i} className="aspect-[3/4] w-full overflow-hidden bg-gray-200 min-h-0">
          <img src={img} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  </div>
);

const GalleryPreview: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div className="mx-auto w-full max-w-xs sm:max-w-md border-4 border-black bg-white p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000]">
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 bg-gray-50 p-1.5 sm:p-2 border-2 border-black">
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
    <div className="mt-2 sm:mt-3 text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#2D2D2D]">
      ✧ SOLACE LAYOUT ✧
    </div>
  </div>
);

function downloadLayout(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], _canvas: HTMLCanvasElement) {
  _canvas.width = 800;
  _canvas.height = 600;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  ctx.lineWidth = 14;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(7, 7, _canvas.width - 14, _canvas.height - 14);

  const leftOffset = 30;
  const topOffset = 30;
  const gap = 20;

  const heroW = 460;
  const heroH = 460;
  const hx = leftOffset;
  const hy = topOffset;

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(hx, hy, heroW, heroH);

  if (images[0]) {
    ctx.drawImage(images[0], hx + 2, hy + 2, heroW - 4, heroH - 4);
  } else {
    ctx.fillStyle = "#F3F4F6";
    ctx.fillRect(hx + 2, hy + 2, heroW - 4, heroH - 4);
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("HERO SLOT 01", hx + heroW / 2, hy + heroH / 2);
  }

  const rightX = leftOffset + heroW + gap;
  const itemW = _canvas.width - rightX - leftOffset;
  const itemH = (heroH - gap * 2) / 3;

  for (let idx = 0; idx < 3; idx++) {
    const i = idx + 1;
    const y = topOffset + idx * (itemH + gap);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(rightX, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], rightX + 1, y + 1, itemW - 2, itemH - 2);
    } else {
      ctx.fillStyle = "#F3F4F6";
      ctx.fillRect(rightX + 1, y + 1, itemW - 2, itemH - 2);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, rightX + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#2D2D2D";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("✧ SOLACE LAYOUT ✧", _canvas.width / 2, _canvas.height - 45);
}

const layout: LayoutDefinition = {
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
  MiniPreview,
  GalleryPreview,
  downloadLayout,
};

export default layout;
