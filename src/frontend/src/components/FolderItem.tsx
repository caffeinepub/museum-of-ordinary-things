import { motion } from "motion/react";
import type { ReactNode } from "react";

export interface FolderConfig {
  id: string;
  label: string;
  subtitle: string;
  bgColor: string;
  tabColor: string;
  folderImage: string;
  content: ReactNode;
  ocid: string;
}

interface FolderItemProps {
  folder: FolderConfig;
  onOpen: () => void;
  index: number;
}

export function FolderItem({ folder, onOpen, index }: FolderItemProps) {
  return (
    <motion.div
      layoutId={`folder-body-${folder.id}`}
      className="folder-item"
      style={{
        width: "clamp(200px, 22vw, 260px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        rotate: 1,
        scale: 1.05,
        transition: { type: "spring", stiffness: 280, damping: 22 },
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${folder.label} folder`}
        data-ocid={folder.ocid}
        style={{
          background: "transparent",
          border: "none",
          padding: "0",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}
      >
        {/* Folder image */}
        <div
          style={{
            width: "100%",
            position: "relative",
            filter:
              "drop-shadow(0 8px 24px rgba(100,70,70,0.18)) drop-shadow(0 2px 6px rgba(100,70,70,0.10))",
            transition: "filter 0.3s ease",
          }}
          className="folder-img-wrap"
        >
          <img
            src={folder.folderImage}
            alt={folder.label}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              maxHeight: "200px",
            }}
          />
        </div>

        {/* Folder label */}
        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
            padding: "0 4px",
          }}
        >
          <div
            className="folder-tab-label"
            style={{
              fontSize: "clamp(18px, 2.2vw, 24px)",
              color: "#3D2B2B",
              lineHeight: 1.1,
              letterSpacing: "0",
            }}
          >
            {folder.label}
          </div>
          {folder.subtitle && (
            <div
              style={{
                fontSize: "11px",
                color: "rgba(61, 43, 43, 0.55)",
                fontFamily: "Inter, sans-serif",
                marginTop: "3px",
                letterSpacing: "0.04em",
              }}
            >
              {folder.subtitle}
            </div>
          )}
        </div>
      </button>
    </motion.div>
  );
}
