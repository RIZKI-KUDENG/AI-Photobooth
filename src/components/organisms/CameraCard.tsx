import { type RefObject } from "react";
import Webcam from "react-webcam";
import LiveIndicator from "../atoms/LiveIndicator";
import LayoutBadge from "../atoms/LayoutBadge";
import SnapButton from "../atoms/SnapButton";
import CountdownOverlay from "../atoms/CountdownOverlay";
import { useState } from "react";

interface CameraCardProps {
  webcamRef: RefObject<Webcam | null>;
  selectedTheme: string;
  selectedLayout: string;
  countdown: number | null;
  isCapturing: boolean;
  slotsFull: boolean;
  onSnap: () => void;
  getThemeFilter: (theme: string) => string;
}

export default function CameraCard({
  webcamRef,
  selectedTheme,
  selectedLayout,
  countdown,
  isCapturing,
  slotsFull,
  onSnap,
  getThemeFilter,
}: CameraCardProps) {
  const [overlayAvailable, setOverlayAvailable] = useState<boolean | null>(null);

  return (
    <div className="border-4 border-black bg-white p-5 shadow-[10px_10px_0px_0px_#000] h-fit sticky top-8">
      <div className="mb-4 flex items-center justify-between">
        <LiveIndicator />
        <LayoutBadge selectedLayout={selectedLayout} />
      </div>

      <div className="relative overflow-hidden border-4 border-black bg-black aspect-3/4">
        {countdown !== null && <CountdownOverlay countdown={countdown} />}

        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className={`w-full h-full object-cover ${getThemeFilter(selectedTheme)}`}
        />

        <img
          key={selectedLayout}
          src={`/overlays/${selectedLayout}.png`}
          alt={`${selectedLayout} overlay`}
          onLoad={() => setOverlayAvailable(true)}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.dataset.tried) {
              img.dataset.tried = "svg";
              img.src = `/overlays/${selectedLayout}.svg`;
              return;
            }
            setOverlayAvailable(false);
            img.style.display = "none";
          }}
          className="absolute inset-0 z-20 w-full h-full object-cover pointer-events-none"
        />

        {overlayAvailable === false && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="bg-black/40 border-2 border-white/40 text-white text-xs p-2 rounded pointer-events-none">
              {`Overlay tidak ditemukan: /overlays/${selectedLayout}.{png,svg}`}
            </div>
          </div>
        )}
      </div>

      <SnapButton
        onClick={onSnap}
        disabled={isCapturing || slotsFull}
        isCapturing={isCapturing}
        slotsFull={slotsFull}
      />
    </div>
  );
}
