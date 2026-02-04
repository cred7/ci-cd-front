// Setup file for Vitest + Testing Library
import "@testing-library/jest-dom";

// Polyfill minimal HTMLMediaElement for jsdom environment used by Vitest
if (typeof (globalThis as any).HTMLMediaElement === "undefined") {
  (globalThis as any).HTMLMediaElement = class {
    srcObject: any;
    play() {
      return Promise.resolve();
    }
    pause() {}
  } as any;
}

// Ensure canvas.toDataURL exists (jsdom may not implement drawing)
if (
  typeof HTMLCanvasElement !== "undefined" &&
  !HTMLCanvasElement.prototype.toDataURL
) {
  // @ts-ignore
  HTMLCanvasElement.prototype.toDataURL = function () {
    return "data:image/png;base64,";
  };
}
