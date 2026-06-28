import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

let handLandMarkerInstance: HandLandmarker | null = null;

export async function initHandLandMarker(): Promise<HandLandmarker> {
  if (handLandMarkerInstance) return handLandMarkerInstance;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  handLandMarkerInstance = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 2,
  });

  return handLandMarkerInstance;
}
