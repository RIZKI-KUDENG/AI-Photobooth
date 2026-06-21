import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import PhotoboothLayout from "../components/templates/PhotoboothLayout";
import FilterCard from "../components/organisms/FilterCard";
import Gallery from "../components/organisms/Gallery";
import CameraCard from "../components/organisms/CameraCard";
import { getThemeFilter, getCanvasFilter, getLayoutLimit } from "../utils/filters";
import { capturePhoto } from "../utils/camera";

export default function Home() {
  const webcamRef = useRef<Webcam | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>("ALL BLACK");
  const [selectedLayout, setSelectedLayout] = useState<string>("layout-b");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(3);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const maxPhotos = getLayoutLimit(selectedLayout);

  const handleSnap = useCallback(async () => {
    const dataUrl = await capturePhoto(webcamRef, selectedTheme, getCanvasFilter);
    if (dataUrl) {
      setPhotos((prev) => [...prev, dataUrl]);
    }
  }, [selectedTheme]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setTimeout(() => {
      if (countdown === 1) {
        handleSnap();
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
      alert("Slot foto sudah penuh! Reset atau ganti layout untuk mengambil foto baru.");
      return;
    }
    if (timerDuration === 0) {
      handleSnap();
      return;
    }
    setIsCapturing(true);
    setCountdown(timerDuration);
  }, [photos.length, maxPhotos, timerDuration, handleSnap]);

  const resetSession = useCallback(() => {
    setPhotos([]);
  }, []);

  return (
    <PhotoboothLayout
      leftContent={
        <>
          <FilterCard
            selectedTheme={selectedTheme}
            selectedLayout={selectedLayout}
            onSelectTheme={setSelectedTheme}
            onSelectLayout={setSelectedLayout}
          />
          <Gallery
            photos={photos}
            selectedLayout={selectedLayout}
            maxPhotos={maxPhotos}
            onReset={resetSession}
          />
        </>
      }
      rightContent={
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
        />
      }
    />
  );
}
