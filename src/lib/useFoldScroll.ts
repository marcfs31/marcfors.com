"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { pickOpenFold, pinFold } from "./foldScroll";

/** After a programmatic pin scroll, ignore scroll-driven fold changes for this long (ms). */
export const PIN_QUIET_MS = 200;

export function useFoldScroll(ids: readonly string[]) {
  const first = ids[0] ?? "";
  const [openId, setOpenId] = useState(first);
  const idsRef = useRef(ids);
  const skipPin = useRef(true);
  // Timestamp until which scroll-sync is suppressed, so `pinFold`'s own `scrollBy`
  // does not bounce `openId` back to the fold we just navigated away from.
  const pinningUntil = useRef(0);

  useEffect(() => {
    idsRef.current = ids;
  }, [ids]);

  useEffect(() => {
    let frame = 0;
    const syncFromScroll = () => {
      if (performance.now() < pinningUntil.current) return;
      setOpenId((current) => {
        const next = pickOpenFold(idsRef.current);
        return next && next !== current ? next : current;
      });
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncFromScroll();
      });
    };
    const onHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && idsRef.current.includes(hash)) setOpenId(hash);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) return;
      const ids = idsRef.current;
      if (event.key === "j" || event.key === "ArrowDown") {
        event.preventDefault();
        setOpenId((current) => ids[Math.min(ids.length - 1, Math.max(0, ids.indexOf(current)) + 1)] ?? current);
      }
      if (event.key === "k" || event.key === "ArrowUp") {
        event.preventDefault();
        setOpenId((current) => ids[Math.max(0, ids.indexOf(current) - 1)] ?? current);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    const boot = requestAnimationFrame(onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(boot);
    };
  }, []);

  useLayoutEffect(() => {
    if (skipPin.current) {
      skipPin.current = false;
      return;
    }
    pinningUntil.current = performance.now() + PIN_QUIET_MS;
    pinFold(openId);
  }, [openId]);

  function open(id: string) {
    setOpenId(id);
  }

  return { openId, open };
}
