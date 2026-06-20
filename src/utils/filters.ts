export function getThemeFilter(theme: string): string {
  switch (theme) {
    case "NORMAL":
      return "";
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
}

export function getCanvasFilter(theme: string): string {
  switch (theme) {
    case "NORMAL":
      return "none";
    case "VINTAGE":
      return "sepia(0.6) contrast(1.25) brightness(0.9)";
    case "ALL BLACK":
      return "grayscale(1) contrast(1.5)";
    case "K-POP":
      return "saturate(1.5) brightness(1.1) contrast(1.05)";
    case "Y2K":
      return "hue-rotate(15deg) saturate(2) contrast(1.25)";
    case "OLD MONEY":
      return "contrast(1.15) brightness(0.95) sepia(0.15) saturate(0.75)";
    case "CORPORATE":
      return "contrast(1) brightness(1)";
    default:
      return "none";
  }
}

export function getLayoutLimit(layout: string): number {
  if (layout === "2 SHOTS") return 2;
  if (layout === "4 STRIP") return 4;
  if (layout === "6 GRID") return 6;
  return 4;
}
