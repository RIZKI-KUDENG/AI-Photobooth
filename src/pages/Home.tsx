import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import PhotoboothLayout from "../components/templates/PhotoboothLayout";
import FilterCard from "../components/organisms/FilterCard";
import Gallery from "../components/organisms/Gallery";
import CameraCard from "../components/organisms/CameraCard";
import {
  getThemeFilter,
  getCanvasFilter,
  getLayoutLimit,
} from "../utils/filters";
import { capturePhoto } from "../utils/camera";
import { initHandLandMarker } from "../utils/gestureDetector";

export default function Home() {
  const webcamRef = useRef<Webcam | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>("ALL BLACK");
  const [selectedLayout, setSelectedLayout] = useState<string>("layout-b");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(3);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const [landmarker, setLandmarker] = useState<any>(null);
  const [cropBoxProps, setCropBoxProps] = useState<{
    top: string;
    left: string;
    width: string;
    height: string;
  } | null>(null);

  const currentCropBoxRef = useRef<any>(null);
  const captureInProgressRef = useRef<boolean>(false);

  const maxPhotos = getLayoutLimit(selectedLayout);

  const handleSnap = useCallback(
    async (forcedCropBox?: any) => {
      const dataUrl = await capturePhoto(
        webcamRef,
        selectedTheme,
        getCanvasFilter,
        forcedCropBox || null,
      );
      if (dataUrl) {
        setPhotos((prev) => [...prev, dataUrl]);
      }
      setCropBoxProps(null);
      currentCropBoxRef.current = null;
      captureInProgressRef.current = false;
    },
    [selectedTheme],
  );

  // Efek Countdown waktu jepret
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setTimeout(() => {
      if (countdown === 1) {
        // Ambil posisi koordinat paling mutakhir di detik terakhir countdown selesai
        handleSnap(currentCropBoxRef.current);
        setCountdown(null);
        setIsCapturing(false);
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, handleSnap]);

  const startCountdown = useCallback(() => {
    if (photos.length >= maxPhotos) {
      alert(
        "Slot foto sudah penuh! Reset atau ganti layout untuk mengambil foto baru.",
      );
      return;
    }
    captureInProgressRef.current = true;
    if (timerDuration === 0) {
      handleSnap(currentCropBoxRef.current);
      return;
    }
    setIsCapturing(true);
    setCountdown(timerDuration);
  }, [photos.length, maxPhotos, timerDuration, handleSnap]);

  useEffect(() => {
    initHandLandMarker()
      .then((instance) => setLandmarker(instance))
      .catch((err) => console.error("Gagal memuat MediaPipe:", err));
  }, []);

  useEffect(() => {
    if (!landmarker) return;

    let active = true;
    let animationFrameId: number;
    let boxLocked = false;
    let handsDownTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastCropBox: any = null;
    const PINCH_THRESHOLD = 0.05;

    const detectFrame = () => {
      if (!active) return;

      const video = webcamRef.current?.video;
      if (video && video.readyState >= 2) {
        const timestamp = performance.now();
        const results = landmarker.detectForVideo(video, timestamp);
        const hands = results.landmarks;
        const handsDetected = hands && hands.length > 0;

        const pinchPoints: { x: number; y: number }[] = [];
        if (hands) {
          for (const h of hands) {
            const dx = h[4].x - h[8].x;
            const dy = h[4].y - h[8].y;
            const dz = h[4].z - h[8].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < PINCH_THRESHOLD) {
              pinchPoints.push({
                x: (h[4].x + h[8].x) / 2,
                y: (h[4].y + h[8].y) / 2,
              });
            }
          }
        }

        const bothPinching = pinchPoints.length >= 2;

        if (bothPinching) {
          const rawMinX = Math.min(pinchPoints[0].x, pinchPoints[1].x);
          const rawMaxX = Math.max(pinchPoints[0].x, pinchPoints[1].x);
          const rawMinY = Math.min(pinchPoints[0].y, pinchPoints[1].y);
          const rawMaxY = Math.max(pinchPoints[0].y, pinchPoints[1].y);

          const boxWidthRatio = rawMaxX - rawMinX;
          const boxHeightRatio = rawMaxY - rawMinY;

          if (boxWidthRatio > 0.08 && boxHeightRatio > 0.08) {
            const vWidth = video.videoWidth || 1280;
            const vHeight = video.videoHeight || 720;

            lastCropBox = {
              cropX: rawMinX * vWidth,
              cropY: rawMinY * vHeight,
              cropWidth: boxWidthRatio * vWidth,
              cropHeight: boxHeightRatio * vHeight,
            };
            currentCropBoxRef.current = lastCropBox;

            setCropBoxProps({
              left: `${(1 - rawMaxX) * 100}%`,
              top: `${rawMinY * 100}%`,
              width: `${boxWidthRatio * 100}%`,
              height: `${boxHeightRatio * 100}%`,
            });

            boxLocked = true;
            if (handsDownTimeout) {
              clearTimeout(handsDownTimeout);
              handsDownTimeout = null;
              captureInProgressRef.current = false;
            }
          }
        } else if (boxLocked && lastCropBox) {
          if (!handsDetected) {
            boxLocked = false;
            setCropBoxProps(null);
            if (
              !isCapturing &&
              countdown === null &&
              photos.length < maxPhotos
            ) {
              captureInProgressRef.current = true;
              handsDownTimeout = setTimeout(() => {
                handsDownTimeout = null;
                if (active) {
                  if (timerDuration === 0) {
                    handleSnap(currentCropBoxRef.current);
                  } else {
                    setIsCapturing(true);
                    setCountdown(timerDuration);
                  }
                }
              }, 1000);
            }
          }
          } else {
            boxLocked = false;
            setCropBoxProps(null);
            if (!captureInProgressRef.current) {
              currentCropBoxRef.current = null;
              lastCropBox = null;
            }
          }
      }

      animationFrameId = requestAnimationFrame(detectFrame);
    };

    detectFrame();

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
      if (handsDownTimeout) clearTimeout(handsDownTimeout);
    };
  }, [
    landmarker,
    isCapturing,
    countdown,
    photos.length,
    maxPhotos,
    timerDuration,
    handleSnap,
  ]);

  const resetSession = useCallback(() => {
    setPhotos([]);
    setCropBoxProps(null);
    currentCropBoxRef.current = null;
    captureInProgressRef.current = false;
  }, []);

  return (
    <PhotoboothLayout
      leftContent={
        <FilterCard
          selectedTheme={selectedTheme}
          selectedLayout={selectedLayout}
          onSelectTheme={setSelectedTheme}
          onSelectLayout={setSelectedLayout}
        />
      }
      centerContent={
        <CameraCard
          webcamRef={webcamRef}
          selectedTheme={selectedTheme}
          selectedLayout={selectedLayout}
          countdown={countdown}
          isCapturing={isCapturing}
          timerDuration={timerDuration}
          slotsFull={photos.length >= maxPhotos}
          onSnap={startCountdown}
          onSelectDuration={setTimerDuration}
          getThemeFilter={getThemeFilter}
          cropBoxProps={cropBoxProps}
        />
      }
      rightContent={
        <Gallery
          photos={photos}
          selectedLayout={selectedLayout}
          maxPhotos={maxPhotos}
          onReset={resetSession}
        />
      }
    />
  );
}
