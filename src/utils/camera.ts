import { type RefObject } from "react";
import type Webcam from "react-webcam";

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function capturePhoto(
  webcamRef: RefObject<Webcam | null>,
  selectedTheme: string,
  selectedLayout: string,
  getCanvasFilter: (theme: string) => string,
): Promise<string | null> {
  const video = webcamRef.current?.video;
  if (!video) return null;

  const canvas = document.createElement("canvas");
  const width = video.videoWidth || 1280;
  const height = video.videoHeight || 720;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.save();
  ctx.filter = getCanvasFilter(selectedTheme);
  ctx.drawImage(video, 0, 0, width, height);
  ctx.restore();

  const overlayCandidates = [
    `/overlays/${selectedLayout}.png`,
    `/overlays/${selectedLayout}.svg`,
  ];

  let overlayImg: HTMLImageElement | null = null;
  for (const src of overlayCandidates) {
    try {
      overlayImg = await loadImage(src);
      break;
    } catch {
      // try next candidate
    }
  }

  if (overlayImg) {
    try {
      ctx.drawImage(overlayImg, 0, 0, width, height);
    } catch {
      // overlay failed silently
    }
  }

  return canvas.toDataURL("image/jpeg");
}
