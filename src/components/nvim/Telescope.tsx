"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { bufferTabs } from "@/data/navigation";
import { publications } from "@/data/publications";

interface SearchResult {
  label: string;
  sublabel?: string;
  path: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = bufferTabs.map((t) => ({
    label: t.filename,
    sublabel: "Page",
    path: t.path,
  }));
  publications.forEach((p) => {
    results.push({
      label: p.title.slice(0, 60) + (p.title.length > 60 ? "…" : ""),
      sublabel: `${p.year} · ${p.venue.split(" ").slice(0, 3).join(" ")}`,
      path: "/research",
    });
  });
  return results;
}

interface TelescopeProps {
  open: boolean;
  onClose: () => void;
}

export default function Telescope({ open, onClose }: TelescopeProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const index = buildIndex();

  const filtered = query.trim()
    ? index.filter((r) =>
        r.label.toLowerCase().includes(query.toLowerCase()) ||
        (r.sublabel ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : index;

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        const item = filtered[selected];
        if (item) {
          router.push(item.path);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, router, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      data-overlay="true"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ctp-crust/70" aria-hidden="true" />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl bg-ctp-mantle border border-ctp-surface1 rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Find file"
      >
        {/* Prompt */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-ctp-surface1">
          <span className="text-ctp-blue text-sm">Find Files</span>
          <span className="text-ctp-overlay0 text-xs ml-auto">
            {filtered.length} results
          </span>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-ctp-surface0">
          <span className="text-ctp-peach text-sm" aria-hidden="true">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search pages and publications…"
            className="flex-1 bg-transparent text-ctp-text text-sm outline-none placeholder:text-ctp-overlay0"
          />
        </div>

        {/* Results */}
        <div className="max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-xs text-ctp-overlay0">No results</div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={`${item.path}-${i}`}
                className={`w-full flex items-start gap-3 px-4 py-2 text-left transition-colors ${
                  i === selected ? "bg-ctp-surface0" : "hover:bg-ctp-surface0"
                }`}
                onClick={() => { router.push(item.path); onClose(); }}
              >
                <span className="text-ctp-blue text-xs mt-0.5">●</span>
                <span>
                  <span className="text-sm text-ctp-text">{item.label}</span>
                  {item.sublabel && (
                    <span className="block text-xs text-ctp-overlay1 mt-0.5">
                      {item.sublabel}
                    </span>
                  )}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
