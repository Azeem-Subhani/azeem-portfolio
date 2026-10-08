import { Fragment, type CSSProperties } from "react";

// Same word split as the service and why-me heroes, so the shared entrance CSS
// can stagger via --i. Masked words rise inside their own clip (titles wrap, so
// a single line mask would cut the second line). Ledes fade without a mask.

export function RisingWords({ text, mask = false }: { text: string; mask?: boolean }) {
  const words = text.split(" ");
  return words.map((word, index) => {
    const piece = (
      <span className="service-hero-word" style={{ "--i": index } as CSSProperties}>
        {word}
      </span>
    );
    return (
      <Fragment key={`${index}-${word}`}>
        {mask ? <span className="blog-word-mask">{piece}</span> : piece}
        {index < words.length - 1 ? " " : null}
      </Fragment>
    );
  });
}
