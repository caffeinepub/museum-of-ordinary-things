import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { AboutContent } from "./components/AboutContent";
import { ContactContent } from "./components/ContactContent";
import { FilmContent } from "./components/FilmContent";
import { type FolderConfig, FolderItem } from "./components/FolderItem";
import { ProjectsContent } from "./components/ProjectsContent";
import { ResearchContent } from "./components/ResearchContent";

// ─── Folder definitions ─────────────────────────────────────────────────────────────────

function buildFolders(): FolderConfig[] {
  return [
    {
      id: "projects",
      label: "Projects",
      subtitle: "blogs & archives",
      bgColor: "#FDF0F4",
      tabColor: "#F2C4CE",
      folderImage:
        "/assets/generated/folder-gingham-pink-transparent.dim_400x340.png",
      content: <ProjectsContent />,
      ocid: "projects.open_modal_button",
    },
    {
      id: "film",
      label: "Film",
      subtitle: "documentary — 2025",
      bgColor: "#EFF5EE",
      tabColor: "#C5D5C5",
      folderImage:
        "/assets/generated/folder-floral-sage-transparent.dim_400x340.png",
      content: <FilmContent />,
      ocid: "film.open_modal_button",
    },
    {
      id: "research",
      label: "Research & Writing",
      subtitle: "field notes",
      bgColor: "#FBF5EC",
      tabColor: "#F0E6D3",
      folderImage:
        "/assets/generated/folder-linen-beige-transparent.dim_400x340.png",
      content: <ResearchContent />,
      ocid: "research.open_modal_button",
    },
    {
      id: "about",
      label: "About",
      subtitle: "Shreeti Agrawal",
      bgColor: "#FDF0F4",
      tabColor: "#EBBEC8",
      folderImage:
        "/assets/generated/folder-stripe-rose-transparent.dim_400x340.png",
      content: <AboutContent />,
      ocid: "about.open_modal_button",
    },
    {
      id: "contact",
      label: "Contact",
      subtitle: "send a note",
      // Fixed: warm cream/beige instead of green
      bgColor: "#FBF5EC",
      tabColor: "#F0E6D3",
      folderImage:
        "/assets/generated/folder-linen-beige-transparent.dim_400x340.png",
      content: <ContactContent />,
      ocid: "contact.open_modal_button",
    },
  ];
}

// ─── Full-screen folder overlay ───────────────────────────────────────────────────────

function FolderOverlay({
  folder,
  onClose,
}: {
  folder: FolderConfig;
  onClose: () => void;
}) {
  return (
    <motion.div
      layoutId={`folder-body-${folder.id}`}
      className="fullscreen-folder"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: folder.bgColor,
      }}
      initial={{ borderRadius: 16 }}
      animate={{ borderRadius: 0 }}
      exit={{ opacity: 0, scale: 0.96, borderRadius: 16 }}
      transition={{ duration: 0.48, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Paper grain */}
      <div
        className="paper-texture"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: folder.tabColor,
          borderBottom: "1px solid rgba(61,43,43,0.10)",
          boxShadow: "0 2px 12px rgba(61,43,43,0.10)",
        }}
      >
        <span
          className="folder-tab-label"
          style={{
            color: "#3D2B2B",
            fontSize: "22px",
          }}
        >
          {folder.label}
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "rgba(61,43,43,0.08)",
            border: "1.5px solid rgba(61,43,43,0.16)",
            borderRadius: "4px",
            padding: "5px 14px",
            color: "#3D2B2B",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.06em",
          }}
          data-ocid={`${folder.id}.close_button`}
          aria-label="Close folder"
        >
          × close
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "calc(100vh - 56px)",
        }}
      >
        {folder.content}
      </div>
    </motion.div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const folders = buildFolders();

  const openFolderData = folders.find((f) => f.id === openFolder) ?? null;

  const handleOpen = useCallback((folderId: string) => {
    setOpenFolder(folderId);
  }, []);

  const handleClose = useCallback(() => {
    setOpenFolder(null);
  }, []);

  const topRow = folders.slice(0, 3);
  const bottomRow = folders.slice(3, 5);

  return (
    <div
      className="relative"
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      {/* Soft beige paper background */}
      <div className="paper-bg" />
      <div className="paper-overlay" />

      {/* Main scrollable area */}
      <div
        className="relative z-20"
        style={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(180,150,130,0.3) transparent",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            minHeight: "100vh",
            paddingBottom: "2.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          {/* Page title */}
          <motion.div
            style={{
              textAlign: "center",
              paddingTop: "clamp(1.5rem, 4vh, 3.5rem)",
            }}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h1
              style={{
                fontFamily: "'PrettyOnTheInside', cursive",
                fontSize: "clamp(5rem, 12vw, 10rem)",
                color: "#3D2B2B",
                lineHeight: 1.05,
                margin: "0 0 0.2rem",
                letterSpacing: "0.01em",
                textShadow:
                  "1px 2px 0 rgba(255,255,255,0.5), 0 4px 18px rgba(61,43,43,0.10)",
              }}
            >
              Shreeti Agrawal
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(0.8rem, 1.6vw, 1.05rem)",
                color: "rgba(61,43,43,0.60)",
                fontStyle: "italic",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              student researcher &amp; storyteller
            </p>
          </motion.div>

          {/* Folder grid */}
          <motion.div
            style={{
              width: "100%",
              maxWidth: "900px",
              marginTop: "clamp(1.5rem, 4vh, 3rem)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Row 1: 3 folders */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(1.5rem, 3vw, 3rem)",
                flexWrap: "wrap",
                marginBottom: "clamp(1rem, 2.5vh, 2rem)",
              }}
            >
              {topRow.map((folder, index) => (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  onOpen={() => handleOpen(folder.id)}
                  index={index}
                />
              ))}
            </div>

            {/* Row 2: 2 folders centered */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(1.5rem, 3vw, 3rem)",
                flexWrap: "wrap",
              }}
            >
              {bottomRow.map((folder, index) => (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  onOpen={() => handleOpen(folder.id)}
                  index={index + 3}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom attribution */}
          <motion.div
            style={{
              marginTop: "clamp(1rem, 3vh, 2rem)",
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              textAlign: "center",
              color: "rgba(61,43,43,0.38)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
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
          </motion.div>
        </div>
      </div>

      {/* Full-screen folder overlay */}
      <AnimatePresence>
        {openFolderData && (
          <FolderOverlay
            key={openFolderData.id}
            folder={openFolderData}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}
