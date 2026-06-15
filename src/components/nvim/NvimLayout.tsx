"use client";

import { useState } from "react";
import FileTree from "./FileTree";
import EditorArea from "./EditorArea";
import StatusLine from "./StatusLine";

export default function NvimLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-ctp-base text-ctp-text overflow-hidden">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center bg-ctp-mantle border-b border-ctp-surface0 px-4 shrink-0 h-10">
        <button
          onClick={() => setMobileNavOpen((v) => !v)}
          className="text-ctp-subtext0 hover:text-ctp-text transition-colors mr-3"
          aria-label="Toggle navigation"
        >
          <span className="font-mono text-lg">{mobileNavOpen ? "×" : "☰"}</span>
        </button>
        <span className="text-sm font-mono text-ctp-subtext0">~/ting-lin</span>
      </div>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="md:hidden absolute inset-0 top-10 z-50 flex">
          <div onClick={() => setMobileNavOpen(false)}>
            <FileTree />
          </div>
          <div
            className="flex-1 bg-ctp-crust/60"
            onClick={() => setMobileNavOpen(false)}
          />
        </div>
      )}

      {/* Main area: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop only */}
        <div className="hidden md:flex shrink-0">
          <FileTree />
        </div>

        {/* Content */}
        <EditorArea>{children}</EditorArea>
      </div>

      {/* Status bar */}
      <StatusLine />
    </div>
  );
}
