export interface LayoutDefinition {
  id: string;
  name: string;
  badge?: "NEW LAYOUT" | "TRY IT NOW";
  size: string;
  poses: number;
  previewImages: string[];
  MiniPreview: React.FC;
  GalleryPreview: React.FC<{ photos: string[] }>;
  downloadLayout?: (
    ctx: CanvasRenderingContext2D,
    images: HTMLImageElement[],
    canvas: HTMLCanvasElement,
  ) => void;
}
