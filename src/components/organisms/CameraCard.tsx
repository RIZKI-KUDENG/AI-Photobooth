import { type RefObject } from "react";
import Webcam from "react-webcam";
import LiveIndicator from "../atoms/LiveIndicator";
import LayoutBadge from "../atoms/LayoutBadge";
import SnapButton from "../atoms/SnapButton";
import CountdownOverlay from "../atoms/CountdownOverlay";
import TimerSelector from "../molecules/TimerSelector";

interface CameraCardProps {
  webcamRef: RefObject<Webcam | null>;
  selectedTheme: string;
  selectedLayout: string;
  countdown: number | null;
  isCapturing: boolean;
  timerDuration: number;
  slotsFull: boolean;
  onSnap: () => void;
  onSelectDuration: (duration: number) => void;
  getThemeFilter: (theme: string) => string;
  cropBoxProps: {
    top: string;
    left: string;
    width: string;
    height: string;
  } | null; // Terima properti prop baru
}

export default function CameraCard({
  webcamRef,
  selectedTheme,
  selectedLayout,
  countdown,
  isCapturing,
  timerDuration,
  slotsFull,
  onSnap,
  onSelectDuration,
  getThemeFilter,
  cropBoxProps, // Destrukturisasi di sini
}: CameraCardProps) {
  return (
    <div className="border-4 border-black bg-white p-5 md:p-6 shadow-[12px_12px_0px_0px_#000]">
      <div className="mb-4 flex items-center justify-between">
        <LiveIndicator />
        <LayoutBadge selectedLayout={selectedLayout} />
      </div>

      <div className="relative overflow-hidden border-4 border-black bg-black aspect-4/3">
        {countdown !== null && <CountdownOverlay countdown={countdown} />}

        {cropBoxProps && (
          <div
            className="absolute border-4 border-dashed border-cyan-400 z-10 animate-pulse pointer-events-none transition-all duration-75"
            style={{
              top: cropBoxProps.top,
              left: cropBoxProps.left,
              width: cropBoxProps.width,
              height: cropBoxProps.height,
            }}
          >
            <div className="absolute -top-7 left-0 bg-cyan-400 text-black text-[10px] font-black px-1.5 py-0.5 uppercase border border-black shadow-[2px_2px_0px_0px_#000]">
              Gesture Framing Mode
            </div>
          </div>
        )}

        <div className="w-full h-full [&_video]:scale-x-[-1]">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1920,
              height: 1080,
              facingMode: "user",
            }}
            className={`w-full h-full object-cover ${getThemeFilter(selectedTheme)}`}
          />
        </div>
      </div>

      <div className="mt-5">
        <TimerSelector
          selectedDuration={timerDuration}
          onSelect={onSelectDuration}
        />
      </div>

      <div className="mt-4">
        <SnapButton
          onClick={onSnap}
          disabled={isCapturing || slotsFull}
          isCapturing={isCapturing}
          slotsFull={slotsFull}
        />
      </div>
    </div>
  );
}
