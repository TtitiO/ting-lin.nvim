"use client";

import { useEffect } from "react";

interface Binding {
  key: string;
  description: string;
}

interface BindingGroup {
  label: string;
  bindings: Binding[];
}

interface WhichKeyProps {
  visible: boolean;
  onClose: () => void;
  groups: BindingGroup[];
}

export default function WhichKey({ visible, onClose, groups }: WhichKeyProps) {
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      data-overlay="true"
      aria-live="polite"
      role="dialog"
      aria-label="Keyboard shortcuts"
    >
      {/* dim backdrop */}
      <div className="absolute inset-0 bg-ctp-crust/40 pointer-events-auto" onClick={onClose} />
      <div className="relative bg-ctp-mantle border border-ctp-surface1 rounded-sm px-6 py-5 shadow-2xl max-w-xl w-full mx-4 pointer-events-auto ctp-rise">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ctp-surface0">
          <kbd className="px-2 py-1 rounded bg-ctp-surface0 text-ctp-yellow font-mono text-sm font-semibold">Space</kbd>
          <span className="text-xs text-ctp-overlay1">leader key</span>
          <span className="flex-1" />
          <span className="text-xs text-ctp-overlay0 font-mono">which-key</span>
        </div>

        {/* Groups */}
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="text-xs text-ctp-green font-mono mb-2 flex items-center gap-1.5">
                <span className="text-ctp-surface2">+</span>
                <span className="uppercase tracking-wider">{group.label}</span>
                <span className="flex-1 border-b border-ctp-surface0 ml-2 opacity-50" />
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 pl-5">
                {group.bindings.map((b) => (
                  <div key={b.key} className="flex items-center gap-2.5 text-xs">
                    <kbd className="px-2 py-0.5 rounded bg-ctp-surface0 text-ctp-blue font-mono text-xs min-w-[2rem] text-center shrink-0">
                      {b.key}
                    </kbd>
                    <span className="text-ctp-subtext1">{b.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-4 pt-3 border-t border-ctp-surface0 text-xs text-ctp-overlay0 font-mono">
          press key to act · <kbd className="px-1.5 py-0.5 rounded bg-ctp-surface0 text-xs">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}
