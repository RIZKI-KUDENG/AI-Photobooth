import Webcam from "react-webcam";
import Header from "./components/fragments/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F1E7] p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Header />

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="border-4 border-black bg-cyan-300 p-6 shadow-[8px_8px_0px_0px_#000]">
              <h2 className="mb-4 text-3xl font-black uppercase">
                Choose Theme
              </h2>

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
                    className="border-4 border-black bg-white px-4 py-5 text-left text-lg font-black transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000]"
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-4 border-black bg-pink-300 p-6 shadow-[8px_8px_0px_0px_#000]">
              <h2 className="mb-4 text-3xl font-black uppercase">
                Choose Layout
              </h2>

              <div className="flex flex-wrap gap-4">
                {["2 SHOTS", "4 STRIP", "6 GRID", "FREE"].map((layout) => (
                  <button
                    key={layout}
                    className="border-4 border-black bg-white px-6 py-4 font-black hover:shadow-[4px_4px_0px_0px_#000]"
                  >
                    {layout}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Camera Card */}
          <div className="border-4 border-black bg-white p-5 shadow-[10px_10px_0px_0px_#000]">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-none border-4 border-black bg-red-400 px-3 py-1 font-black">
                LIVE
              </span>

              <span className="font-black">CAM 01</span>
            </div>

            <div className="overflow-hidden border-4 border-black">
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>

            <button className="mt-5 w-full border-4 border-black bg-lime-300 py-4 text-xl font-black uppercase transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_#000]">
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
