import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── InkBlot ──────────────────────────────────────────────────────────────────
export function InkBlot({
  style,
  className,
  variant = 1,
}: {
  style?: React.CSSProperties;
  className?: string;
  variant?: 1 | 2 | 3;
}) {
  const paths = [
    "M40 20 C52 8 70 10 75 24 C82 38 72 54 58 58 C44 64 22 56 16 42 C8 28 26 34 40 20Z",
    "M30 18 C44 6 68 14 72 28 C78 44 64 60 48 62 C34 64 14 52 12 36 C8 22 16 30 30 18Z",
    "M50 14 C64 6 80 18 78 34 C76 50 58 62 42 58 C28 54 16 40 20 26 C24 14 36 22 50 14Z",
  ];
  return (
    <svg
      width="90"
      height="80"
      viewBox="0 0 90 80"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      className={className}
    >
      <path
        d={paths[variant - 1]}
        fill="rgba(61,43,43,0.08)"
        style={{ animation: "ink-pulse 6s ease-in-out infinite" }}
      />
    </svg>
  );
}

// ─── WatercolorWash ───────────────────────────────────────────────────────────
export function WatercolorWash({
  color = "rgba(242,196,206,0.25)",
  style,
}: {
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "260px",
        height: "160px",
        background: color,
        filter: "blur(44px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
}

// ─── HandwrittenAnnotation ────────────────────────────────────────────────────
export function HandwrittenAnnotation({
  text,
  style,
  rotate = -3,
}: {
  text: string;
  style?: React.CSSProperties;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        fontFamily: "'JheriCurls', cursive",
        fontSize: "11px",
        color: "rgba(61,43,43,0.4)",
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none",
        zIndex: 1,
        whiteSpace: "nowrap",
        lineHeight: 1.4,
        ...style,
      }}
    >
      {text}
    </div>
  );
}

// ─── TornPaperScrap ───────────────────────────────────────────────────────────
export function TornPaperScrap({
  style,
  color = "rgba(255,248,240,0.72)",
  variant = 1,
}: {
  style?: React.CSSProperties;
  color?: string;
  variant?: 1 | 2 | 3;
}) {
  const shapes = [
    "10,4 120,0 128,68 4,72 0,40",
    "0,6 108,0 116,52 8,58 2,28",
    "6,0 90,4 96,60 2,64 0,32",
  ];
  return (
    <svg
      width="130"
      height="75"
      viewBox="0 0 130 75"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <polygon points={shapes[variant - 1]} fill={color} />
      {/* Torn top edge */}
      <polyline
        points="10,4 25,8 40,2 55,10 70,3 85,9 100,1 120,0"
        fill="none"
        stroke="rgba(61,43,43,0.06)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

// ─── LibraryCard ──────────────────────────────────────────────────────────────
export function LibraryCard({ style }: { style?: React.CSSProperties }) {
  const [showStamp, setShowStamp] = useState(false);
  const handleStamp = () => {
    setShowStamp(true);
    setTimeout(() => setShowStamp(false), 2800);
  };
  return (
    <div
      style={{
        position: "absolute",
        width: "120px",
        height: "160px",
        background: "#FFFBF3",
        border: "1px solid rgba(180,155,120,0.4)",
        borderRadius: "2px",
        boxShadow: "2px 3px 12px rgba(61,43,43,0.14)",
        padding: "6px",
        zIndex: 2,
        overflow: "hidden",
        fontFamily: "'Courier New', monospace",
        ...style,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: "rgba(157,184,157,0.35)",
          padding: "3px 5px",
          marginBottom: "5px",
          fontSize: "7px",
          letterSpacing: "0.12em",
          color: "#5a4040",
        }}
      >
        LIBRARY CARD
      </div>
      <div
        style={{
          fontSize: "6.5px",
          color: "rgba(61,43,43,0.55)",
          marginBottom: "2px",
        }}
      >
        TITLE:
      </div>
      <div
        style={{
          fontSize: "7px",
          color: "#3D2B2B",
          marginBottom: "4px",
          fontFamily: "'JheriCurls', cursive",
        }}
      >
        Ordinary Things
      </div>
      <div
        style={{
          fontSize: "6.5px",
          color: "rgba(61,43,43,0.55)",
          marginBottom: "2px",
        }}
      >
        AUTHOR:
      </div>
      <div
        style={{
          fontSize: "7px",
          color: "#3D2B2B",
          marginBottom: "6px",
          fontFamily: "'JheriCurls', cursive",
        }}
      >
        S. Agrawal
      </div>
      {/* Ruled lines */}
      {["date-due", "line-1", "line-2", "line-3"].map((k) => (
        <div
          key={k}
          style={{
            fontSize: "6px",
            color: "rgba(61,43,43,0.3)",
            borderBottom: "1px solid rgba(157,184,157,0.25)",
            paddingBottom: "3px",
            marginBottom: "3px",
            letterSpacing: "0.08em",
          }}
        >
          {k === "date-due" ? "DATE DUE" : "__________"}
        </div>
      ))}
      {/* Stamp button */}
      <AnimatePresence>
        {showStamp && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <div
              style={{
                fontSize: "8px",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.18em",
                color: "rgba(212,132,154,0.85)",
                border: "2px solid rgba(212,132,154,0.7)",
                padding: "4px 8px",
                borderRadius: "3px",
                transform: "rotate(-12deg)",
                whiteSpace: "nowrap",
              }}
            >
              CHECKED OUT ✦
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={handleStamp}
        style={{
          position: "absolute",
          bottom: "5px",
          right: "5px",
          background: "rgba(157,184,157,0.4)",
          border: "1px solid rgba(157,184,157,0.6)",
          borderRadius: "2px",
          padding: "2px 5px",
          fontSize: "6px",
          color: "#3D2B2B",
          cursor: "pointer",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.1em",
        }}
      >
        STAMP
      </button>
    </div>
  );
}

// ─── TicketStub ───────────────────────────────────────────────────────────────
export function TicketStub({
  label = "ADMIT ONE",
  style,
}: {
  label?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "78px",
        background: "rgba(245,236,216,0.9)",
        border: "1px solid rgba(180,155,120,0.35)",
        borderRadius: "3px",
        borderLeft: "3px dashed rgba(180,155,120,0.5)",
        padding: "4px 6px",
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "7px",
          letterSpacing: "0.14em",
          color: "rgba(61,43,43,0.55)",
          marginBottom: "3px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "7px",
          color: "rgba(61,43,43,0.35)",
          marginBottom: "3px",
        }}
      >
        No. 00247
      </div>
      <div
        style={{
          fontSize: "10px",
          color: "rgba(61,43,43,0.3)",
          textAlign: "right",
        }}
      >
        ✦
      </div>
    </div>
  );
}

// ─── BotanicalSketch ─────────────────────────────────────────────────────────
export function BotanicalSketch({
  style,
  size = 80,
}: {
  style?: React.CSSProperties;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity: 0.32,
        ...style,
      }}
    >
      {/* Stem */}
      <path
        d="M40 72 Q42 50 38 30 Q36 14 40 8"
        stroke="#5a4040"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left leaf */}
      <path
        d="M38 36 Q22 28 18 18 Q26 24 38 36Z"
        stroke="#5a4040"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right leaf */}
      <path
        d="M40 46 Q58 36 62 26 Q52 34 40 46Z"
        stroke="#5a4040"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bud */}
      <path
        d="M38 10 Q40 4 42 10 Q44 16 40 18 Q36 16 38 10Z"
        stroke="#5a4040"
        strokeWidth="1.1"
        fill="none"
      />
      {/* Vein */}
      <path
        d="M38 36 Q28 30 22 20"
        stroke="#5a4040"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

// ─── AntiquePaperFrame ────────────────────────────────────────────────────────
export function AntiquePaperFrame({
  style,
  size = 32,
}: {
  style?: React.CSSProperties;
  size?: number;
}) {
  // Renders 4 corner ornaments absolutely positioned within parent
  const corner = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 16 L2 4 Q2 2 4 2 L16 2"
        stroke="rgba(61,43,43,0.28)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 4 Q6 4 6 8"
        stroke="rgba(61,43,43,0.18)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="4" cy="4" r="1.5" fill="rgba(201,168,76,0.45)" />
      <path d="M6 2 L10 2" stroke="rgba(201,168,76,0.35)" strokeWidth="0.8" />
      <path d="M2 6 L2 10" stroke="rgba(201,168,76,0.35)" strokeWidth="0.8" />
    </svg>
  );
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
    >
      {/* Top-left */}
      <div style={{ position: "absolute", top: 4, left: 4 }}>{corner}</div>
      {/* Top-right */}
      <div
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          transform: "scaleX(-1)",
        }}
      >
        {corner}
      </div>
      {/* Bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: 4,
          transform: "scaleY(-1)",
        }}
      >
        {corner}
      </div>
      {/* Bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          right: 4,
          transform: "scale(-1)",
        }}
      >
        {corner}
      </div>
    </div>
  );
}

// ─── FoldedFlap ───────────────────────────────────────────────────────────────
export function FoldedFlap({
  hiddenText,
  style,
}: {
  hiddenText: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 8,
        ...style,
      }}
    >
      {/* Triangle flap */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 0 36px 36px",
            borderColor:
              "transparent transparent rgba(242,196,206,0.9) transparent",
            background: "none",
            cursor: "pointer",
            padding: 0,
            border: "none",
            display: "block",
            filter: "drop-shadow(1px 1px 3px rgba(61,43,43,0.15))",
          }}
          aria-label="Unfold paper flap"
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              background: "rgba(255,248,240,0.97)",
              border: "1px solid rgba(235,190,200,0.6)",
              borderRadius: "3px",
              padding: "6px 10px",
              maxWidth: "160px",
              boxShadow: "2px 3px 10px rgba(61,43,43,0.12)",
            }}
          >
            <div
              style={{
                fontFamily: "'JheriCurls', cursive",
                fontSize: "10px",
                color: "#3D2B2B",
                lineHeight: 1.5,
              }}
            >
              {hiddenText}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                marginTop: "4px",
                fontSize: "8px",
                color: "rgba(61,43,43,0.4)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.06em",
              }}
            >
              fold ↩
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MagazineCutout ──────────────────────────────────────────────────────────
export function MagazineCutout({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        fontFamily: "'Hipnotik', sans-serif",
        fontSize: "clamp(24px, 5vw, 36px)",
        color: "rgba(61,43,43,0.06)",
        letterSpacing: "0.06em",
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
        textShadow: "1px 2px 0 rgba(61,43,43,0.04)",
        ...style,
      }}
    >
      {text}
    </div>
  );
}

// ─── ReceiptStrip ─────────────────────────────────────────────────────────────
export function ReceiptStrip({
  lines = ["receipt", "————", "01", "02"],
  style,
}: {
  lines?: string[];
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "58px",
        background: "rgba(255,251,240,0.9)",
        border: "1px solid rgba(180,155,120,0.2)",
        borderRadius: "2px",
        padding: "6px 4px",
        pointerEvents: "none",
        zIndex: 1,
        transform: "rotate(5deg)",
        ...style,
      }}
    >
      {/* Perforated top */}
      <div
        style={{
          borderTop: "2px dashed rgba(180,155,120,0.4)",
          marginBottom: "5px",
        }}
      />
      {lines.map((line) => (
        <div
          key={line}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "7px",
            color: "rgba(61,43,43,0.45)",
            letterSpacing: "0.06em",
            lineHeight: 1.7,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {line}
        </div>
      ))}
      {/* Perforated bottom */}
      <div
        style={{
          borderBottom: "2px dashed rgba(180,155,120,0.4)",
          marginTop: "5px",
        }}
      />
    </div>
  );
}

// ─── PaperTag ────────────────────────────────────────────────────────────────
export function PaperTag({
  text = "archive",
  style,
}: {
  text?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 2,
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          background: "rgba(255,248,240,0.92)",
          border: "1px solid rgba(180,155,120,0.4)",
          borderRadius: "3px",
          padding: "3px 8px 4px",
          position: "relative",
          display: "inline-block",
        }}
      >
        {/* Hole at top */}
        <div
          style={{
            position: "absolute",
            top: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            border: "1px solid rgba(180,155,120,0.55)",
            background: "rgba(245,236,216,0.9)",
          }}
        />
        {/* String */}
        <svg
          width="1"
          height="10"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-14px",
            left: "calc(50% - 0.5px)",
          }}
        >
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="10"
            stroke="rgba(180,155,120,0.5)"
            strokeWidth="1"
          />
        </svg>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "7.5px",
            color: "rgba(61,43,43,0.5)",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

// ─── LaceDivider ─────────────────────────────────────────────────────────────
export function LaceDivider({ style }: { style?: React.CSSProperties }) {
  // Repeating scallop/arch SVG pattern
  return (
    <svg
      width="100%"
      height="18"
      viewBox="0 0 400 18"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      style={{
        display: "block",
        pointerEvents: "none",
        opacity: 0.55,
        ...style,
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <path
          key={`arch-x${i * 20}`}
          d={`M${i * 20} 18 Q${i * 20 + 10} 2 ${i * 20 + 20} 18`}
          stroke="rgba(197,213,197,0.8)"
          strokeWidth="1.2"
          fill="none"
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <circle
          key={`dot-cx${i * 20 + 10}`}
          cx={i * 20 + 10}
          cy="3"
          r="1"
          fill="rgba(197,213,197,0.6)"
        />
      ))}
    </svg>
  );
}

// ─── GoldFoilAccent ──────────────────────────────────────────────────────────
export function GoldFoilAccent({
  style,
  variant = "star",
}: {
  style?: React.CSSProperties;
  variant?: "star" | "corner" | "line";
}) {
  if (variant === "star") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none", ...style }}
      >
        <path
          d="M9 1 L9 17 M1 9 L17 9 M3 3 L15 15 M15 3 L3 15"
          stroke="rgba(201,168,76,0.55)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (variant === "corner") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none", ...style }}
      >
        <path
          d="M2 12 L2 4 Q2 2 4 2 L12 2"
          stroke="rgba(201,168,76,0.55)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="4" cy="4" r="1.5" fill="rgba(201,168,76,0.5)" />
      </svg>
    );
  }
  return (
    <svg
      width="60"
      height="6"
      viewBox="0 0 60 6"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <path
        d="M2 3 L8 3"
        stroke="rgba(201,168,76,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 3 L48 3"
        stroke="rgba(201,168,76,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M52 3 L58 3"
        stroke="rgba(201,168,76,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="3" r="1.5" fill="rgba(201,168,76,0.5)" />
      <circle cx="50" cy="3" r="1.5" fill="rgba(201,168,76,0.5)" />
    </svg>
  );
}

// ─── CharcoalSmudge ───────────────────────────────────────────────────────────
export function CharcoalSmudge({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "140px",
        height: "70px",
        background: "rgba(61,43,43,0.07)",
        filter: "blur(32px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
}

// ─── CoffeeStainRing ─────────────────────────────────────────────────────────
export function CoffeeStainRing({
  style,
  size = 60,
}: {
  style?: React.CSSProperties;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 60 45"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <ellipse
        cx="30"
        cy="22"
        rx="26"
        ry="18"
        stroke="rgba(160,110,60,0.22)"
        strokeWidth="2.5"
        fill="none"
      />
      <ellipse
        cx="30"
        cy="22"
        rx="23"
        ry="15.5"
        stroke="rgba(160,110,60,0.10)"
        strokeWidth="1"
        fill="none"
      />
      {/* Inner ring suggestion */}
      <ellipse
        cx="32"
        cy="24"
        rx="20"
        ry="13"
        stroke="rgba(160,110,60,0.06)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

// ─── PressedLeaf ─────────────────────────────────────────────────────────────
export function PressedLeaf({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="44"
      height="72"
      viewBox="0 0 44 72"
      fill="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity: 0.18,
        ...style,
      }}
    >
      <path
        d="M22 68 Q24 44 20 28 Q16 10 22 4 Q28 10 26 28 Q24 44 22 68Z"
        fill="rgba(168,196,160,0.85)"
      />
      <path d="M22 44 Q8 32 6 20 Q14 28 22 44Z" fill="rgba(168,196,160,0.6)" />
      <path
        d="M22 54 Q38 40 40 28 Q32 36 22 54Z"
        fill="rgba(168,196,160,0.6)"
      />
      {/* Midrib */}
      <path
        d="M22 68 Q22 36 22 4"
        stroke="rgba(120,150,110,0.5)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

// ─── CrosshatchBorder ────────────────────────────────────────────────────────
export function CrosshatchBorder({
  style,
  width = 18,
  height = 100,
}: {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity: 0.22,
        ...style,
      }}
    >
      <defs>
        <pattern
          id="crosshatch"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 6 L6 0" stroke="rgba(61,43,43,0.55)" strokeWidth="0.6" />
          <path d="M0 0 L6 6" stroke="rgba(61,43,43,0.55)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill="url(#crosshatch)" />
    </svg>
  );
}

// ─── TypewriterStripBg ───────────────────────────────────────────────────────
export function TypewriterStripBg({
  text = "archive notes research field observations catalogue",
  style,
}: {
  text?: string;
  style?: React.CSSProperties;
}) {
  const repeated = `${text} · `.repeat(8);
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        fontFamily: "'Courier New', monospace",
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "rgba(61,43,43,0.055)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
        width: "100%",
        lineHeight: 1.6,
        ...style,
      }}
    >
      {repeated}
    </div>
  );
}

// ─── NewsPageFragment ────────────────────────────────────────────────────────
export function NewsPageFragment({ style }: { style?: React.CSSProperties }) {
  const dummyLines = [
    "Lorem ipsum dolor sit amet,",
    "consectetur adipiscing",
    "elit, sed do eiusmod",
    "tempor incididunt ut",
    "labore et dolore magna",
    "aliqua. Ut enim ad minim",
    "veniam, quis nostrud",
    "exercitation ullamco",
    "laboris nisi ut aliquip",
  ];
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "108px",
        borderLeft: "1px solid rgba(61,43,43,0.15)",
        paddingLeft: "6px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.18,
        ...style,
      }}
    >
      {dummyLines.map((line, idx) => (
        <div
          key={`newsfrag-${line.slice(0, 6)}-${line.length}`}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "6.5px",
            color: "rgba(61,43,43,0.8)",
            lineHeight: 1.6,
            borderBottom:
              idx % 3 === 2 ? "1px solid rgba(61,43,43,0.08)" : "none",
            paddingBottom: idx % 3 === 2 ? "3px" : "0",
            marginBottom: idx % 3 === 2 ? "3px" : "0",
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

// ─── MapFragment ─────────────────────────────────────────────────────────────
export function MapFragment({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="120"
      height="90"
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity: 0.18,
        ...style,
      }}
    >
      {/* Curved roads/paths */}
      <path
        d="M10 80 Q30 50 50 40 Q70 30 90 50 Q100 58 110 70"
        stroke="rgba(61,43,43,0.6)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 10 Q40 30 55 40"
        stroke="rgba(61,43,43,0.5)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 15 Q70 40 80 50 Q90 60 110 55"
        stroke="rgba(61,43,43,0.45)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small grid lines */}
      {[20, 40, 60, 80, 100].map((x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="90"
          stroke="rgba(61,43,43,0.06)"
          strokeWidth="0.5"
        />
      ))}
      {[20, 40, 60, 80].map((y) => (
        <line
          key={`h${y}`}
          x1="0"
          y1={y}
          x2="120"
          y2={y}
          stroke="rgba(61,43,43,0.06)"
          strokeWidth="0.5"
        />
      ))}
      {/* Location markers */}
      <circle cx="55" cy="40" r="3" fill="rgba(212,132,154,0.5)" />
      <circle
        cx="55"
        cy="40"
        r="5"
        stroke="rgba(212,132,154,0.3)"
        strokeWidth="1"
        fill="none"
      />
      {/* Labels */}
      <text
        x="60"
        y="38"
        fontSize="5"
        fill="rgba(61,43,43,0.5)"
        fontFamily="'Courier New', monospace"
      >
        Varanasi
      </text>
    </svg>
  );
}
