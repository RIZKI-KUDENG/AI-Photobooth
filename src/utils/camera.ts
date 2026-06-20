import { type RefObject } from "react";
import type Webcam from "react-webcam";

export async function capturePhoto(
  webcamRef: RefObject<Webcam | null>,
  selectedTheme: string,
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

  return canvas.toDataURL("image/jpeg", 0.95);
}
