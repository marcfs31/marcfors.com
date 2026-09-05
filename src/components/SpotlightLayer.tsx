"use client";

import { useMemo, type ReactNode } from "react";
import { createSpotlightMove } from "@/lib/spotlight";

/**
 * The desk shell. Everything visual inside is server-rendered and passed as
 * `children`; this island exists only to track the pointer and write the two
 * spotlight custom properties (`--spot-x` / `--spot-y`) on `.desk`. The write is
 * coalesced to one per frame and skipped under `prefers-reduced-motion`
 * (`createSpotlightMove`); `.spot` itself is hidden by that media query in CSS.
 */
export function SpotlightLayer({ children }: { children: ReactNode }) {
  const onPointerMove = useMemo(() => createSpotlightMove(), []);
  return (
    <div className="desk" onPointerMove={onPointerMove}>
      <div className="grid" />
      <div className="spot" />
      {children}
    </div>
  );
}
