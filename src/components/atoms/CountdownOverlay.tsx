interface CountdownOverlayProps {
  countdown: number;
}

export default function CountdownOverlay({ countdown }: CountdownOverlayProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <span className="text-8xl font-black text-yellow-300 drop-shadow-[4px_4px_0px_#000] animate-ping">
        {countdown}
      </span>
    </div>
  );
}
