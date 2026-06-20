import { useMemo } from "react";
import ResetButton from "../atoms/ResetButton";
import LayoutPreview from "../molecules/LayoutPreview";
import { downloadLayout } from "../../utils/download";

const LAYOUT_COMPONENTS: Record<string, string> = {
  "layout-b": "grid-2x2",
  "hearts-filter": "strip-vertical",
  "dog-filter": "strip-horizontal",
  "vintage-layout": "polaroid-stack",
  "solace-layout": "hero-grid",
};

const DEFAULT_LAYOUT = "grid-2x2";

interface GalleryProps {
  photos: string[];
  selectedLayout: string;
  maxPhotos: number;
  onReset: () => void;
}

export default function Gallery({
  photos,
  selectedLayout,
  maxPhotos,
  onReset,
}: GalleryProps) {
  const layoutType = useMemo(
    () => LAYOUT_COMPONENTS[selectedLayout] ?? DEFAULT_LAYOUT,
    [selectedLayout],
  );

  const handleSave = () => {
    downloadLayout(photos, selectedLayout);
  };

  return (
    <div className="mt-5 border-4 border-black bg-pink-300 p-6 shadow-[8px_8px_0px_0px_#000]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-black uppercase">
          Gallery ({photos.length}/{maxPhotos})
        </h2>
        {photos.length > 0 && <ResetButton onClick={onReset} />}
      </div>

      {photos.length === 0 ? (
        <div className="border-4 border-dashed border-black bg-white p-12 text-center font-black uppercase text-gray-500 text-lg">
          No photos captured yet. Strike a pose!
        </div>
      ) : (
        <div className="space-y-4">
          <LayoutPreview
            photos={photos}
            layoutType={layoutType}
            selectedLayout={selectedLayout}
          />
          <button
            onClick={handleSave}
            className="w-full border-4 border-black bg-yellow-300 py-3 text-lg font-black uppercase transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_#000] cursor-pointer"
          >
            💾 Save Photobooth
          </button>
        </div>
      )}
    </div>
  );
}
