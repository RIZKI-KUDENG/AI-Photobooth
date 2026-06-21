/* eslint-disable react-refresh/only-export-components */
import type { LayoutDefinition } from "./types";

const MiniPreview: React.FC<{ previewImages: string[] }> = ({ previewImages }) => (
  <div className="relative h-[95px] w-full overflow-hidden bg-gray-50 border border-gray-300 flex items-center justify-center">
    {previewImages.map((img, i) => (
      <div
        key={i}
        className="absolute border border-black bg-white p-0.5 shadow-[1px_1px_0px_0px_#000] w-9"
        style={{
          transform: `rotate(${(i - 1.5) * 8}deg) translateY(${Math.abs(i - 1.5) * 4}px)`,
          zIndex: i,
          left: `calc(50% - 18px + ${(i - 1.5) * 7}px)`,
        }}
      >
        <div className="overflow-hidden aspect-[3/4] bg-gray-100">
          <img src={img} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    ))}
  </div>
);

const GalleryPreview: React.FC<{ photos: string[] }> = ({ photos }) => (
  <div
    className="relative flex justify-center py-4 sm:py-6"
    style={{ minHeight: 250 }}
  >
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="absolute border-4 border-black bg-[#FAF6EE] p-2 sm:p-3 shadow-[4px_4px_0px_0px_#000] w-28 sm:w-40 transition-all duration-300 hover:z-50 hover:scale-105"
        style={{
          transform: `rotate(${(i - 1.5) * 8}deg) translateY(${Math.abs(i - 1.5) * 8}px)`,
          zIndex: i,
          left: `calc(50% - ${56 + i * 6}px + ${(i - 1.5) * 24}px)`,
        }}
      >
        <div className="overflow-hidden border-2 border-black aspect-[3/4] bg-gray-100 relative">
          {photos[i] ? (
            <img
              src={photos[i]}
              alt={`Photo ${i + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] sm:text-xs font-black text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200">
              <span>SLOT</span>
              <span>0{i + 1}</span>
            </div>
          )}
        </div>
        <div className="mt-2 sm:mt-3 text-center text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-gray-600">
          VINTAGE 0{i + 1}
        </div>
      </div>
    ))}
  </div>
);

function downloadLayout(
  ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  _canvas: HTMLCanvasElement,
) {
  _canvas.width = 2250;
  _canvas.height = 2250;

  ctx.fillStyle = "#F4EFE6";
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);

  const centerX = _canvas.width / 2;
  const centerY = _canvas.height / 2;

  const polW = 800;
  const polH = 1000;

  const rotations = [-12, -4, 4, 12];
  const offsetsX = [-300, -100, 100, 300];
  const offsetsY = [50, -25, -25, 50];

  for (let i = 0; i < 4; i++) {
    ctx.save();
    const tx = centerX + offsetsX[i];
    const ty = centerY + offsetsY[i] - 75;
    ctx.translate(tx, ty);
    ctx.rotate((rotations[i] * Math.PI) / 180);

    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;

    ctx.fillStyle = "#FAF6EE";
    ctx.fillRect(-polW / 2, -polH / 2, polW, polH);

    ctx.shadowColor = "transparent";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(-polW / 2, -polH / 2, polW, polH);

    const picW = polW - 80;
    const picH = polH - 250;
    const px = -picW / 2;
    const py = -polH / 2 + 40;

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(px, py, picW, picH);

    if (images[i]) {
      ctx.drawImage(images[i], px + 2, py + 2, picW - 4, picH - 4);
    } else {
      ctx.fillStyle = "#F3F4F6";
      ctx.fillRect(px + 2, py + 2, picW - 4, picH - 4);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 35px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`SLOT 0${i + 1}`, 0, py + picH / 2);
    }

    ctx.fillStyle = "#4B5563";
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`📷 VINTAGE 0${i + 1}`, 0, polH / 2 - 88);

    ctx.restore();
  }

  ctx.fillStyle = "#2D2D2D";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "★ VINTAGE RETRO STACK ★",
    _canvas.width / 2,
    _canvas.height - 125,
  );
}

const layout: LayoutDefinition = {
  id: "vintage-layout",
  name: "Vintage Layout",
  badge: "NEW LAYOUT",
  size: "Size 6 x 2 Strip",
  poses: 4,
  previewImages: [
    "https://picsum.photos/id/338/150/200",
    "https://picsum.photos/id/349/150/200",
    "https://picsum.photos/id/365/150/200",
    "https://picsum.photos/id/395/150/200",
  ],
  MiniPreview,
  GalleryPreview,
  downloadLayout,
  cardClass: "border-black bg-[#FAF6EE] hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]",
  selectedCardClass: "border-[#A08A60] bg-[#FAF6EE] scale-105 shadow-[4px_4px_0px_0px_#000]",
};

export default layout;
