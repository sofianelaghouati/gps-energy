type BrandLogoProps = {
  className?: string;
  title?: string;
  variant?: "compact" | "full";
  framed?: boolean;
};

function GearPumpjackMark() {
  const teeth = [
    { x: -12, y: -114, width: 24, height: 34, rotate: 0 },
    { x: -12, y: -114, width: 24, height: 34, rotate: -42 },
    { x: -12, y: -114, width: 24, height: 34, rotate: 42 },
    { x: -12, y: -114, width: 24, height: 34, rotate: -82 },
    { x: -12, y: -114, width: 24, height: 34, rotate: 82 },
    { x: -13, y: -111, width: 26, height: 38, rotate: -124 },
    { x: -13, y: -111, width: 26, height: 38, rotate: 124 },
  ];

  return (
    <g>
      <g fill="#ffffff">
        {teeth.map((tooth) => (
          <rect
            height={tooth.height}
            key={tooth.rotate}
            rx="3"
            transform={`rotate(${tooth.rotate})`}
            width={tooth.width}
            x={tooth.x}
            y={tooth.y}
          />
        ))}
        <path d="M-115 31a115 115 0 0 1 230 0H73a73 73 0 0 0-146 0z" />
        <rect height="44" rx="5" width="44" x="-136" y="5" />
        <rect height="44" rx="5" width="44" x="92" y="5" />
      </g>

      <g
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-55-9 52 47" strokeWidth="13" />
        <path d="M46 47h40" strokeWidth="10" />
        <path d="M-75-13c11-21 29-27 45-16" strokeWidth="14" />
        <circle cx="-56" cy="-9" fill="#ffffff" r="8" stroke="none" />
        <path d="M-37 99 0 30l38 69" strokeWidth="8" />
        <path d="M-20 68h40M-10 48l20 51M10 48l-20 51" strokeWidth="6" />
      </g>
    </g>
  );
}

export function BrandLogo({
  className = "",
  framed = false,
  title = "GPS Energy",
  variant = "compact",
}: BrandLogoProps) {
  const isFull = variant === "full";
  const viewBox = framed ? "0 0 746 402" : "130 0 486 358";

  return (
    <svg
      aria-label={title}
      className={className}
      data-brand-ui="true"
      role="img"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {framed ? <rect fill="#557da5" height="402" width="746" /> : null}
      <g transform={`translate(373 ${isFull ? 118 : 120}) scale(${isFull ? 0.88 : 0.9})`}>
        <GearPumpjackMark />
      </g>
      <text
        fill="#ffffff"
        fontFamily="var(--font-display)"
        fontSize={isFull ? "62" : "64"}
        fontWeight="700"
        letterSpacing="1.4"
        lengthAdjust="spacingAndGlyphs"
        textAnchor="middle"
        textLength={isFull ? "370" : "374"}
        x="373"
        y={isFull ? "273" : "275"}
      >
        GPS ENERGY
      </text>
      <line
        stroke="#a38356"
        strokeLinecap="round"
        strokeWidth="7"
        x1="160"
        x2="586"
        y1={isFull ? "334" : "333"}
        y2={isFull ? "334" : "333"}
      />
    </svg>
  );
}
