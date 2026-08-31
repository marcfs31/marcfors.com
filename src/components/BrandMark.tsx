export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="var(--ink)" />
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="var(--brass)" strokeWidth="1.6" />
      <path d="M16 4.5v4" stroke="var(--brass)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3.6" fill="var(--signal)" />
    </svg>
  );
}
