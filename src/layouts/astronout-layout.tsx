/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC<{ previewImages: string[] }> = ({ previewImages }) => (
  <div className="flex flex-col gap-0.5 bg-[#0B132B] p-0.5 border border-[#48CAE4] w-full relative overflow-hidden text-white">
    <span className="absolute top-1 left-1 text-[6px] text-yellow-300 z-10">⭐</span>
    <span className="absolute top-16 right-1 text-[5px] text-yellow-300 z-10">✨</span>
    <span className="absolute bottom-16 left-1 text-[5px] text-yellow-300 z-10">💫</span>
    <span className="absolute bottom-1 right-1 text-[6px] text-yellow-300 z-10">🌟</span>
    {previewImages.map((img, i) => (
      <div key={i} className="aspect-[4/3] w-full overflow-hidden bg-[#1C2541] border border-[#48CAE4]/30 relative z-0">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>
    ))}
  </div>
);

const GalleryPreview: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div className="mx-auto w-full max-w-[180px] border-4 border-[#48CAE4] bg-[#0B132B] p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000] relative text-white">
    {/* Background Star Ornaments */}
    <div className="absolute top-2 left-2 text-[10px] animate-pulse">⭐</div>
    <div className="absolute top-12 right-2 text-[8px]">✨</div>
    <div className="absolute bottom-12 left-2 text-[8px]">💫</div>
    <div className="absolute bottom-2 right-2 text-[10px] animate-pulse">🌟</div>

    <div className="flex flex-col gap-2 sm:gap-3 bg-[#1C2541] p-1.5 border-2 border-[#48CAE4]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-[3/4] overflow-hidden border-2 border-[#48CAE4] bg-[#1C2541] relative">
          {photos[i] ? (
            <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] font-black text-blue-300 bg-[#1C2541] border-2 border-dashed border-blue-900">
              <span>SLOT</span>
              <span>0{i + 1}</span>
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="mt-3 sm:mt-4 text-center text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#48CAE4] flex items-center justify-center gap-1">
      <span>🚀</span>
      <span>SPACE ODYSSEY</span>
      <span>👩‍🚀</span>
    </div>
  </div>
);

function downloadLayout(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], _canvas: HTMLCanvasElement) {
  _canvas.width = 1200;
  _canvas.height = 3600;

  // Deep Space Background
  ctx.fillStyle = "#0B132B";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  // Cyan Border
  ctx.lineWidth = 36;
  ctx.strokeStyle = "#48CAE4";
  ctx.strokeRect(18, 18, _canvas.width - 36, _canvas.height - 36);

  // Draw space stars
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "42px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("⭐", 75, 135);
  ctx.fillText("✨", 1110, 450);
  ctx.fillText("💫", 60, 1800);
  ctx.fillText("🌟", 1125, 3000);
  ctx.fillText("🪐", 75, 2700);
  ctx.fillText("⭐", 1110, 2250);

  const leftOffset = 105;
  const topOffset = 150;
  const gap = 72;
  const itemW = _canvas.width - leftOffset * 2; // 990
  const itemH = 720;

  for (let i = 0; i < 4; i++) {
    const x = leftOffset;
    const y = topOffset + i * (itemH + gap);

    ctx.lineWidth = 12;
    ctx.strokeStyle = "#48CAE4";
    ctx.strokeRect(x, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], x + 6, y + 6, itemW - 12, itemH - 12);
    } else {
      ctx.fillStyle = "#1C2541";
      ctx.fillRect(x + 6, y + 6, itemW - 12, itemH - 12);
      ctx.fillStyle = "#48CAE4";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "#48CAE4";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🚀 SPACE ODYSSEY 👩‍🚀", _canvas.width / 2, _canvas.height - 180);
}

const layout: LayoutDefinition = {
  id: "astronout-layout",
  name: "Astronaut Layout",
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
  cardClass: "border-black bg-[#0B132B] hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000] text-white",
  selectedCardClass: "border-[#48CAE4] bg-[#0B132B] scale-105 shadow-[4px_4px_0px_0px_#48CAE4] text-white",
};

export default layout;
