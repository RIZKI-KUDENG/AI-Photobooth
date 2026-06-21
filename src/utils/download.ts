import { getLayout } from "../layouts/registry";

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function downloadLayout(photos: string[], selectedLayout: string) {
  if (photos.length === 0) return;

  const layout = getLayout(selectedLayout);
  if (!layout || !layout.downloadLayout) {
    console.warn(`No download renderer for layout: ${selectedLayout}`);
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const images = await Promise.all(photos.map(src => loadImage(src)));

  layout.downloadLayout(ctx, images, canvas);

  const link = document.createElement("a");
  link.download = `photobooth-${selectedLayout}-${Date.now()}.jpg`;
  link.href = canvas.toDataURL("image/jpeg", 0.95);
  link.click();
}
