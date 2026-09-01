"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { pickOpenFold, pinFold } from "./foldScroll";

export function useFoldScroll(ids: readonly string[]) {
  const first = ids[0] ?? "";
  const [openId, setOpenId] = useState(first);
  const idsRef = useRef(ids);
  const skipPin = useRef(true);

  useEffect(() => {
    idsRef.current = ids;
  }, [ids]);

  useEffect(() => {
    let frame = 0;
    const syncFromScroll = () => {
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    const boot = requestAnimationFrame(onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(boot);
    };
  }, []);

  useLayoutEffect(() => {
    if (skipPin.current) {
      skipPin.current = false;
      return;
    }
    pinFold(openId);
  }, [openId]);

  function open(id: string) {
    setOpenId(id);
  }

  return { openId, open };
}
