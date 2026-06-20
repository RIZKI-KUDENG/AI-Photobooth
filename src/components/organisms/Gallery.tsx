import ResetButton from "../atoms/ResetButton";
import { getLayout } from "../../layouts/registry";
import { downloadLayout } from "../../utils/download";

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
  const layout = getLayout(selectedLayout);
  const GalleryPreview = layout?.GalleryPreview;

  const handleSave = () => {
    downloadLayout(photos, selectedLayout);
  };

  return (
    <div className="mt-5 border-4 border-black bg-pink-300 p-4 md:p-6 shadow-[8px_8px_0px_0px_#000]">
      <div className="mb-3 md:mb-4 flex items-center justify-between gap-2">
        <h2 className="text-xl md:text-3xl font-black uppercase">
          Gallery ({photos.length}/{maxPhotos})
        </h2>
        {photos.length > 0 && <ResetButton onClick={onReset} />}
      </div>

      {photos.length === 0 ? (
        <div className="border-4 border-dashed border-black bg-white p-8 md:p-12 text-center font-black uppercase text-gray-500 text-sm md:text-lg">
          No photos captured yet. Strike a pose!
        </div>
      ) : (
        <div className="space-y-4">
          {GalleryPreview ? (
            <GalleryPreview photos={photos} />
          ) : (
            <div className="text-center text-red-500 font-black">
              Unknown layout: {selectedLayout}
            </div>
          )}
          <button
            onClick={handleSave}
            className="w-full border-4 border-black bg-yellow-300 py-2.5 md:py-3 text-sm md:text-lg font-black uppercase transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_#000] cursor-pointer"
          >
            💾 Save Photobooth
          </button>
        </div>
      )}
    </div>
  );
}
