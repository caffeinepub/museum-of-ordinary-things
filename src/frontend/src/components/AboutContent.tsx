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
        stroke="#C5A882"
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

function TornEdge() {
  return (
    <svg
      width="100%"
      height="24"
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: "block", marginBottom: "4px" }}
    >
      <path
        d="M0 24 L0 10 Q30 2 60 10 Q90 18 120 7 Q150 0 180 12 Q210 22 240 9 Q270 0 300 11 Q330 20 360 7 Q390 0 420 13 Q450 22 480 8 Q510 0 540 12 Q570 22 600 8 Q630 0 660 14 Q690 22 720 9 Q750 0 780 11 Q810 20 840 7 Q870 0 900 13 Q930 22 960 10 Q990 0 1020 12 Q1050 20 1080 7 Q1110 0 1140 13 Q1170 22 1200 10 L1200 24 Z"
        fill="rgba(242,196,206,0.7)"
      />
    </svg>
  );
}

function ClickablePhoto({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [zoomed, setZoomed] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        style={{
          display: "block",
          padding: 0,
          border: "none",
          background: "none",
          cursor: "zoom-in",
        }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            display: "block",
            width: `${width}px`,
            height: `${height}px`,
            objectFit: "cover",
          }}
        />
      </button>
      <AnimatePresence>
        {zoomed && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(61,43,43,0.82)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "zoom-out",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
          >
            <motion.img
              src={src}
              alt={alt}
              style={{
                maxWidth: "min(90vw, 400px)",
                maxHeight: "80vh",
                objectFit: "cover",
                borderRadius: "2px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Life Stories fragments ────────────────────────────────────────────────

const lifeFragments = [
  "grew up reading manhwa — visual storytelling as first language",
  "Heath Ledger's Joker taught me what committed performance looks like",
  "stories live in objects. in the ordinary.",
  "always in the middle of three notebooks at once",
];

function LifeStoriesPanel() {
  return (
    <motion.div
      style={{
        background: "rgba(242,196,206,0.12)",
        border: "1px dashed rgba(212,132,154,0.35)",
        borderRadius: "3px",
        padding: "1rem 1.2rem",
        position: "relative",
        maxWidth: "420px",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.5 }}
    >
      {/* Tape at top */}
      <ClickableTape
        width="52px"
        rotate="-2deg"
        style={{
          position: "absolute",
          top: "-9px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        className="font-handwritten"
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "#D4849A",
          opacity: 0.8,
          marginBottom: "0.7rem",
          textTransform: "uppercase",
        }}
      >
        fragments
      </div>
      {lifeFragments.map((frag, i) => (
        <motion.p
          key={frag}
          className="font-handwritten"
          style={{
            fontSize: "0.88rem",
            color: "#5a4040",
            lineHeight: 1.65,
            fontStyle: "italic",
            marginBottom: "0.5rem",
            paddingLeft: i % 2 === 0 ? "0" : "0.8rem",
          }}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
        >
          “{frag}”
        </motion.p>
      ))}
    </motion.div>
  );
}

// ─── Music archive ───────────────────────────────────────────────────────────

const albums = [
  { title: "In Rainbows", artist: "Radiohead", bg: "#C5D5C5", rotate: "-3deg" },
  { title: "OK Computer", artist: "Radiohead", bg: "#F2C4CE", rotate: "2deg" },
  { title: "Bewitched", artist: "Laufey", bg: "#F7D9E0", rotate: "-1.5deg" },
  { title: "AM", artist: "Arctic Monkeys", bg: "#F0E6D3", rotate: "3deg" },
  {
    title: "Favourite Worst Nightmare",
    artist: "Arctic Monkeys",
    bg: "#EBBEC8",
    rotate: "-2.5deg",
  },
  {
    title: "Humbug",
    artist: "Arctic Monkeys",
    bg: "#C5D5C5",
    rotate: "1.5deg",
  },
  { title: "The Bends", artist: "Radiohead", bg: "#F5ECD8", rotate: "-4deg" },
  {
    title: "Whatever People Say I Am...",
    artist: "Arctic Monkeys",
    bg: "#F2C4CE",
    rotate: "2.5deg",
  },
];

function MusicArchive() {
  return (
    <motion.div
      style={{ marginTop: "1.8rem" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <div
        className="font-handwritten"
        style={{
          fontSize: "1rem",
          color: "#D4849A",
          marginBottom: "0.9rem",
          fontStyle: "italic",
        }}
      >
        currently playing ♫
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        {albums.map((album, i) => (
          <motion.div
            key={album.title}
            style={{
              width: "82px",
              minHeight: "62px",
              background: album.bg,
              borderRadius: "3px",
              padding: "6px 7px",
              transform: `rotate(${album.rotate})`,
              boxShadow: "2px 3px 8px rgba(61,43,43,0.14)",
              cursor: "default",
              flexShrink: 0,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 + i * 0.07, duration: 0.3 }}
            whileHover={{
              scale: 1.08,
              rotate: 0,
              boxShadow: "4px 6px 16px rgba(61,43,43,0.2)",
              zIndex: 10,
            }}
          >
            {/* Mini vinyl circle */}
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                border: "2px solid rgba(61,43,43,0.2)",
                margin: "0 auto 5px",
                background: "rgba(61,43,43,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "rgba(61,43,43,0.3)",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                fontWeight: 700,
                color: "#3D2B2B",
                lineHeight: 1.3,
                marginBottom: "2px",
                wordBreak: "break-word",
              }}
            >
              {album.title}
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                color: "rgba(61,43,43,0.6)",
                lineHeight: 1.2,
              }}
            >
              {album.artist}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function AboutContent() {
  return (
    <div
      className="grain-overlay"
      style={{
        minHeight: "100vh",
        background: "#FFF8F0",
        padding: "0",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <TornEdge />

      {/* Subtle background word */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          bottom: "8%",
          right: "-2%",
          fontSize: "clamp(6rem, 14vw, 12rem)",
          color: "rgba(235,190,200,0.07)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "0.04em",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        ARCHIVE
      </div>

      {/* Floating click-reveal annotations */}
      <ClickRevealNote
        note="culture & everyday objects"
        style={{ position: "absolute", top: "5%", left: "3%" }}
      >
        <motion.div
          className="font-handwritten"
          style={{
            fontSize: "12px",
            color: "#C5D5C5",
            transform: "rotate(-8deg)",
            opacity: 0.55,
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          student researcher
        </motion.div>
      </ClickRevealNote>

      <ClickRevealNote
        note="always taking notes"
        style={{ position: "absolute", top: "8%", right: "5%" }}
      >
        <motion.div
          className="font-handwritten"
          style={{
            fontSize: "12px",
            color: "#C5D5C5",
            transform: "rotate(7deg)",
            opacity: 0.5,
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          field notes
        </motion.div>
      </ClickRevealNote>

      {/* Sticky notes */}
      <StickyNote
        text="this mattered"
        bg="rgba(242,196,206,0.72)"
        rotate="-5deg"
        style={{ position: "absolute", bottom: "8%", left: "2%", zIndex: 4 }}
      />
      <StickyNote
        text="note to self"
        bg="rgba(197,213,197,0.65)"
        rotate="3deg"
        style={{ position: "absolute", top: "55%", right: "2%", zIndex: 4 }}
      />

      {/* Arrow near portrait */}
      <ClickRevealNote
        note="exploring the everyday"
        style={{ position: "absolute", top: "18%", left: "28%" }}
      >
        <motion.svg
          className="pointer-events-none"
          style={{ opacity: 0.3 }}
          width="40"
          height="32"
          viewBox="0 0 40 32"
          fill="none"
          aria-hidden="true"
          animate={{ x: [0, 3, 0] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <path
            d="M4 28 Q20 6 36 18"
            stroke="#C5D5C5"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M32 14 L36 18 L30 20"
            stroke="#C5D5C5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.svg>
      </ClickRevealNote>

      {/* Main content */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 5vw, 4rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top row: portrait + text */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(1.5rem, 4vw, 3.5rem)",
            alignItems: "flex-start",
            marginBottom: "2.5rem",
          }}
        >
          {/* Polaroid portrait */}
          <motion.div
            style={{
              flexShrink: 0,
              position: "relative",
              alignSelf: "flex-start",
            }}
            whileHover={{ rotate: 2, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <PaperClip
              style={{
                top: "-18px",
                right: "10px",
                transform: "rotate(15deg)",
              }}
            />
            <ClickableTape
              width="64px"
              rotate="-3deg"
              style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
              }}
            />
            {/* Push pin */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                right: "-8px",
                zIndex: 20,
              }}
            >
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="6"
                  r="5"
                  fill="#E8B4C0"
                  stroke="#C5D5C5"
                  strokeWidth="1.2"
                />
                <line
                  x1="8"
                  y1="11"
                  x2="8"
                  y2="19"
                  stroke="#9DB89D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="polaroid">
              <ClickablePhoto
                src="/assets/uploads/ccd9fc51-bfdf-4bc5-8f48-455e6de28857-1.jpg"
                alt="Shreeti Agrawal"
                width={180}
                height={220}
              />
            </div>
            <div
              className="font-handwritten absolute"
              style={{
                bottom: "-22px",
                right: "-8px",
                fontSize: "11px",
                color: "#C5D5C5",
                transform: "rotate(5deg)",
                opacity: 0.7,
                whiteSpace: "nowrap",
              }}
            >
              ← that&apos;s me
            </div>
          </motion.div>

          {/* Typography block */}
          <div
            style={{
              flex: 1,
              minWidth: "260px",
              position: "relative",
              paddingTop: "1rem",
            }}
          >
            {/* Self-drawing dashed circle */}
            <div
              style={{
                position: "absolute",
                top: "-24px",
                left: "-16px",
                width: "340px",
                height: "200px",
                pointerEvents: "none",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 340 200"
                fill="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="170"
                  cy="100"
                  rx="165"
                  ry="95"
                  stroke="#E8B4C0"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="600"
                  style={{
                    animation: "draw-circle 3s ease-out forwards",
                    opacity: 0.3,
                  }}
                />
              </svg>
            </div>

            <motion.h2
              className="font-pinyon"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "#3D2B2B",
                lineHeight: 1.2,
                marginBottom: "1.2rem",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Exploring culture,
              <br />
              storytelling,
              <br />
              and everyday objects.
            </motion.h2>

            <motion.p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(0.82rem, 1.5vw, 0.95rem)",
                color: "#6a5a55",
                lineHeight: 1.7,
                maxWidth: "380px",
                marginBottom: "1.5rem",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              Student researcher and storyteller, drawn to culture, everyday
              objects, and the quiet stories they carry.
            </motion.p>

            <motion.div
              className="font-script"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: "#EBBEC8",
                letterSpacing: "0.01em",
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.5 }}
            >
              Shreeti Agrawal
            </motion.div>

            <div style={{ marginTop: "0.8rem" }}>
              <ClickableStamp
                label="ENTRY NO.01"
                revealText="student researcher · storyteller"
                color="#EBBEC8"
              />
            </div>

            <div
              className="font-handwritten"
              style={{
                fontSize: "1rem",
                color: "#C5D5C5",
                opacity: 0.75,
                marginTop: "0.2rem",
              }}
            >
              researcher &amp; storyteller
            </div>
          </div>
        </div>

        {/* Bottom row: Life Stories + Music */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(1.5rem, 4vw, 3rem)",
            alignItems: "flex-start",
          }}
        >
          <LifeStoriesPanel />
          <div style={{ flex: 1, minWidth: "260px" }}>
            <MusicArchive />
          </div>
        </div>
      </div>
    </div>
  );
}
