import type { Page } from "@playwright/test";

/**
 * Node positions in the Wordkeep Atlas come from a deterministic physics
 * settle (no randomness), but the exact pixels are an implementation detail
 * of the layout, not something a test should hard-code. This runs a fine
 * synthetic pointer sweep inside the page — fast, since it never leaves the
 * browser — to find one point that actually lands on a node, then clears the
 * selection it made so the caller starts from a clean state and can drive
 * the real interaction (a real click or a real touch tap) itself.
 */
export async function findAtlasNodePoint(
  page: Page,
  box: { x: number; y: number; width: number; height: number },
): Promise<{ gx: number; gy: number } | null> {
  return page.evaluate(
    ({ w, h }) => {
      const canvas = document.querySelector(".atlas-canvas");
      const readout = document.querySelector(".atlas-readout");
      if (!canvas || !readout) return null;
      const rect = canvas.getBoundingClientRect();
      const fire = (type: string, cx: number, cy: number) => {
        canvas.dispatchEvent(
          new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            clientX: rect.left + cx,
            clientY: rect.top + cy,
            pointerId: 9999,
            pointerType: "mouse",
            isPrimary: true,
            button: 0,
            buttons: type === "pointerup" ? 0 : 1,
          }),
        );
      };
      for (let gy = 0.04; gy <= 0.98; gy += 0.025) {
        for (let gx = 0.02; gx <= 0.98; gx += 0.025) {
          const cx = w * gx;
          const cy = h * gy;
          fire("pointerdown", cx, cy);
          fire("pointerup", cx, cy);
          if (readout.classList.contains("on")) {
            fire("pointerdown", 1, 1); // click empty space: clear the selection this made
            fire("pointerup", 1, 1);
            return { gx, gy };
          }
        }
      }
      return null;
    },
    { w: box.width, h: box.height },
  );
}
