import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Shared micro-components ────────────────────────────────────────────────

function ClickRevealNote({
  children,
  note,
  style,
}: {
  children: React.ReactNode;
  note: string;
  style?: React.CSSProperties;
}) {
  const [show, setShow] = useState(false);
  return (
    <button
      type="button"
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        ...style,
      }}
      onClick={() => {
        setShow(true);
        setTimeout(() => setShow(false), 2200);
      }}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            className="font-handwritten"
            style={{
              position: "absolute",
              top: "-32px",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              background: "#FFF8F0",
              border: "1px solid rgba(235,190,200,0.5)",
              borderRadius: "3px",
              padding: "3px 9px",
              fontSize: "11px",
              color: "#3D2B2B",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 50,
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {note}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function ClickableStamp({
  label,
  revealText,
  color = "#9DB89D",
  style,
}: {
  label: string;
  revealText: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  const [stamped, setStamped] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setStamped(true);
    setShow(true);
    setTimeout(() => setStamped(false), 500);
    setTimeout(() => setShow(false), 2500);
  };
  return (
    <button
      type="button"
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
      }}
      onClick={handleClick}
    >
      <motion.div
        className="font-typewriter"
        style={{
          fontSize: "8px",
          letterSpacing: "0.18em",
          color,
          border: `1.5px solid ${color}80`,
          padding: "2px 7px",
          borderRadius: "2px",
          userSelect: "none",
          ...style,
        }}
        animate={
          stamped ? { scale: [1, 1.25, 0.9, 1], rotate: [0, 6, -4, 0] } : {}
        }
        transition={{ duration: 0.4 }}
      >
        {label}
      </motion.div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="font-handwritten"
            style={{
              position: "absolute",
              top: "-28px",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              background: "#FFF8F0",
              border: "1px solid rgba(235,190,200,0.5)",
              borderRadius: "3px",
              padding: "3px 9px",
              fontSize: "11px",
              color: "#3D2B2B",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 50,
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {revealText}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function ClickableTape({
  width = "60px",
  rotate = "-2deg",
  style,
}: {
  width?: string;
  rotate?: string;
  style?: React.CSSProperties;
}) {
  const [lifted, setLifted] = useState(false);
  const handleClick = () => {
    setLifted(true);
    setTimeout(() => setLifted(false), 500);
  };
  return (
    <motion.div
      onClick={handleClick}
      style={{
        width,
        height: "18px",
        background: "rgba(230,215,190,0.72)",
        borderRadius: "2px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        cursor: "pointer",
        userSelect: "none",
        ...style,
      }}
      animate={
        lifted
          ? { scaleY: 0.65, y: -7, rotate: 5, opacity: 0.7 }
          : { scaleY: 1, y: 0, rotate: Number.parseFloat(rotate), opacity: 1 }
      }
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  );
}

function PaperClip({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="18"
      height="32"
      viewBox="0 0 18 32"
      fill="none"
      style={{ position: "absolute", ...style }}
      aria-hidden="true"
    >
      <path
        d="M9 2 Q16 2 16 10 L16 26 Q16 30 9 30 Q2 30 2 26 L2 10 Q2 4 7 4 L7 24 Q7 26 9 26 Q11 26 11 24 L11 8"
        stroke="#9DB89D"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StickyNote({
  text,
  bg = "#FFF8C4",
  rotate = "2deg",
  style,
}: {
  text: string;
  bg?: string;
  rotate?: string;
  style?: React.CSSProperties;
}) {
  const [clicked, setClicked] = useState(false);
  const rot = Number.parseFloat(rotate);
  return (
    <motion.div
      className="sticky-note font-handwritten"
      style={{
        background: bg,
        transform: `rotate(${rotate})`,
        color: "#3D2B2B",
        ...style,
      }}
      onClick={() => setClicked(!clicked)}
      animate={
        clicked
          ? { rotate: [rot, rot + 6, rot - 4, rot], scale: [1, 1.06, 0.97, 1] }
          : {}
      }
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.04, boxShadow: "3px 5px 14px rgba(0,0,0,0.16)" }}
    >
      {text}
    </motion.div>
  );
}

// ─── Film strip SVG component ────────────────────────────────────────────────

function FilmStrip({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: "100%",
        height: "36px",
        background: "rgba(30,20,10,0.82)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Perforations top */}
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: 0,
          right: 0,
          display: "flex",
          gap: "14px",
          paddingLeft: "8px",
        }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={`perfTop${i * 13 + 7}`}
            style={{
              width: "10px",
              height: "7px",
              background: "rgba(245,237,218,0.22)",
              borderRadius: "1px",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      {/* Perforations bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "3px",
          left: 0,
          right: 0,
          display: "flex",
          gap: "14px",
          paddingLeft: "8px",
        }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={`perfBot${i * 17 + 3}`}
            style={{
              width: "10px",
              height: "7px",
              background: "rgba(245,237,218,0.22)",
              borderRadius: "1px",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      {/* Frame squares */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          paddingLeft: "16px",
          paddingTop: "2px",
        }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={`frame${i * 11 + 5}`}
            style={{
              width: "22px",
              height: "16px",
              border: "1px solid rgba(197,213,197,0.18)",
              borderRadius: "1px",
              background: "rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Vertical film strip for left side
function VerticalFilmStrip({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: "28px",
        background: "rgba(20,14,8,0.88)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 2px",
        gap: "4px",
        ...style,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={`vfilm${i * 19 + 2}`}>
          <div
            style={{
              width: "8px",
              height: "6px",
              background: "rgba(245,237,218,0.2)",
              borderRadius: "1px",
              marginBottom: "2px",
            }}
          />
          <div
            style={{
              width: "18px",
              height: "12px",
              border: "1px solid rgba(197,213,197,0.15)",
              borderRadius: "1px",
              background: "rgba(0,0,0,0.25)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Letterboxd-style review block ──────────────────────────────────────────

function LetterboxdBlock() {
  return (
    <motion.div
      style={{
        background: "rgba(20,14,8,0.72)",
        border: "1px solid rgba(197,213,197,0.18)",
        borderRadius: "3px",
        padding: "1rem 1.2rem",
        maxWidth: "580px",
        position: "relative",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {/* Letterboxd header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "0.6rem",
          flexWrap: "wrap",
        }}
      >
        <span
          className="font-typewriter"
          style={{
            fontSize: "8px",
            letterSpacing: "0.25em",
            color: "rgba(197,213,197,0.7)",
          }}
        >
          LETTERBOXD ENTRY
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(197,213,197,0.12)",
          }}
        />
        {/* Stars */}
        <div style={{ display: "flex", gap: "2px" }}>
          <span style={{ fontSize: "13px", color: "#E8C070", opacity: 0.9 }}>
            ★
          </span>
          <span style={{ fontSize: "13px", color: "#E8C070", opacity: 0.9 }}>
            ★
          </span>
          <span style={{ fontSize: "13px", color: "#E8C070", opacity: 0.9 }}>
            ★
          </span>
          <span style={{ fontSize: "13px", color: "#E8C070", opacity: 0.9 }}>
            ★
          </span>
          <span style={{ fontSize: "13px", color: "#E8C070", opacity: 0.55 }}>
            ½
          </span>
        </div>
      </div>

      {/* Review snippet */}
      <p
        className="font-handwritten"
        style={{
          fontSize: "0.92rem",
          color: "rgba(245,237,218,0.78)",
          fontStyle: "italic",
          lineHeight: 1.6,
          marginBottom: "0.8rem",
        }}
      >
        &ldquo;A meditation on hands, colour, and the weight of
        inheritance.&rdquo;
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {["documentary", "craft", "culture", "Rajasthan", "2025"].map((tag) => (
          <span
            key={tag}
            className="font-typewriter"
            style={{
              fontSize: "8px",
              letterSpacing: "0.12em",
              color: "rgba(197,213,197,0.75)",
              border: "1px solid rgba(197,213,197,0.22)",
              borderRadius: "10px",
              padding: "2px 8px",
              background: "rgba(197,213,197,0.06)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Clickable stamp */}
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <ClickableStamp
          label="REVIEWED"
          revealText="Gulabi Meenakari · 2025"
          color="rgba(197,213,197,0.7)"
        />
      </div>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function FilmContent() {
  return (
    <div
      className="grain-overlay"
      style={{
        minHeight: "100vh",
        background: "#1a120a",
        position: "relative",
        color: "#F5ECD8",
        overflowX: "hidden",
      }}
    >
      {/* Top film strip */}
      <FilmStrip />

      <div style={{ display: "flex", position: "relative" }}>
        {/* Vertical film strip on left */}
        <VerticalFilmStrip
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 2,
          }}
        />

        {/* Main content */}
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(2.5rem, 6vw, 5rem)",
            position: "relative",
            flex: 1,
          }}
        >
          {/* Tape at top */}
          <ClickableTape
            width="80px"
            rotate="-1.5deg"
            style={{
              position: "absolute",
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 5,
            }}
          />

          {/* Floating stars */}
          <motion.span
            className="absolute font-handwritten pointer-events-none"
            style={{
              top: "20px",
              right: "8%",
              fontSize: "18px",
              color: "#A8C4A0",
              opacity: 0.65,
            }}
            animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.9, 1.1, 0.9] }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            ✶
          </motion.span>
          <motion.span
            className="absolute font-handwritten pointer-events-none"
            style={{
              top: "48px",
              right: "14%",
              fontSize: "13px",
              color: "#C5D5C5",
              opacity: 0.5,
            }}
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            ★
          </motion.span>
          <motion.span
            className="absolute font-handwritten pointer-events-none"
            style={{
              top: "70px",
              right: "4%",
              fontSize: "10px",
              color: "#E8B4C0",
              opacity: 0.4,
            }}
            animate={{ opacity: [0.2, 0.55, 0.2] }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            ✦
          </motion.span>

          {/* Academic annotation sticky notes — placed at edges */}
          <StickyNote
            text="shot composition →"
            bg="rgba(255,248,198,0.88)"
            rotate="-4deg"
            style={{
              position: "absolute",
              top: "10%",
              right: "3%",
              zIndex: 4,
              fontSize: "11px",
            }}
          />
          <StickyNote
            text="cultural context ✶"
            bg="rgba(242,196,206,0.82)"
            rotate="3deg"
            style={{
              position: "absolute",
              top: "28%",
              right: "2%",
              zIndex: 4,
              fontSize: "11px",
            }}
          />
          <StickyNote
            text="visual study"
            bg="rgba(197,213,197,0.8)"
            rotate="-2deg"
            style={{
              position: "absolute",
              bottom: "38%",
              left: "0%",
              zIndex: 4,
              fontSize: "11px",
            }}
          />
          <StickyNote
            text="craft & memory"
            bg="rgba(255,248,198,0.78)"
            rotate="5deg"
            style={{
              position: "absolute",
              bottom: "22%",
              right: "2%",
              zIndex: 4,
              fontSize: "11px",
            }}
          />

          {/* Paper clip */}
          <PaperClip style={{ top: "30px", right: "8%" }} />

          {/* Title block with self-drawing circle */}
          <div
            style={{
              position: "relative",
              marginBottom: "1.5rem",
              paddingTop: "2rem",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "-14px",
                width: "340px",
                height: "70px",
                pointerEvents: "none",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 340 70"
                fill="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="170"
                  cy="35"
                  rx="165"
                  ry="30"
                  stroke="#C5D5C5"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="600"
                  style={{
                    animation: "draw-circle 2.2s ease-out forwards",
                    opacity: 0.6,
                  }}
                />
              </svg>
            </div>
            <h2
              className="font-script"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                color: "#F5ECD8",
                lineHeight: 1.1,
                letterSpacing: "0.01em",
              }}
            >
              Gulabi Meenakari
            </h2>
          </div>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              className="font-typewriter"
              style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "#9DB89D",
              }}
            >
              DOCUMENTARY
            </span>
            <span
              className="font-typewriter"
              style={{
                fontSize: "11px",
                color: "#9DB89D",
                border: "1.5px solid rgba(157,184,157,0.4)",
                padding: "1px 7px",
                borderRadius: "2px",
              }}
            >
              2025
            </span>
            <span
              className="font-handwritten"
              style={{ fontSize: "13px", color: "#EBBEC8", opacity: 0.85 }}
            >
              dir. Shreeti Agrawal
            </span>
          </div>

          {/* "watch this" annotation */}
          <ClickRevealNote note="a story worth watching">
            <motion.div
              className="font-handwritten"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1rem",
                color: "#9DB89D",
                marginBottom: "1.2rem",
              }}
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg
                width="28"
                height="18"
                viewBox="0 0 28 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 9 Q14 2 24 9"
                  stroke="#9DB89D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M20 5 L24 9 L19 11"
                  stroke="#9DB89D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              watch this →
            </motion.div>
          </ClickRevealNote>

          {/* Video frame with edge annotations */}
          <div
            style={{
              position: "relative",
              maxWidth: "580px",
              marginBottom: "1.5rem",
            }}
          >
            {/* Edge handwritten notes — corners only */}
            <motion.div
              className="font-handwritten"
              style={{
                position: "absolute",
                top: "-24px",
                left: "0",
                fontSize: "10px",
                color: "#9DB89D",
                opacity: 0.75,
                transform: "rotate(-2deg)",
                whiteSpace: "nowrap",
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              entry 01 ↓
            </motion.div>
            <motion.div
              className="font-handwritten"
              style={{
                position: "absolute",
                top: "-24px",
                right: "0",
                fontSize: "10px",
                color: "#C5D5C5",
                opacity: 0.65,
                transform: "rotate(2deg)",
                whiteSpace: "nowrap",
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              field recording
            </motion.div>

            {/* Video */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16/9",
                background: "rgba(0,0,0,0.75)",
                boxShadow:
                  "0 6px 28px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.18)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              {/* Tape corners */}
              <ClickableTape
                width="70px"
                rotate="-2deg"
                style={{
                  position: "absolute",
                  top: "-9px",
                  left: "30%",
                  zIndex: 5,
                }}
              />
              <ClickableTape
                width="60px"
                rotate="1.5deg"
                style={{
                  position: "absolute",
                  bottom: "-9px",
                  right: "20%",
                  zIndex: 5,
                }}
              />
              <iframe
                src="https://www.youtube.com/embed/placeholder"
                title="Gulabi Meenakari Documentary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                }}
              />
              {/* Grain overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.09'/%3E%3C/svg%3E\")",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Bottom annotation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "6px",
                paddingLeft: "4px",
              }}
            >
              <motion.div
                className="font-handwritten"
                style={{
                  fontSize: "10px",
                  color: "#9DB89D",
                  opacity: 0.65,
                  fontStyle: "italic",
                }}
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                2025 · Rajasthan
              </motion.div>
              <motion.div
                className="font-typewriter"
                style={{
                  fontSize: "9px",
                  color: "rgba(197,213,197,0.5)",
                  letterSpacing: "0.15em",
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                ARCHIVAL COPY
              </motion.div>
            </div>
          </div>

          {/* Handwritten archival annotations row */}
          <div
            style={{
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
              marginBottom: "1.2rem",
              alignItems: "center",
            }}
          >
            {[
              { text: "shot composition →", color: "#9DB89D" },
              { text: "cultural context ✶", color: "#EBBEC8" },
              { text: "visual study", color: "#C5D5C5" },
            ].map(({ text, color }) => (
              <motion.div
                key={text}
                className="font-handwritten"
                style={{
                  fontSize: "11px",
                  color,
                  opacity: 0.8,
                  fontStyle: "italic",
                  borderBottom: `1px dashed ${color}50`,
                  paddingBottom: "2px",
                }}
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 5 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: Math.random(),
                }}
              >
                {text}
              </motion.div>
            ))}
          </div>

          {/* Documentary stamp + note labels */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            <ClickableStamp
              label="DOCUMENTARY"
              revealText="Gulabi Meenakari · 2025"
              color="#9DB89D"
            />
            {["film notes ✶", "entry 02", "2025"].map((label) => (
              <motion.div
                key={label}
                className="font-handwritten"
                style={{
                  background: "rgba(197,213,197,0.12)",
                  border: "1px solid rgba(197,213,197,0.25)",
                  borderRadius: "3px",
                  padding: "2px 10px",
                  fontSize: "12px",
                  color: "#9DB89D",
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {label}
              </motion.div>
            ))}
          </div>

          {/* Letterboxd-style entry */}
          <LetterboxdBlock />

          {/* Extra floating arrow */}
          <motion.svg
            className="absolute pointer-events-none"
            style={{ top: "30%", left: "2%", opacity: 0.3 }}
            width="36"
            height="50"
            viewBox="0 0 36 50"
            fill="none"
            aria-hidden="true"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <path
              d="M18 4 L18 40"
              stroke="#C5D5C5"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 32 L18 40 L26 32"
              stroke="#C5D5C5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.svg>

          {/* Doodle circle */}
          <motion.svg
            className="absolute pointer-events-none"
            style={{ bottom: "80px", right: "6%", opacity: 0.35 }}
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            aria-hidden="true"
            animate={{ rotate: [0, 5, -4, 0] }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#C5D5C5"
              strokeWidth="2"
              strokeDasharray="8 5"
              fill="none"
            />
          </motion.svg>

          {/* Postage stamp */}
          <div
            style={{
              position: "absolute",
              bottom: "90px",
              right: "4%",
            }}
          >
            <ClickableStamp
              label="FIELD NOTES"
              revealText="craft · culture · 2025"
              color="rgba(197,213,197,0.7)"
              style={{
                fontSize: "7px",
                border: "2px solid rgba(197,213,197,0.3)",
                padding: "6px 8px",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Binder rings */}
          <div
            style={{
              position: "absolute",
              left: "36px",
              top: "80px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
            aria-hidden="true"
          >
            {["b1", "b2", "b3", "b4", "b5"].map((k) => (
              <div
                key={k}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "2.5px solid rgba(197,213,197,0.3)",
                  background: "transparent",
                }}
              />
            ))}
          </div>

          {/* Bottom vol label */}
          <motion.div
            className="font-typewriter text-center"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#9DB89D",
              opacity: 0.55,
              marginTop: "2rem",
            }}
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            vol. III — project files
          </motion.div>
        </div>
      </div>

      {/* Bottom film strip */}
      <FilmStrip />
    </div>
  );
}
