import { type RefObject } from "react";
import type Webcam from "react-webcam";

export interface CropBox {
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
  videoWidth: number;
  videoHeight: number;
}

export async function capturePhoto(
  webcamRef: RefObject<Webcam | null>,
  selectedTheme: string,
  getCanvasFilter: (theme: string) => string,
  cropBox: CropBox | null = null,
): Promise<string | null> {
  const video = webcamRef.current?.video;
  if (!video || video.readyState < 2) return null;

  const canvas = document.createElement("canvas");
  const width = video.videoWidth || 1280;
  const height = video.videoHeight || 720;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  if (cropBox) {
    canvas.width = cropBox.cropWidth;
    canvas.height = cropBox.cropHeight;

    ctx.save();
    ctx.filter = getCanvasFilter(selectedTheme);
    ctx.translate(cropBox.cropWidth, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(
      video,
      cropBox.cropX,
      cropBox.cropY,
      cropBox.cropWidth,
      cropBox.cropHeight, // Koordinat asal di video
      0,
      0,
      cropBox.cropWidth,
      cropBox.cropHeight, // Koordinat target di canvas
    );

    ctx.restore();
  } else {
    ctx.save();
    ctx.filter = getCanvasFilter(selectedTheme);
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, width, height);
    ctx.restore();
  }

  return canvas.toDataURL("image/jpeg", 0.95);
}
