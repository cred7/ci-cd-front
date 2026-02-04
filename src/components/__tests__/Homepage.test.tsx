import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import Homepage from "../Homepage";

beforeEach(() => {
  const items = [
    {
      title: "Test Course",
      startTime: "01/01/2026",
      staff: 1,
      photo: [{ href: "https://example.com/p.jpg" }],
      Author: "Tester",
      description: "desc",
    },
  ];

  // mock fetch
  (globalThis as any).fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ items }) }),
  );

  // mock getUserMedia
  const mockStream = {
    getTracks: () => [
      {
        stop: vi.fn(),
      },
    ],
  } as unknown as MediaStream;

  Object.defineProperty(globalThis.navigator, "mediaDevices", {
    value: { getUserMedia: vi.fn(() => Promise.resolve(mockStream)) },
    configurable: true,
  });

  // mock play
  HTMLMediaElement.prototype.play = vi.fn();

  // mock canvas
  const realGetElementById = document.getElementById;
  document.getElementById = vi.fn((id) => {
    if (id === "canvas") {
      return {
        getContext: vi.fn(() => ({
          drawImage: vi.fn(),
        })),
        toDataURL: vi.fn(() => "data:image/png;base64,iVBORw0KGgo="),
      } as any;
    }
    return realGetElementById.call(document, id);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("fetches items and captures photo", async () => {
  render(<Homepage />);

  await waitFor(
    () => {
      expect(screen.getByText("Test Course")).toBeInTheDocument();
    },
    { timeout: 3000 },
  );

  const captureBtn = screen.getByText("Capture Photo");
  await userEvent.click(captureBtn);

  // video element should be added
  const video = document.getElementById("home");
  expect(video).toBeTruthy();

  const takeBtn = screen.getByText("Take photo");
  await userEvent.click(takeBtn);

  const img = await screen.findByAltText("Captured");
  expect(img.getAttribute("src")).toMatch(/^data:image\/png/);
});
