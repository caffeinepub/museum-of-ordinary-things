import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const pages = [
  {
    left: { text: "Add story here", icon: "✶" },
    right: { text: "Insert personal archive", icon: "◊" },
  },
  {
    left: { text: "A memory goes here", icon: "⊙" },
    right: { text: "Field observation", icon: "✶" },
  },
  {
    left: { text: "Story fragment", icon: "◈" },
    right: { text: "Life moment", icon: "✶" },
  },
];

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
        d="M0 24 L0 8 Q40 0 80 10 Q120 18 160 6 Q200 0 240 12 Q270 22 310 8 Q350 0 390 11 Q430 20 470 7 Q510 0 550 13 Q590 22 630 9 Q670 0 710 12 Q750 22 790 8 Q830 0 870 12 Q910 20 950 7 Q990 0 1030 13 Q1070 22 1110 9 Q1150 0 1200 12 L1200 24 Z"
        fill="rgba(245,237,224,0.85)"
      />
    </svg>
  );
}

export function LifeStoriesContent() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (pageIndex < pages.length - 1) {
      setDirection(1);
      setPageIndex((p) => p + 1);
    }
  };
  const goPrev = () => {
    if (pageIndex > 0) {
      setDirection(-1);
      setPageIndex((p) => p - 1);
    }
  };

  const current = pages[pageIndex];

  return (
    <div
      className="grain-overlay"
      style={{
        minHeight: "100vh",
        background: "#F5EDE0",
        position: "relative",
      }}
    >
      <TornEdge />

      {/* Floating annotation */}
      <motion.div
        className="font-handwritten absolute pointer-events-none"
        style={{
          top: "10%",
          right: "4%",
          fontSize: "11px",
          color: "#b8a090",
          transform: "rotate(6deg)",
          opacity: 0.6,
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        personal archive
      </motion.div>
      <motion.div
        className="font-handwritten absolute pointer-events-none"
        style={{
          bottom: "18%",
          left: "3%",
          fontSize: "11px",
          color: "#b8a090",
          transform: "rotate(-5deg)",
          opacity: 0.5,
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        story fragments
      </motion.div>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#8B3A3A",
              letterSpacing: "0.04em",
              marginBottom: "0.3rem",
            }}
          >
            Life Stories
          </h2>
          <div
            className="font-handwritten"
            style={{ fontSize: "1rem", color: "#8a7560", fontStyle: "italic" }}
          >
            — personal archive —
          </div>
        </div>

        {/* Open book */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {/* Prev */}
          <button
            type="button"
            onClick={goPrev}
            disabled={pageIndex === 0}
            style={{
              width: "36px",
              flexShrink: 0,
              background: "rgba(212,165,168,0.18)",
              border: "none",
              borderRadius: "4px 0 0 4px",
              cursor: pageIndex === 0 ? "default" : "pointer",
              opacity: pageIndex === 0 ? 0.28 : 1,
              color: "#8a7560",
              fontSize: "20px",
            }}
            aria-label="Previous page"
            data-ocid="lifestories.pagination_prev"
          >
            ‹
          </button>

          {/* Pages */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              background: "#EFE6D7",
              borderRadius: "1px",
              boxShadow:
                "0 6px 24px rgba(44,35,32,0.16), inset 0 0 28px rgba(0,0,0,0.03)",
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={pageIndex}
                custom={direction}
                style={{ display: "flex", width: "100%" }}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.38, ease: "easeInOut" }}
              >
                {/* Left page */}
                <div
                  className="lined-paper"
                  style={{
                    flex: 1,
                    padding: "20px 16px",
                    borderRight: "1px solid rgba(138,117,96,0.22)",
                    minHeight: "240px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      fontSize: "14px",
                      color: "#D4A5A8",
                      opacity: 0.7,
                    }}
                  >
                    {current.left.icon}
                  </div>
                  <div
                    className="font-handwritten"
                    style={{
                      fontSize: "1rem",
                      color: "#8a7560",
                      marginTop: "28px",
                    }}
                  >
                    {current.left.text}
                  </div>
                  {/* Photo placeholder */}
                  <div
                    style={{
                      marginTop: "16px",
                      width: "80px",
                      height: "96px",
                      border: "2px dashed rgba(212,165,168,0.42)",
                      borderRadius: "2px",
                      background: "rgba(212,165,168,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="font-handwritten"
                      style={{ fontSize: "10px", color: "#b8a090" }}
                    >
                      photo
                    </span>
                  </div>
                  {/* Corner curl */}
                  <div
                    className="page-corner page-corner-right"
                    style={{
                      borderWidth: "0 0 18px 18px",
                      bottom: 0,
                      left: 0,
                      right: "auto",
                    }}
                  />
                </div>

                {/* Spine */}
                <div
                  style={{
                    width: "16px",
                    flexShrink: 0,
                    background:
                      "linear-gradient(to right, rgba(138,117,96,0.32), rgba(138,117,96,0.1))",
                    borderLeft: "1px solid rgba(138,117,96,0.2)",
                    borderRight: "1px solid rgba(138,117,96,0.2)",
                  }}
                />

                {/* Right page */}
                <div
                  className="lined-paper"
                  style={{
                    flex: 1,
                    padding: "20px 16px",
                    minHeight: "240px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      fontSize: "14px",
                      color: "#D4A5A8",
                      opacity: 0.7,
                    }}
                  >
                    {current.right.icon}
                  </div>
                  <div
                    className="font-handwritten"
                    style={{
                      fontSize: "1rem",
                      color: "#8a7560",
                      marginTop: "28px",
                    }}
                  >
                    {current.right.text}
                  </div>
                  <div
                    className="font-handwritten"
                    style={{
                      fontSize: "11px",
                      color: "#b8a090",
                      fontStyle: "italic",
                      marginTop: "10px",
                    }}
                  >
                    — to be filled
                  </div>
                  <div
                    className="font-typewriter"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "14px",
                      fontSize: "11px",
                      color: "#b8a090",
                    }}
                  >
                    {pageIndex + 1}
                  </div>
                  {/* Corner curl */}
                  <div
                    className="page-corner page-corner-right"
                    style={{
                      borderWidth: "0 0 18px 18px",
                      bottom: 0,
                      right: 0,
                      transform: "scaleX(-1)",
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={goNext}
            disabled={pageIndex === pages.length - 1}
            style={{
              width: "36px",
              flexShrink: 0,
              background: "rgba(212,165,168,0.18)",
              border: "none",
              borderRadius: "0 4px 4px 0",
              cursor: pageIndex === pages.length - 1 ? "default" : "pointer",
              opacity: pageIndex === pages.length - 1 ? 0.28 : 1,
              color: "#8a7560",
              fontSize: "20px",
            }}
            aria-label="Next page"
            data-ocid="lifestories.pagination_next"
          >
            ›
          </button>
        </div>

        {/* Page dots */}
        <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
          {pages.map((_, i) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: page dots are positional
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > pageIndex ? 1 : -1);
                setPageIndex(i);
              }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background:
                  i === pageIndex ? "#D4A5A8" : "rgba(212,165,168,0.32)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              aria-label={`Go to page ${i + 1}`}
              data-ocid={`lifestories.item.${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
