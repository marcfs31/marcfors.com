import { splitEmphasis } from "@/lib/emphasize";

export function Emphasize({ text, phrases }: { text: string; phrases: readonly string[] }) {
  return (
    <>
      {splitEmphasis(text, phrases).map((piece, index) =>
        piece.hit ? (
          <strong className="hit" key={`${piece.text}-${index}`}>
            {piece.text}
          </strong>
        ) : (
          <span key={`${piece.text}-${index}`}>{piece.text}</span>
        ),
      )}
    </>
  );
}
