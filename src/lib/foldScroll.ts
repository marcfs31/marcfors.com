export const FOLD_LINE_PX = 88;

export function pickOpenFold(ids: readonly string[], linePx = FOLD_LINE_PX): string {
  let current = ids[0] ?? "";
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= linePx + 8) current = id;
  }
  return current;
}

export function pinFold(id: string, linePx = FOLD_LINE_PX) {
  const el = document.getElementById(id);
  if (!el) return;
  const delta = el.getBoundingClientRect().top - linePx;
  if (Math.abs(delta) > 2) window.scrollBy(0, delta);
}
