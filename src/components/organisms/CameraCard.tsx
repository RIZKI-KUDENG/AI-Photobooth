import { type RefObject } from "react";
import Webcam from "react-webcam";
import LiveIndicator from "../atoms/LiveIndicator";
import LayoutBadge from "../atoms/LayoutBadge";
import SnapButton from "../atoms/SnapButton";
import CountdownOverlay from "../atoms/CountdownOverlay";

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
  return (
    <div className="border-4 border-black bg-white p-4 md:p-5 shadow-[10px_10px_0px_0px_#000] h-fit md:sticky md:top-8">
      <div className="mb-4 flex items-center justify-between">
        <LiveIndicator />
        <LayoutBadge selectedLayout={selectedLayout} />
      </div>

      <div className="relative overflow-hidden border-4 border-black bg-black aspect-3/4">
        {countdown !== null && <CountdownOverlay countdown={countdown} />}

        <div className="w-full h-full [&_video]:scale-x-[-1]">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: "user" }}
            className={`w-full h-full object-cover ${getThemeFilter(selectedTheme)}`}
          />
        </div>
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
