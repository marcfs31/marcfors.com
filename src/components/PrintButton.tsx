"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="cta" onClick={() => window.print()}>
      {label}
    </button>
  );
}
