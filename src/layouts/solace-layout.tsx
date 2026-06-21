/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC<{ previewImages: string[] }> = ({ previewImages }) => (
  <div className="grid grid-cols-3 gap-0.5 bg-[#720917] p-0.5 border border-white aspect-[3/4] w-full">
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
  <div className="mx-auto w-full max-w-xs sm:max-w-md border-4 border-white bg-[#720917] p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000] text-white">
    <div className="text-center font-serif italic text-lg sm:text-xl tracking-wider text-white mb-2 font-light">
      solace
    </div>
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 bg-[#5A0612] p-1.5 sm:p-2 border-2 border-white">
      <div className="col-span-2 border-2 border-white aspect-[3/4] overflow-hidden bg-gray-100 relative">
        {photos[0] ? (
          <img src={photos[0]} alt="Hero photo" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-xs font-black text-gray-400 bg-[#720917]/20 border-2 border-dashed border-white/30">
            <span>HERO</span>
            <span>SLOT 01</span>
          </div>
        )}
      </div>
      <div className="col-span-1 flex flex-col justify-between gap-2">
        {Array.from({ length: 3 }).map((_, idx) => {
          const i = idx + 1;
          return (
            <div key={i} className="flex-1 border-2 border-white aspect-[3/4] overflow-hidden bg-gray-100 relative min-h-0">
              {photos[i] ? (
                <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[8px] font-black text-gray-400 bg-[#720917]/20 border border-dashed border-white/30">
                  <span>SLOT</span>
                  <span>0{i + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    <div className="mt-2 text-center text-[7px] tracking-widest text-white/50 uppercase font-bold">
      photobooth
    </div>
  </div>
);

function downloadLayout(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], _canvas: HTMLCanvasElement) {
  _canvas.width = 2000;
  _canvas.height = 1625;

  // Background Maroon
  ctx.fillStyle = "#720917";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  // Border White
  ctx.lineWidth = 35;
  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeRect(17.5, 17.5, _canvas.width - 35, _canvas.height - 35);

  // Solace Cursive Text at Top
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "italic 80px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("solace", _canvas.width / 2, 125);

  const leftOffset = 75;
  const topOffset = 200;
  const gap = 50;

  const heroW = 1150;
  const heroH = 1150;
  const hx = leftOffset;
  const hy = topOffset;

  ctx.lineWidth = 10;
  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeRect(hx, hy, heroW, heroH);

  if (images[0]) {
    ctx.drawImage(images[0], hx + 5, hy + 5, heroW - 10, heroH - 10);
  } else {
    ctx.fillStyle = "#5A0612";
    ctx.fillRect(hx + 5, hy + 5, heroW - 10, heroH - 10);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 45px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("HERO SLOT 01", hx + heroW / 2, hy + heroH / 2);
  }

  const rightX = leftOffset + heroW + gap;
  const itemW = _canvas.width - rightX - leftOffset; // 650
  const itemH = (heroH - gap * 2) / 3; // 350

  for (let idx = 0; idx < 3; idx++) {
    const i = idx + 1;
    const y = topOffset + idx * (itemH + gap);

    ctx.lineWidth = 8;
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeRect(rightX, y, itemW, itemH);

    if (images[i]) {
      ctx.drawImage(images[i], rightX + 4, y + 4, itemW - 8, itemH - 8);
    } else {
      ctx.fillStyle = "#5A0612";
      ctx.fillRect(rightX + 4, y + 4, itemW - 8, itemH - 8);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 30px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, rightX + itemW / 2, y + itemH / 2);
    }
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PHOTOBOOTH", _canvas.width / 2, _canvas.height - 75);
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
  cardClass: "border-black bg-[#720917] hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]",
  selectedCardClass: "border-white bg-[#720917] scale-105 shadow-[4px_4px_0px_0px_#fff]",
};

export default layout;
