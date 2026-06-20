import Webcam from "react-webcam";
import Header from "./components/fragments/Header";
import LayoutSelector from "./components/fragments/LayoutSelector";

import { useRef, useState, useEffect } from "react";

export default function App() {
  const webcamRef = useRef<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>("ALL BLACK");
  const [selectedLayout, setSelectedLayout] = useState<string>("dog-filter");

  // State untuk kontrol countdown
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  // Mapping tema
  const getThemeFilter = (theme: string) => {
    switch (theme) {
      case "VINTAGE":
        return "sepia contrast-125 brightness-90";
      case "ALL BLACK":
        return "grayscale contrast-150";
      case "K-POP":
        return "saturate-150 brightness-110 contrast-105";
      case "Y2K":
        return "hue-rotate-15 saturate-200 contrast-125";
      case "OLD MONEY":
        return "contrast-115 brightness-95 sepia-[0.15] saturate-75";
      case "CORPORATE":
        return "contrast-100 brightness-100";
      default:
        return "";
    }
  };

  // Mapping jumlah maksimal foto berdasarkan pilihan layout
  const getLayoutLimit = (layout: string) => {
    if (layout === "2 SHOTS") return 2;
    if (layout === "4 STRIP") return 4;
    if (layout === "6 GRID") return 6;
    return 12;
  };

  const maxPhotos = getLayoutLimit(selectedLayout);

  // Logika hitung mundur (Countdown)
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      executeSnap();
      setCountdown(null);
      setIsCapturing(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const startCountdown = () => {
    if (photos.length >= maxPhotos) {
      alert(
        "Slot foto sudah penuh! Reset atau ganti layout untuk mengambil foto baru.",
      );
      return;
    }
    setIsCapturing(true);
    setCountdown(3);
  };

  // Fungsi eksekusi
  const executeSnap = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotos((prev: string[]) => [...prev, imageSrc]);
      }
    }
  };

  // Fungsi reset session
  const resetPhotobooth = () => {
    setPhotos([]);
  };

  return (
    <div className="min-h-screen bg-[#F8F1E7] p-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Content (Controls & Results) */}
          <div className="space-y-6">
            {/* Theme Selector */}
            <div className="border-4 border-black bg-cyan-300 p-6 shadow-[8px_8px_0px_0px_#000]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-3xl font-black uppercase">Choose Filter</h2>
                <span className="border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase">
                  Active: {selectedTheme}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "ALL BLACK",
                  "OLD MONEY",
                  "K-POP",
                  "Y2K",
                  "VINTAGE",
                  "CORPORATE",
                ].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    className={`border-4 border-black px-4 py-3 text-left text-base font-black transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] ${
                      selectedTheme === theme
                        ? "bg-yellow-300 shadow-[4px_4px_0px_0px_#000]"
                        : "bg-white"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Selector */}
            <LayoutSelector
              selectedLayout={selectedLayout}
              onSelectLayout={setSelectedLayout}
            />

            {/* Photos Display */}
            <div className="mt-5 border-4 border-black bg-pink-300 p-6 shadow-[8px_8px_0px_0px_#000]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-3xl font-black uppercase">
                  Gallery ({photos.length}/{maxPhotos})
                </h2>
                {photos.length > 0 && (
                  <button
                    onClick={resetPhotobooth}
                    className="border-2 border-black bg-red-400 px-3 py-1 text-sm font-black uppercase shadow-[2px_2px_0px_0px_#000] hover:bg-red-500"
                  >
                    Reset Session
                  </button>
                )}
              </div>

              {photos.length === 0 ? (
                <div className="border-4 border-dashed border-black bg-white p-12 text-center font-black uppercase text-gray-500 text-lg">
                  No photos captured yet. Strike a pose!
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000]"
                    >
                      <div className="overflow-hidden border-2 border-black aspect-3/4 bg-gray-100">
                        <img
                          src={photo}
                          alt={`Captured frame ${index + 1}`}
                          className={`w-full h-full object-cover ${getThemeFilter(selectedTheme)}`}
                        />
                      </div>
                      <div className="mt-2 text-center text-xs font-black uppercase">
                        SHR-0{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Content (Camera View Card) */}
          <div className="border-4 border-black bg-white p-5 shadow-[10px_10px_0px_0px_#000] h-fit sticky top-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-none border-4 border-black bg-red-400 px-3 py-1 font-black animate-pulse">
                LIVE
              </span>
              <span className="font-black text-sm uppercase bg-gray-200 px-2 py-1 border-2 border-black">
                {selectedLayout} MODE
              </span>
            </div>

            {/* Container Kamera & Overlay Countdown */}
            <div className="relative overflow-hidden border-4 border-black bg-black aspect-3/4">
              {countdown !== null && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                  <span className="text-8xl font-black text-yellow-300 drop-shadow-[4px_4px_0px_#000] animate-ping">
                    {countdown}
                  </span>
                </div>
              )}

              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              disabled={isCapturing || photos.length >= maxPhotos}
              className={`mt-5 w-full border-4 border-black py-4 text-xl font-black uppercase transition shadow-[6px_6px_0px_0px_#000] ${
                isCapturing || photos.length >= maxPhotos
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-x-1 translate-y-1"
                  : "bg-lime-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              }`}
              onClick={startCountdown}
            >
              {isCapturing
                ? "Get Ready..."
                : photos.length >= maxPhotos
                  ? "Slots Full"
                  : "Snap Photo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
