import type { ReactNode } from "react";

export function Fold({
  id,
  title,
  open,
  expandLabel,
  collapseLabel,
  accent = false,
  onOpen,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  expandLabel: string;
  collapseLabel: string;
  accent?: boolean;
  onOpen: (id: string) => void;
  children: ReactNode;
}) {
  const panelId = `${id}-panel`;
  return (
    <section id={id} className={open ? "fold open" : "fold"} data-fold={id}>
      <h2 className="fold-heading" id={`${id}-label`}>
        <button
          type="button"
          className={accent ? "fold-head accent" : "fold-head"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onOpen(id)}
        >
          <span className="fold-title">{title}</span>
          <span className="fold-state">{open ? collapseLabel : expandLabel}</span>
        </button>
      </h2>
      <div
        className="fold-panel"
        id={panelId}
        role="region"
        aria-labelledby={`${id}-label`}
        hidden={!open}
      >
        <div className="fold-panel-inner">{children}</div>
      </div>
    </section>
  );
}
