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

function TornEdge() {
  return (
    <svg
      width="100%"
      height="24"
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d="M0 24 L0 10 Q40 0 80 10 Q110 18 140 6 Q170 0 200 12 Q230 22 260 8 Q290 0 320 11 Q350 20 380 7 Q410 0 440 13 Q470 22 510 8 Q540 0 570 12 Q600 22 630 8 Q660 0 700 14 Q730 22 760 9 Q790 0 820 11 Q850 20 880 7 Q910 0 940 13 Q970 22 1000 10 Q1030 0 1060 12 Q1090 20 1120 7 Q1150 0 1180 13 L1200 22 L1200 24 Z"
        fill="rgba(247,217,224,0.85)"
      />
    </svg>
  );
}

function SparkleEffect() {
  return (
    <motion.div
      className="absolute -top-3 -right-3 pointer-events-none"
      style={{ fontSize: "16px", color: "#E8B4C0" }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      ✶
    </motion.div>
  );
}

// ─── Double-sided junk journal for Museum of Ordinary Things ────────────────

function JunkJournalBack() {
  return (
    <div
      style={{
        background: "#F7EEE4",
        borderRadius: "2px",
        padding: "1.2rem 1rem",
        minHeight: "280px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lined paper texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 22px, rgba(157,184,157,0.18) 22px, rgba(157,184,157,0.18) 23px)",
          pointerEvents: "none",
        }}
      />
      {/* Tape at top */}
      <div
        style={{
          position: "absolute",
          top: "-8px",
          left: "22%",
          width: "54px",
          height: "16px",
          background: "rgba(230,215,190,0.65)",
          borderRadius: "2px",
          transform: "rotate(-1deg)",
        }}
      />
      {/* Wax seal doodle */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "10px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "rgba(212,132,154,0.22)",
          border: "1.5px solid rgba(212,132,154,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          color: "#D4849A",
          fontFamily: "'PinyonScript', cursive",
        }}
      >
        ✶
      </div>
      {/* Handwritten lines */}
      <div style={{ paddingTop: "8px", position: "relative", zIndex: 1 }}>
        <p
          className="font-handwritten"
          style={{
            fontSize: "0.95rem",
            color: "#5a4040",
            lineHeight: 1.9,
            transform: "rotate(-0.5deg)",
            marginBottom: "0.4rem",
          }}
        >
          this project lives in the
        </p>
        <p
          className="font-handwritten"
          style={{
            fontSize: "0.95rem",
            color: "#5a4040",
            lineHeight: 1.9,
            paddingLeft: "1.2rem",
            transform: "rotate(0.3deg)",
            marginBottom: "0.4rem",
          }}
        >
          spaces between things
        </p>
        <p
          className="font-handwritten"
          style={{
            fontSize: "0.82rem",
            color: "#9DB89D",
            lineHeight: 1.9,
            transform: "rotate(-0.8deg)",
            fontStyle: "italic",
            marginBottom: "0.4rem",
          }}
        >
          — catalogue of quiet
        </p>
        <p
          className="font-typewriter"
          style={{
            fontSize: "0.65rem",
            color: "rgba(61,43,43,0.45)",
            letterSpacing: "0.12em",
            marginTop: "0.7rem",
            transform: "rotate(0.5deg)",
          }}
        >
          objects hold memory
        </p>
        {/* Doodle arrow */}
        <svg
          width="38"
          height="28"
          viewBox="0 0 38 28"
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "14px",
            opacity: 0.45,
          }}
        >
          <path
            d="M4 24 Q20 4 34 14"
            stroke="#C5D5C5"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M30 10 L34 14 L28 16"
            stroke="#C5D5C5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        {/* Small stamp */}
        <div
          className="font-typewriter"
          style={{
            position: "absolute",
            bottom: "8px",
            left: "0",
            fontSize: "7px",
            letterSpacing: "0.2em",
            color: "#D4849A",
            border: "1.5px solid rgba(212,132,154,0.4)",
            padding: "2px 6px",
            borderRadius: "2px",
            transform: "rotate(-3deg)",
          }}
        >
          ARCHIVE
        </div>
        {/* Sticky note */}
        <div
          className="font-handwritten"
          style={{
            position: "absolute",
            top: "60px",
            right: "6px",
            background: "rgba(242,196,206,0.7)",
            padding: "4px 8px",
            fontSize: "10px",
            color: "#3D2B2B",
            transform: "rotate(4deg)",
            borderRadius: "2px",
            boxShadow: "1px 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          vol. I
        </div>
      </div>
    </div>
  );
}

function MuseumFlipCard() {
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  return (
    <div
      style={{
        perspective: "900px",
        width: "clamp(180px, 26vw, 260px)",
        minHeight: "300px",
      }}
      data-ocid="projects.item.3"
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "300px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
          filter: hovering
            ? "drop-shadow(0 16px 32px rgba(61,43,43,0.22))"
            : "drop-shadow(3px 5px 14px rgba(61,43,43,0.14))",
        }}
        onHoverStart={() => {
          setHovering(true);
          setShowSparkle(true);
          setTimeout(() => setShowSparkle(false), 900);
        }}
        onHoverEnd={() => setHovering(false)}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "#FFF8F0",
            borderRadius: "2px",
            padding: "2rem 1.4rem 1.6rem",
            boxSizing: "border-box",
          }}
        >
          {showSparkle && <SparkleEffect />}
          <PaperClip style={{ top: "-16px", left: "12px" }} />
          <ClickableTape
            width="58px"
            rotate="-2deg"
            style={{
              position: "absolute",
              top: "-9px",
              left: "38%",
              transform: "translateX(-50%) rotate(-2deg)",
              zIndex: 10,
            }}
          />
          <div className="absolute top-3 right-3">
            <ClickableStamp
              label="ARCHIVE"
              revealText="archived with love"
              color="#9DB89D"
            />
          </div>
          {/* Extra stamp */}
          <div style={{ position: "absolute", bottom: "60px", left: "8px" }}>
            <ClickableStamp
              label="ONGOING"
              revealText="always growing ✶"
              color="#D4849A"
            />
          </div>
          <ClickRevealNote
            note="✶ click to open"
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            <h3
              className="font-serif font-bold"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                color: "#3D2B2B",
                lineHeight: 1.25,
              }}
            >
              Museum of Ordinary Things
            </h3>
          </ClickRevealNote>
          <p
            className="font-handwritten"
            style={{
              fontSize: "0.88rem",
              color: "#6a5a55",
              lineHeight: 1.4,
              marginBottom: "0.6rem",
            }}
          >
            An archive celebrating the quiet stories of everyday objects.
          </p>
          {/* Sticky notes */}
          <StickyNote
            text="click to flip ↩"
            bg="rgba(197,213,197,0.75)"
            rotate="-3deg"
            style={{
              fontSize: "10px",
              padding: "3px 7px",
              marginBottom: "0.5rem",
              display: "inline-block",
            }}
          />
          <StickyNote
            text="stories everywhere"
            bg="rgba(242,196,206,0.65)"
            rotate="2deg"
            style={{
              position: "absolute",
              bottom: "28px",
              right: "8px",
              fontSize: "10px",
              padding: "3px 7px",
            }}
          />
          <motion.a
            href="https://the-museum-of-ordinary-things-jmm.caffeine.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-typewriter"
            style={{
              fontSize: "0.7rem",
              color: "#E8B4C0",
              textDecoration: "none",
              letterSpacing: "0.05em",
              display: "block",
              marginTop: "0.5rem",
            }}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            data-ocid="projects.link.3"
          >
            open file →
          </motion.a>
          {/* Flip button */}
          <button
            type="button"
            onClick={() => setFlipped(true)}
            style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "none",
              border: "1px dashed rgba(197,213,197,0.6)",
              borderRadius: "2px",
              padding: "2px 10px",
              cursor: "pointer",
              fontSize: "9px",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.14em",
              color: "#9DB89D",
            }}
          >
            flip ↩
          </button>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "2px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <JunkJournalBack />
          <button
            type="button"
            onClick={() => setFlipped(false)}
            style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "none",
              border: "1px dashed rgba(212,132,154,0.5)",
              borderRadius: "2px",
              padding: "2px 10px",
              cursor: "pointer",
              fontSize: "9px",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.14em",
              color: "#D4849A",
            }}
          >
            ↩ back
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Regular project cards ───────────────────────────────────────────────────

const regularProjects = [
  {
    title: "These Two Cents",
    url: "https://thesetwocents2.wordpress.com/",
    description: "A personal blog on culture, stories, and ideas.",
    label: "BLOG",
    label2: "ONGOING",
    revealText: "a favourite ✶",
    reveal2: "always writing",
    rotate: "-3deg",
    stickyTexts: ["thoughts here ✶", "click to read →"],
    stickyColors: ["rgba(242,196,206,0.75)", "rgba(197,213,197,0.7)"],
    ocid: "projects.item.1",
    linkOcid: "projects.link.1",
  },
  {
    title: "Glow & Grow",
    url: "https://glowandgrow0.wordpress.com/",
    description: "A space for reflections on growing and glowing.",
    label: "BLOG",
    label2: "STORY",
    revealText: "warmth in words",
    reveal2: "softly told",
    rotate: "2deg",
    stickyTexts: ["growing slowly", "open file →"],
    stickyColors: ["rgba(197,213,197,0.72)", "rgba(242,196,206,0.65)"],
    ocid: "projects.item.2",
    linkOcid: "projects.link.2",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof regularProjects)[number];
  index: number;
}) {
  const [hovering, setHovering] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  return (
    <motion.div
      className="paper-card"
      style={{
        background: "#FFF8F0",
        padding: "2rem 1.4rem 1.6rem",
        borderRadius: "2px",
        boxShadow: hovering
          ? "0 16px 40px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)"
          : "3px 5px 16px rgba(61,43,43,0.14)",
        transform: `rotate(${project.rotate})`,
        width: "clamp(170px, 22vw, 240px)",
        position: "relative",
        flexShrink: 0,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 + 0.1, duration: 0.5 }}
      onHoverStart={() => {
        setHovering(true);
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 900);
      }}
      onHoverEnd={() => setHovering(false)}
      data-ocid={project.ocid}
    >
      {showSparkle && <SparkleEffect />}
      <PaperClip style={{ top: "-16px", left: "12px" }} />
      <ClickableTape
        width="58px"
        rotate="-2deg"
        style={{
          position: "absolute",
          top: "-9px",
          left: "36%",
          transform: "translateX(-50%) rotate(-2deg)",
          zIndex: 10,
        }}
      />
      {/* Sparkle corners */}
      <span
        style={{
          position: "absolute",
          top: "6px",
          left: "8px",
          fontSize: "11px",
          color: "#EBBEC8",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      >
        ✦
      </span>
      {/* Stamps */}
      <div className="absolute top-3 right-3">
        <ClickableStamp
          label={project.label}
          revealText={project.revealText}
          color="#9DB89D"
        />
      </div>
      <div style={{ position: "absolute", bottom: "52px", right: "8px" }}>
        <ClickableStamp
          label={project.label2}
          revealText={project.reveal2}
          color="#D4849A"
        />
      </div>
      {/* Sticky notes */}
      <StickyNote
        text={project.stickyTexts[0]}
        bg={project.stickyColors[0]}
        rotate="-4deg"
        style={{
          position: "absolute",
          top: "-18px",
          right: "10%",
          fontSize: "10px",
          padding: "3px 7px",
        }}
      />
      {/* Title */}
      <ClickRevealNote
        note="✶ click to open"
        style={{
          marginTop: "0.5rem",
          marginBottom: "0.4rem",
          display: "block",
        }}
      >
        <h3
          className="font-serif font-bold"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "#3D2B2B",
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </h3>
      </ClickRevealNote>
      {/* Arrow annotation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "0.4rem",
        }}
      >
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 6 Q10 2 18 6"
            stroke="#C5D5C5"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M15 3 L18 6 L14 8"
            stroke="#C5D5C5"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span
          className="font-handwritten"
          style={{ fontSize: "10px", color: "#C5D5C5" }}
        >
          open →
        </span>
      </div>
      <p
        className="font-handwritten"
        style={{
          fontSize: "0.88rem",
          color: "#6a5a55",
          lineHeight: 1.4,
          marginBottom: "0.7rem",
        }}
      >
        {project.description}
      </p>
      <StickyNote
        text={project.stickyTexts[1]}
        bg={project.stickyColors[1]}
        rotate="3deg"
        style={{
          fontSize: "10px",
          padding: "3px 7px",
          marginBottom: "0.5rem",
          display: "inline-block",
        }}
      />
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-typewriter"
        style={{
          fontSize: "0.72rem",
          color: "#E8B4C0",
          textDecoration: "none",
          letterSpacing: "0.05em",
          display: "block",
          marginTop: "0.3rem",
        }}
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
        data-ocid={project.linkOcid}
      >
        open file →
      </motion.a>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function ProjectsContent() {
  return (
    <div
      className="grain-overlay fabric-texture"
      style={{
        minHeight: "100vh",
        background: "#FAF2EC",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <TornEdge />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 5vw, 3rem)",
          position: "relative",
        }}
      >
        {/* Section heading */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          <motion.h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#3D2B2B",
              letterSpacing: "0.04em",
              opacity: 0.92,
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PROJECT FILES
          </motion.h2>
          <div
            className="font-handwritten absolute"
            style={{
              top: "-10px",
              right: "0",
              fontSize: "11px",
              color: "#C5D5C5",
              transform: "rotate(-4deg)",
              opacity: 0.7,
            }}
          >
            vol. III
          </div>
        </div>

        {/* Floating ambient doodles */}
        <motion.span
          className="absolute font-handwritten pointer-events-none"
          style={{
            top: "16px",
            right: "8%",
            fontSize: "18px",
            color: "#E8B4C0",
            opacity: 0.5,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 4,
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
            right: "5%",
            fontSize: "12px",
            color: "#C5D5C5",
            opacity: 0.45,
          }}
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{
            duration: 5.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          ★
        </motion.span>

        {/* Global sticky note */}
        <StickyNote
          text="click here! ✶"
          bg="rgba(197,213,197,0.72)"
          rotate="-4deg"
          style={{ position: "absolute", top: "0", right: "2%", zIndex: 4 }}
        />
        <StickyNote
          text="new entry ↓"
          bg="rgba(242,196,206,0.7)"
          rotate="3deg"
          style={{ position: "absolute", top: "60px", right: "2%", zIndex: 4 }}
        />

        {/* Arrow doodle */}
        <motion.svg
          className="absolute pointer-events-none"
          style={{ top: "80px", left: "0", opacity: 0.25 }}
          width="30"
          height="44"
          viewBox="0 0 30 44"
          fill="none"
          aria-hidden="true"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <path
            d="M15 4 L15 36"
            stroke="#C5D5C5"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8 28 L15 36 L22 28"
            stroke="#C5D5C5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.svg>

        {/* Cards row — flex wrap so all 3 are visible */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingTop: "1.5rem",
            paddingBottom: "2rem",
          }}
        >
          {regularProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
          {/* Flip card for Museum */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.5 }}
            style={{ transform: "rotate(-1deg)" }}
          >
            <MuseumFlipCard />
          </motion.div>
        </div>

        {/* Binder rings strip */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "flex-start",
            paddingLeft: "1%",
            marginTop: "0.5rem",
          }}
        >
          {["br1", "br2", "br3"].map((k) => (
            <div
              key={k}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: "2.5px solid rgba(157,184,157,0.55)",
                background: "transparent",
                boxShadow: "inset 0 1px 4px rgba(0,0,0,0.18)",
              }}
            />
          ))}
        </div>

        {/* Footer vol label */}
        <motion.div
          className="font-typewriter text-center"
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            color: "#9DB89D",
            opacity: 0.65,
            marginTop: "1rem",
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
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
  );
}
