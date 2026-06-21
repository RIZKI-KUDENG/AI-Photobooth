/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC<{ previewImages: string[] }> = ({ previewImages }) => (
  <div className="flex flex-col gap-0.5 bg-[#F2BB05] p-0.5 border border-[#1A1A1A] w-full relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1.5 h-full flex flex-col z-10">
      <div className="flex-1 bg-[#D93829]" />
      <div className="flex-1 bg-[#2C628C]" />
      <div className="flex-1 bg-[#FFFFFF]" />
    </div>
    {previewImages.map((img, i) => (
      <div key={i} className="aspect-[4/3] w-[calc(100%-6px)] overflow-hidden bg-[#FAF6EE] border border-[#1A1A1A]/30 relative z-0">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>
    ))}
  </div>
);

const GalleryPreview: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div className="mx-auto w-full max-w-[180px] border-4 border-[#1A1A1A] bg-[#F2BB05] p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000] relative">
    <div className="absolute top-0 right-0 w-2 h-full flex flex-col border-l-2 border-black">
      <div className="flex-1 bg-[#D93829]" />
      <div className="flex-1 bg-[#2C628C]" />
      <div className="flex-1 bg-[#FFFFFF]" />
    </div>
    
    <div className="flex flex-col gap-2 sm:gap-3 bg-[#FAF6EE] p-1.5 border-2 border-black mr-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-[3/4] overflow-hidden border-2 border-black bg-gray-100 relative">
          {photos[i] ? (
            <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] font-black text-gray-500 bg-gray-50 border-2 border-dashed border-gray-200">
              <span>SLOT</span>
              <span>0{i + 1}</span>
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="mt-3 sm:mt-4 text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black flex items-center justify-center gap-1 mr-1">
      <span>🎸</span>
      <span>THE BEATLES</span>
      <span>🎵</span>
    </div>
  </div>
);

function downloadLayout(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], _canvas: HTMLCanvasElement) {
  _canvas.width = 1200;
  _canvas.height = 3600;

  ctx.fillStyle = "#F2BB05";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  ctx.lineWidth = 36;
  ctx.strokeStyle = "#1A1A1A";
  ctx.strokeRect(18, 18, _canvas.width - 36, _canvas.height - 36);

  const stripeW = 60;
  const stripeX = _canvas.width - stripeW - 18;
  ctx.fillStyle = "#D93829";
  ctx.fillRect(stripeX, 18, stripeW / 3, _canvas.height - 36);
  ctx.fillStyle = "#2C628C";
  ctx.fillRect(stripeX + stripeW / 3, 18, stripeW / 3, _canvas.height - 36);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(stripeX + (2 * stripeW) / 3, 18, stripeW / 3, _canvas.height - 36);

  const leftOffset = 90;
  const topOffset = 150;
  const gap = 72;
  const itemW = _canvas.width - leftOffset * 2 - stripeW; // 960
  const itemH = 720;

  for (let i = 0; i < 4; i++) {
    const x = leftOffset;
    const y = topOffset + i * (itemH + gap);

    ctx.lineWidth = 12;
    ctx.strokeStyle = "#1A1A1A";
    ctx.strokeRect(x, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], x + 6, y + 6, itemW - 12, itemH - 12);
    } else {
      ctx.fillStyle = "#FAF6EE";
      ctx.fillRect(x + 6, y + 6, itemW - 12, itemH - 12);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#1A1A1A";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🎸 THE BEATLES 🎵", (_canvas.width - stripeW) / 2, _canvas.height - 180);
}

const layout: LayoutDefinition = {
  id: "beatles-layout",
  name: "The Beatles Layout",
  badge: "NEW LAYOUT",
  size: "Size 6 x 2 Strip",
  poses: 4,
  previewImages: [
    "https://picsum.photos/id/1025/150/200",
    "https://picsum.photos/id/1062/150/200",
    "https://picsum.photos/id/240/150/200",
    "https://picsum.photos/id/237/150/200",
  ],
  MiniPreview,
  GalleryPreview,
  downloadLayout,
  cardClass: "border-black bg-[#F2BB05] hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]",
  selectedCardClass: "border-[#1A1A1A] bg-[#F2BB05] scale-105 shadow-[4px_4px_0px_0px_#1A1A1A]",
};

export default layout;
