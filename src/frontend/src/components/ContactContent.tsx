import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  AntiquePaperFrame,
  HandwrittenAnnotation,
  MapFragment,
  PaperTag,
  TornPaperScrap,
  WatercolorWash,
} from "./ScrapbookDecorations";

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
  color = "rgba(180,140,110,0.8)",
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
          fontSize: "7px",
          letterSpacing: "0.18em",
          color,
          padding: "6px 10px",
          border: "2px solid rgba(180,140,110,0.4)",
          borderRadius: "50%",
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
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
        stroke="rgba(180,140,110,0.7)"
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

// ─── Envelope flap SVG ──────────────────────────────────────────────────────────

function EnvelopeFlap({ width }: { width: number }) {
  const h = Math.round(width * 0.38);
  const mid = Math.round(width / 2);
  return (
    <svg
      width={width}
      height={h}
      viewBox={`0 0 ${width} ${h}`}
      fill="none"
      aria-hidden="true"
      style={{ display: "block", marginBottom: "-2px" }}
    >
      {/* Flap body */}
      <path
        d={`M0 ${h} L${mid} 0 L${width} ${h} Z`}
        fill="#F0E2CE"
        stroke="rgba(180,150,110,0.25)"
        strokeWidth="1.5"
      />
      {/* Flap crease center line */}
      <line
        x1={mid}
        y1={0}
        x2={mid}
        y2={h}
        stroke="rgba(180,150,110,0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

// ─── Wax seal ───────────────────────────────────────────────────────────────────

function WaxSeal({ style }: { style?: React.CSSProperties }) {
  const [clicked, setClicked] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 600);
      }}
      style={{
        position: "relative",
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 38% 38%, rgba(212,132,154,0.85), rgba(180,80,100,0.75))",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "0 3px 10px rgba(180,80,100,0.3), inset 0 1px 3px rgba(255,255,255,0.2)",
        ...style,
      }}
      animate={
        clicked ? { scale: [1, 1.2, 0.9, 1], rotate: [0, 8, -6, 0] } : {}
      }
      transition={{ duration: 0.4 }}
      aria-label="Wax seal decoration"
    >
      <span
        style={{
          fontFamily: "'PinyonScript', cursive",
          fontSize: "18px",
          color: "rgba(255,240,245,0.9)",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        S
      </span>
    </motion.button>
  );
}

// ─── Postal stamp ─────────────────────────────────────────────────────────────────

function PostalStamp({
  label,
  subLabel,
  bg = "rgba(197,213,197,0.35)",
  borderColor = "rgba(157,184,157,0.5)",
  rotate = "0deg",
  style,
}: {
  label: string;
  subLabel?: string;
  bg?: string;
  borderColor?: string;
  rotate?: string;
  style?: React.CSSProperties;
}) {
  const [stamped, setStamped] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => {
        setStamped(true);
        setTimeout(() => setStamped(false), 500);
      }}
      style={{
        background: bg,
        border: `2px solid ${borderColor}`,
        borderRadius: "2px",
        padding: "5px 9px",
        cursor: "pointer",
        transform: `rotate(${rotate})`,
        boxShadow: "1px 2px 6px rgba(0,0,0,0.1)",
        ...style,
      }}
      animate={
        stamped
          ? {
              scale: [1, 1.15, 0.93, 1],
              rotate: [
                Number.parseFloat(rotate),
                Number.parseFloat(rotate) + 8,
                Number.parseFloat(rotate) - 4,
                Number.parseFloat(rotate),
              ],
            }
          : {}
      }
      transition={{ duration: 0.4 }}
    >
      <div
        className="font-typewriter"
        style={{
          fontSize: "7px",
          letterSpacing: "0.22em",
          color: "rgba(61,43,43,0.7)",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {label}
        {subLabel && (
          <div style={{ fontSize: "6px", opacity: 0.7, marginTop: "1px" }}>
            {subLabel}
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ─── Postmark circle ──────────────────────────────────────────────────────────

function Postmark({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0.45, ...style }}
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="rgba(180,140,110,0.7)"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="22"
        stroke="rgba(180,140,110,0.4)"
        strokeWidth="1"
        fill="none"
      />
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fill="rgba(180,140,110,0.8)"
        fontSize="6"
        fontFamily="'Courier New', monospace"
        letterSpacing="2"
      >
        VIA AIRMAIL
      </text>
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fill="rgba(180,140,110,0.7)"
        fontSize="5"
        fontFamily="'Courier New', monospace"
        letterSpacing="1"
      >
        2026
      </text>
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fill="rgba(180,140,110,0.6)"
        fontSize="5"
        fontFamily="'Courier New', monospace"
        letterSpacing="1"
      >
        INDIA
      </text>
    </svg>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function ContactContent() {
  return (
    <div
      className="grain-overlay"
      style={{
        minHeight: "100vh",
        background: "#F5ECD8",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ─── Scrapbook Decorations ─── */}
      <WatercolorWash
        color="rgba(242,196,206,0.2)"
        style={{ top: "10%", right: "5%", zIndex: 0 }}
      />
      <MapFragment style={{ bottom: "15%", left: "2%", zIndex: 0 }} />
      <TornPaperScrap
        variant={1}
        style={{
          bottom: "-10px",
          left: "10%",
          transform: "rotate(2deg)",
          opacity: 0.55,
          zIndex: 1,
        }}
        color="rgba(245,236,216,0.75)"
      />
      <TornPaperScrap
        variant={3}
        style={{
          top: "5%",
          right: "-10px",
          transform: "rotate(-8deg)",
          opacity: 0.45,
          zIndex: 1,
        }}
        color="rgba(242,196,206,0.5)"
      />
      <HandwrittenAnnotation
        text="✉ write back"
        rotate={-5}
        style={{
          top: "5%",
          left: "4%",
          color: "rgba(180,140,110,0.5)",
          fontSize: "12px",
        }}
      />
      <HandwrittenAnnotation
        text="with care"
        rotate={7}
        style={{
          bottom: "8%",
          right: "4%",
          color: "rgba(180,140,110,0.45)",
          fontSize: "11px",
        }}
      />
      <PaperTag
        text="reply to:"
        style={{
          top: "20%",
          left: "1.5%",
          transform: "rotate(-4deg)",
          zIndex: 3,
        }}
      />

      {/* Floating annotations */}
      <ClickRevealNote
        note="drop a line"
        style={{ position: "absolute", top: "8%", left: "5%" }}
      >
        <motion.div
          className="font-handwritten"
          style={{
            fontSize: "12px",
            color: "rgba(180,140,110,0.6)",
            transform: "rotate(-6deg)",
            opacity: 0.65,
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          drop a line
        </motion.div>
      </ClickRevealNote>

      <motion.div
        className="font-handwritten absolute pointer-events-none"
        style={{
          top: "14%",
          right: "5%",
          fontSize: "11px",
          color: "rgba(180,140,110,0.55)",
          transform: "rotate(7deg)",
          opacity: 0.55,
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        always open
      </motion.div>

      <motion.span
        className="font-handwritten absolute pointer-events-none"
        style={{
          bottom: "20%",
          right: "6%",
          fontSize: "18px",
          color: "#E8B4C0",
          opacity: 0.45,
        }}
        animate={{ opacity: [0.25, 0.65, 0.25] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        ✶
      </motion.span>

      {/* Extra arrow doodle */}
      <motion.svg
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{ bottom: "30%", left: "5%", opacity: 0.3 }}
        width="40"
        height="32"
        viewBox="0 0 40 32"
        fill="none"
        animate={{ x: [0, 4, 0] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <path
          d="M4 16 Q20 4 36 16"
          stroke="#E8B4C0"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M32 12 L36 16 L30 18"
          stroke="#E8B4C0"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.svg>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Outer envelope container */}
        <motion.div
          style={{
            width: "100%",
            maxWidth: "540px",
            position: "relative",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* Envelope flap at top */}
          <EnvelopeFlap width={540} />

          {/* Envelope body */}
          <div
            style={{
              background: "#FAF0E0",
              border: "1.5px solid rgba(180,150,110,0.22)",
              borderTop: "none",
              padding: "0 0 0.5rem",
              position: "relative",
              boxShadow: "4px 6px 24px rgba(61,43,43,0.12)",
            }}
          >
            {/* Envelope diagonal fold lines (bottom corners) */}
            <svg
              width="100%"
              height="30"
              viewBox="0 0 540 30"
              fill="none"
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                pointerEvents: "none",
                opacity: 0.3,
              }}
            >
              <line
                x1="0"
                y1="30"
                x2="270"
                y2="0"
                stroke="rgba(180,150,110,0.6)"
                strokeWidth="1"
              />
              <line
                x1="540"
                y1="30"
                x2="270"
                y2="0"
                stroke="rgba(180,150,110,0.6)"
                strokeWidth="1"
              />
            </svg>

            {/* Inner letter card — tilted -2deg */}
            <AntiquePaperFrame size={26} style={{ zIndex: 4 }} />
            <motion.div
              style={{
                background: "#FFF8F0",
                margin: "1.5rem 1.2rem",
                padding: "1.8rem 1.8rem 1.5rem",
                transform: "rotate(-2deg)",
                boxShadow:
                  "2px 4px 14px rgba(61,43,43,0.1), inset 0 0 0 1px rgba(180,150,110,0.1)",
                borderRadius: "2px",
                position: "relative",
                // Fold mark corners
                borderBottomRightRadius: "2px",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Lined paper background */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 27px, rgba(180,150,110,0.1) 27px, rgba(180,150,110,0.1) 28px)",
                  borderRadius: "2px",
                  pointerEvents: "none",
                }}
              />

              {/* Paper clip */}
              <PaperClip
                style={{
                  top: "40px",
                  left: "-12px",
                  transform: "rotate(-15deg)",
                }}
              />

              {/* Top-right postage stamp area */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "16px",
                  display: "flex",
                  gap: "6px",
                  alignItems: "flex-start",
                }}
              >
                <PostalStamp
                  label="AIRMAIL"
                  subLabel="PAR AVION"
                  bg="rgba(242,196,206,0.45)"
                  borderColor="rgba(212,132,154,0.4)"
                  rotate="-2deg"
                />
                <PostalStamp
                  label="PRIORITY"
                  subLabel="MAIL"
                  bg="rgba(197,213,197,0.4)"
                  borderColor="rgba(157,184,157,0.45)"
                  rotate="1.5deg"
                />
              </div>

              {/* Postmark */}
              <Postmark
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0.35,
                }}
              />

              {/* Letter body */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  paddingTop: "2.5rem",
                }}
              >
                {/* Handwritten greeting */}
                <motion.div
                  className="font-handwritten"
                  style={{
                    fontSize: "1.15rem",
                    color: "#5a4040",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                  }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  dear visitor,
                </motion.div>

                {/* Email */}
                <motion.a
                  href="mailto:shreetiagarwal82@gmail.com"
                  className=""
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                    fontWeight: 600,
                    color: "#3D2B2B",
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "1.4rem",
                    lineHeight: 1.3,
                    fontFamily: "Inter, Helvetica, sans-serif",
                    letterSpacing: "0.01em",
                  }}
                  whileHover={{ letterSpacing: "0.04em", color: "#EBBEC8" }}
                  transition={{ duration: 0.2 }}
                  data-ocid="contact.link"
                >
                  shreetiagarwal82@gmail.com
                </motion.a>

                {/* Divider */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(180,150,110,0.25)",
                    }}
                  />
                  <span
                    className="font-handwritten"
                    style={{
                      fontSize: "1.1rem",
                      color: "rgba(180,150,110,0.5)",
                    }}
                  >
                    ✶
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(180,150,110,0.25)",
                    }}
                  />
                </div>

                {/* Placeholder socials */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <motion.a
                    href="https://www.instagram.com/spillshreetea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-handwritten"
                    style={{
                      fontSize: "1rem",
                      color: "#6a5a55",
                      fontStyle: "italic",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    whileHover={{ color: "#D4849A", x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{ fontSize: "13px", opacity: 0.7 }}>◎</span>
                    instagram — @spillshreetea
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/shreeti-agrawal-8799ba382"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-handwritten"
                    style={{
                      fontSize: "1rem",
                      color: "#6a5a55",
                      fontStyle: "italic",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    whileHover={{ color: "#D4849A", x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        opacity: 0.7,
                      }}
                    >
                      in
                    </span>
                    linkedin — Shreeti Agrawal
                  </motion.a>
                </div>

                {/* Closing */}
                <motion.div
                  className="font-handwritten"
                  style={{
                    fontSize: "1rem",
                    color: "#5a4040",
                    fontStyle: "italic",
                    marginTop: "1.2rem",
                    textAlign: "right",
                    paddingRight: "0.5rem",
                  }}
                  animate={{ opacity: [0.5, 0.95, 0.5] }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  — with warmth, Shreeti
                </motion.div>

                {/* Wax seal bottom-left */}
                <WaxSeal
                  style={{
                    position: "absolute",
                    bottom: "-26px",
                    left: "0",
                  }}
                />
              </div>
            </motion.div>

            {/* Extra stamp row below letter */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                paddingBottom: "1rem",
                paddingTop: "0.3rem",
              }}
            >
              <PostalStamp
                label="FIRST CLASS"
                bg="rgba(245,237,218,0.6)"
                borderColor="rgba(180,150,110,0.35)"
                rotate="-1.5deg"
              />
              <ClickableStamp
                label="SEND A NOTE"
                revealText="shreetiagarwal82@gmail.com ✶"
                color="rgba(180,140,110,0.8)"
                style={{ borderRadius: "2px", width: "auto", height: "auto" }}
              />
              <PostalStamp
                label="WITH CARE"
                bg="rgba(242,196,206,0.35)"
                borderColor="rgba(212,132,154,0.35)"
                rotate="2deg"
              />
            </div>
          </div>
        </motion.div>

        {/* Sticky note */}
        <StickyNote
          text="reach out ↓"
          bg="rgba(242,196,206,0.72)"
          rotate="-4deg"
          style={{
            position: "absolute",
            bottom: "25%",
            right: "3%",
            zIndex: 4,
          }}
        />

        {/* Footer */}
        <div
          style={{
            marginTop: "2.5rem",
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            color: "rgba(61,43,43,0.38)",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(61,43,43,0.38)", textDecoration: "none" }}
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </div>
  );
}
