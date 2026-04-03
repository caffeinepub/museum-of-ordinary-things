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
        d="M0 24 L0 9 Q35 0 70 10 Q100 18 130 6 Q160 0 190 12 Q220 22 250 8 Q280 0 310 11 Q340 20 370 7 Q400 0 430 13 Q460 22 500 8 Q530 0 560 12 Q590 22 620 8 Q650 0 690 14 Q720 22 750 9 Q780 0 810 11 Q840 20 870 7 Q900 0 930 13 Q960 22 990 10 Q1020 0 1050 12 Q1080 20 1110 7 Q1140 0 1170 13 L1200 22 L1200 24 Z"
        fill="rgba(237,227,212,0.85)"
      />
    </svg>
  );
}

// ─── Binder rings component ────────────────────────────────────────────────

function BinderRings({ color = "rgba(157,184,157,0.65)" }: { color?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        paddingTop: "20px",
        paddingLeft: "4px",
        paddingRight: "4px",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {["r1", "r2", "r3", "r4", "r5"].map((k) => (
        <div
          key={k}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: `2.5px solid ${color}`,
            background: "transparent",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.15)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Physical Book component ─────────────────────────────────────────────────

function PhysicalBook({
  title,
  spineColor,
  coverColor,
  contentLines,
  rotateStyle = "0deg",
  delay = 0,
}: {
  title: string;
  spineColor: string;
  coverColor: string;
  contentLines: string[];
  rotateStyle?: string;
  delay?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ transform: `rotate(${rotateStyle})` }}
    >
      <button
        type="button"
        aria-label={`Open ${title}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: "pointer",
          userSelect: "none",
          background: "none",
          border: "none",
          padding: 0,
          textAlign: "left",
        }}
      >
        <div
          style={{
            perspective: "800px",
            width: isOpen ? "380px" : "200px",
            transition: "width 0.4s ease",
          }}
        >
          {/* Book wrapper */}
          <div
            style={{
              display: "flex",
              position: "relative",
              height: "268px",
            }}
          >
            {/* Spine */}
            <div
              style={{
                width: "32px",
                height: "268px",
                background: spineColor,
                borderRadius: "4px 0 0 4px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "inset -3px 0 8px rgba(0,0,0,0.12), 2px 0 6px rgba(0,0,0,0.1)",
              }}
            >
              <span
                style={{
                  writingMode: "vertical-rl",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "Inter, Helvetica, sans-serif",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  transform: "rotate(180deg)",
                }}
              >
                {title.split(" ")[0]}
              </span>
            </div>

            {/* Cover — animates open */}
            <motion.div
              animate={{ rotateY: isOpen ? -140 : 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              style={{
                width: "170px",
                height: "268px",
                background: coverColor,
                borderRadius: "0 6px 6px 0",
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                position: "relative",
                boxShadow: "3px 4px 16px rgba(61,43,43,0.18)",
                flexShrink: 0,
              }}
            >
              {/* Cover front face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "22px 16px",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Decorative band */}
                <div
                  style={{
                    width: "100%",
                    height: "3px",
                    background: "rgba(61,43,43,0.12)",
                    marginBottom: "14px",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Inter, Helvetica, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#3D2B2B",
                    lineHeight: 1.35,
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px",
                    color: "rgba(61,43,43,0.45)",
                    letterSpacing: "0.08em",
                    marginBottom: "14px",
                  }}
                >
                  Shreeti Agrawal
                </div>
                {/* Cover texture lines */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: `${60 - i * 10}%`,
                      height: "1px",
                      background: "rgba(61,43,43,0.08)",
                      marginBottom: "8px",
                    }}
                  />
                ))}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px",
                    color: "rgba(61,43,43,0.38)",
                    fontStyle: "italic",
                  }}
                >
                  click to open ↗
                </div>
              </div>
            </motion.div>

            {/* Inner pages — visible when open */}
            <div
              style={{
                position: "absolute",
                left: "32px",
                top: "4px",
                width: "166px",
                height: "260px",
                background: "#FFFDF7",
                borderRadius: "0 5px 5px 0",
                padding: "16px 14px",
                boxSizing: "border-box",
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 22px, rgba(180,180,180,0.13) 22px, rgba(180,180,180,0.13) 23px)",
                boxShadow: "inset 0 0 8px rgba(61,43,43,0.04)",
                overflowY: "auto",
                zIndex: -1,
              }}
            >
              {contentLines.map((line, i) => (
                <div
                  key={`${i}-${line.slice(0, 10)}`}
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9.5px",
                    color: line.startsWith("[") ? "#9DB89D" : "#3D2B2B",
                    lineHeight: 2.4,
                    fontStyle: line.startsWith("—") ? "italic" : "normal",
                    opacity: line.startsWith("[") ? 0.7 : 0.85,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Caption */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            color: "#9DB89D",
            textAlign: "center",
            marginTop: "8px",
            letterSpacing: "0.06em",
          }}
        >
          {isOpen ? "click to close ↙" : "click to open ↗"}
        </div>
      </button>
    </motion.div>
  );
}

// ─── Research Journal ───────────────────────────────────────────────────

const researchPlaceholders = [
  { id: 1, label: "Academic Paper", hint: "theoretical framework" },
  { id: 2, label: "Field Study", hint: "observations & data" },
  { id: 3, label: "Research Notes", hint: "annotated bibliography" },
];

function _ResearchJournal() {
  return (
    <motion.div
      style={{
        display: "flex",
        flexShrink: 0,
        width: "clamp(280px, 44%, 420px)",
        background: "#F7F4EE",
        borderRadius: "2px",
        boxShadow:
          "4px 6px 20px rgba(61,43,43,0.16), 0 2px 6px rgba(61,43,43,0.08)",
        transform: "rotate(-1.5deg)",
        overflow: "hidden",
        position: "relative",
      }}
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      data-ocid="research.item.1"
    >
      {/* Binder rings on left */}
      <BinderRings color="rgba(157,184,157,0.65)" />

      {/* Journal body */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Lined paper background */}
        <div
          className="lined-paper"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 23px, rgba(157,184,157,0.2) 23px, rgba(157,184,157,0.2) 24px)",
            pointerEvents: "none",
          }}
        />
        {/* Red margin line */}
        <div
          style={{
            position: "absolute",
            left: "28px",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(212,132,154,0.3)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            padding: "16px 18px 20px 36px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Tab label */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "rgba(197,213,197,0.72)",
              padding: "4px 12px",
              borderBottomLeftRadius: "4px",
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: "#3D2B2B",
              }}
            >
              research journal
            </span>
          </div>

          {/* DRAFT stamp */}
          <div style={{ marginBottom: "10px", marginTop: "28px" }}>
            <ClickableStamp
              label="DRAFT"
              revealText="work in progress ✶"
              color="#9DB89D"
            />
          </div>

          {/* Typed academic notes */}
          <div
            className="font-typewriter"
            style={{
              fontSize: "10.5px",
              color: "#3D2B2B",
              lineHeight: 2.15,
              marginBottom: "8px",
            }}
          >
            <div style={{ marginBottom: "3px" }}>
              Research Topic: __________________
            </div>
            <div style={{ marginBottom: "3px" }}>
              Date: _____ / _____ / _________
            </div>
            <div style={{ marginBottom: "3px" }}>
              Hypothesis: ___________________
            </div>
          </div>

          {/* Hand-drawn arrow diagram */}
          <div style={{ position: "relative", margin: "8px 0" }}>
            <svg
              width="110"
              height="44"
              viewBox="0 0 110 44"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="8"
                width="38"
                height="22"
                rx="2"
                stroke="rgba(157,184,157,0.7)"
                strokeWidth="1.2"
                fill="rgba(197,213,197,0.12)"
              />
              <text
                x="21"
                y="21"
                textAnchor="middle"
                fill="rgba(61,43,43,0.6)"
                fontSize="7"
                fontFamily="'Courier New', monospace"
              >
                data
              </text>
              <path
                d="M40 19 L62 19"
                stroke="rgba(157,184,157,0.7)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M58 15 L62 19 L58 23"
                stroke="rgba(157,184,157,0.7)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <rect
                x="62"
                y="8"
                width="46"
                height="22"
                rx="2"
                stroke="rgba(157,184,157,0.7)"
                strokeWidth="1.2"
                fill="rgba(197,213,197,0.12)"
              />
              <text
                x="85"
                y="21"
                textAnchor="middle"
                fill="rgba(61,43,43,0.6)"
                fontSize="7"
                fontFamily="'Courier New', monospace"
              >
                analysis
              </text>
            </svg>
            <div
              className="font-handwritten"
              style={{
                position: "absolute",
                top: "2px",
                right: "-4px",
                fontSize: "9px",
                color: "#9DB89D",
                transform: "rotate(4deg)",
              }}
            >
              diagram →
            </div>
          </div>

          {/* Placeholder docs */}
          {researchPlaceholders.map((item, index) => (
            <motion.div
              key={item.id}
              style={{ marginBottom: "10px", position: "relative" }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              data-ocid={`research.item.${index + 1}`}
            >
              <PaperClip style={{ top: "-12px", left: "8px" }} />
              <div
                style={{
                  background: "rgba(247,244,238,0.9)",
                  border: "1px solid rgba(157,184,157,0.22)",
                  borderRadius: "2px",
                  padding: "8px 12px",
                  paddingTop: "14px",
                }}
              >
                <div
                  className="font-typewriter"
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "#3D2B2B",
                    marginBottom: "3px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  className="font-handwritten"
                  style={{
                    fontSize: "11px",
                    color: "#9DB89D",
                    border: "1px dashed rgba(157,184,157,0.4)",
                    borderRadius: "2px",
                    padding: "3px 7px",
                    background: "rgba(197,213,197,0.08)",
                  }}
                >
                  [ PDF will be uploaded here ]
                </div>
                <div
                  className="font-handwritten"
                  style={{
                    fontSize: "10px",
                    color: "#C5D5C5",
                    marginTop: "2px",
                  }}
                >
                  {item.hint}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Sticky note */}
          <StickyNote
            text="add PDF here"
            bg="rgba(255,248,198,0.88)"
            rotate="-3deg"
            style={{
              position: "absolute",
              bottom: "16px",
              right: "8px",
              fontSize: "11px",
              zIndex: 4,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Essays / Poems Journal ─────────────────────────────────────────────────

const essayPlaceholders = [
  { id: 1, label: "___ — a poem about home", hint: "fragments, 2024" },
  { id: 2, label: "on belonging", hint: "essay draft" },
  { id: 3, label: "what objects remember", hint: "personal essay" },
];

function _EssaysJournal() {
  return (
    <motion.div
      style={{
        display: "flex",
        flexShrink: 0,
        width: "clamp(260px, 42%, 400px)",
        background: "#FFF8F0",
        borderRadius: "2px",
        boxShadow:
          "4px 6px 20px rgba(61,43,43,0.14), 0 2px 6px rgba(61,43,43,0.06)",
        transform: "rotate(1.8deg)",
        overflow: "hidden",
        position: "relative",
      }}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.22 }}
      data-ocid="research.item.4"
    >
      {/* Binder rings on left — pink */}
      <BinderRings color="rgba(212,132,154,0.55)" />

      {/* Journal body */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Soft wider-ruled lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 28px, rgba(235,190,200,0.18) 28px, rgba(235,190,200,0.18) 29px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            padding: "16px 18px 20px 36px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Tab label */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "rgba(242,196,206,0.65)",
              padding: "4px 12px",
              borderBottomLeftRadius: "4px",
            }}
          >
            <span
              className="font-handwritten"
              style={{
                fontSize: "11px",
                color: "#3D2B2B",
              }}
            >
              essays &amp; poems
            </span>
          </div>

          {/* PERSONAL stamp */}
          <div style={{ marginBottom: "10px", marginTop: "28px" }}>
            <ClickableStamp
              label="PERSONAL"
              revealText="soft things, carefully held"
              color="#D4849A"
            />
          </div>

          {/* Poetic placeholder lines */}
          <div style={{ marginBottom: "12px" }}>
            {essayPlaceholders.map((item, i) => (
              <motion.div
                key={item.id}
                style={{ marginBottom: "14px", position: "relative" }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 + 0.28 }}
                data-ocid={`research.item.${i + 5}`}
              >
                <div
                  className="font-handwritten"
                  style={{
                    fontSize: "1rem",
                    color: "#5a4040",
                    lineHeight: 1.55,
                    fontStyle: "italic",
                    marginBottom: "2px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    width: "90%",
                    height: "1px",
                    background: "rgba(235,190,200,0.3)",
                    marginBottom: "2px",
                  }}
                />
                <div
                  className="font-typewriter"
                  style={{
                    fontSize: "9px",
                    color: "#C5D5C5",
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.hint}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pressed-flower doodle */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "48px",
              right: "14px",
              opacity: 0.45,
            }}
          >
            <circle cx="24" cy="24" r="6" fill="rgba(242,196,206,0.7)" />
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const _x1 = 24 + Math.cos(rad) * 6;
              const _y1 = 24 + Math.sin(rad) * 6;
              const _x2 = 24 + Math.cos(rad) * 18;
              const _y2 = 24 + Math.sin(rad) * 18;
              const mx = 24 + Math.cos(rad) * 12;
              const my = 24 + Math.sin(rad) * 12;
              return (
                <ellipse
                  key={angle}
                  cx={mx}
                  cy={my}
                  rx="5"
                  ry="3"
                  fill="rgba(242,196,206,0.55)"
                  transform={`rotate(${angle} ${mx} ${my})`}
                />
              );
            })}
          </svg>

          {/* Star cluster */}
          <div
            style={{
              position: "absolute",
              bottom: "14px",
              left: "12px",
              display: "flex",
              gap: "4px",
              opacity: 0.5,
            }}
          >
            <span style={{ fontSize: "10px", color: "#EBBEC8" }}>✶</span>
            <span style={{ fontSize: "14px", color: "#EBBEC8" }}>✦</span>
            <span style={{ fontSize: "10px", color: "#EBBEC8" }}>✶</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function ResearchContent() {
  return (
    <div
      className="grain-overlay"
      style={{
        minHeight: "100vh",
        background: "#F5EDE0",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <TornEdge />

      {/* Floating annotations */}
      <ClickRevealNote
        note="observations & discoveries"
        style={{ position: "absolute", top: "12%", right: "4%" }}
      >
        <motion.div
          className="font-handwritten"
          style={{
            fontSize: "12px",
            color: "#C5D5C5",
            transform: "rotate(5deg)",
            opacity: 0.65,
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          field notes
        </motion.div>
      </ClickRevealNote>

      <motion.div
        className="font-handwritten absolute pointer-events-none"
        style={{
          bottom: "15%",
          left: "2%",
          fontSize: "11px",
          color: "#C5D5C5",
          transform: "rotate(-6deg)",
          opacity: 0.55,
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        under construction
      </motion.div>

      {/* Arrow decoration */}
      <motion.svg
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{ top: "40%", right: "8%", opacity: 0.3 }}
        width="36"
        height="40"
        viewBox="0 0 36 40"
        fill="none"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <path
          d="M18 4 Q30 20 18 36"
          stroke="#9DB89D"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 30 L18 36 L24 30"
          stroke="#9DB89D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.svg>

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 5vw, 3rem)",
        }}
      >
        {/* Section heading */}
        <motion.h2
          className="font-display"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            color: "#3D2B2B",
            letterSpacing: "0.04em",
            marginBottom: "0.4rem",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          writing & research
        </motion.h2>
        <div
          className="font-handwritten"
          style={{
            fontSize: "0.9rem",
            color: "#9DB89D",
            marginBottom: "2rem",
            fontStyle: "italic",
          }}
        >
          two notebooks, many thoughts
        </div>

        {/* Two journals side by side, flex-wrap for mobile */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(1.5rem, 3vw, 3rem)",
            alignItems: "flex-start",
          }}
        >
          <PhysicalBook
            title="Research Journal"
            spineColor="#9DB89D"
            coverColor="#C5D5C5"
            contentLines={[
              "Research Topic: ___________",
              "Date: _____ / _____ / _____",
              "Hypothesis: _____________",
              "",
              "[ PDF will be uploaded here ]",
              "",
              "— observations & data",
              "— annotated bibliography",
              "",
              "[ Field Study — add later ]",
              "",
              "diagram →",
              "analysis ↓",
            ]}
            rotateStyle="-1.5deg"
            delay={0.1}
          />
          <PhysicalBook
            title="Essays & Poems"
            spineColor="#D4849A"
            coverColor="#F2C4CE"
            contentLines={[
              "___ — a poem about home",
              "",
              "on belonging",
              "— essay draft",
              "",
              "what objects remember",
              "— personal essay",
              "",
              "[ PDF will be uploaded here ]",
              "",
              "fragments, 2024",
              "— soft things,",
              "  carefully held",
            ]}
            rotateStyle="1.8deg"
            delay={0.22}
          />
        </div>

        {/* Footer label */}
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
          always in the middle of three notebooks at once
        </motion.div>
      </div>
    </div>
  );
}
