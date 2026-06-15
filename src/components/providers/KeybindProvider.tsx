"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import WhichKey from "@/components/nvim/WhichKey";
import Telescope from "@/components/nvim/Telescope";
import { navItems } from "@/data/navigation";
import { SITE } from "@/lib/constants";

interface KeybindContextValue {
  telescopeOpen: boolean;
}

const KeybindContext = createContext<KeybindContextValue>({ telescopeOpen: false });
export function useKeybind() { return useContext(KeybindContext); }

const WHICH_KEY_GROUPS = [
  {
    label: "navigate",
    bindings: [
      { key: "h", description: "Home" },
      { key: "a", description: "About" },
      { key: "r", description: "Research" },
      { key: "p", description: "Blog" },
    ],
  },
  {
    label: "tools",
    bindings: [
      { key: "f", description: "Find (Ctrl+P)" },
      { key: "t", description: "Toggle theme" },
      { key: "l", description: "Toggle locale" },
      { key: "?", description: "Help / this panel" },
    ],
  },
  {
    label: "links",
    bindings: [
      { key: "s", description: "Scholar" },
      { key: "b", description: "Lab page" },
    ],
  },
];

export function KeybindProvider({ children }: { children: ReactNode }) {
  const [telescopeOpen, setTelescopeOpen] = useState(false);
  const [whichKeyVisible, setWhichKeyVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs mirror state so the single keydown listener always reads fresh values
  // without needing to re-subscribe on every toggle (which caused dropped keys).
  const whichKeyRef = useRef(false);
  const telescopeRef = useRef(false);
  const leaderTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Gate DOM portal access behind mount to avoid SSR document access.
  // The setState-in-effect is intentional — this is the standard Next.js
  // pattern for client-only portal mounting.
  useEffect(() => { setMounted(true); }, []);

  const showWhichKey = useCallback((v: boolean) => {
    whichKeyRef.current = v;
    setWhichKeyVisible(v);
  }, []);

  const openTelescope = useCallback(() => {
    telescopeRef.current = true;
    setTelescopeOpen(true);
    showWhichKey(false);
  }, [showWhichKey]);

  const closeTelescope = useCallback(() => {
    telescopeRef.current = false;
    setTelescopeOpen(false);
  }, []);

  useEffect(() => {
    const triggerThemeToggle = () =>
      document.dispatchEvent(new CustomEvent("toggle-theme"));
    const triggerLocaleToggle = () =>
      document.dispatchEvent(new CustomEvent("toggle-locale"));

    const armAutoHide = () => {
      if (leaderTimeout.current) clearTimeout(leaderTimeout.current);
      leaderTimeout.current = setTimeout(() => showWhichKey(false), 4000);
    };

    const handler = (e: KeyboardEvent) => {
      // Ignore while typing in a field or when Telescope owns the keyboard.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) return;
      if (telescopeRef.current) return;

      // Telescope: Ctrl+P or Ctrl+K
      if (e.ctrlKey && (e.key === "p" || e.key === "k")) {
        e.preventDefault();
        openTelescope();
        return;
      }

      // Leader key (Space) — toggle the which-key panel.
      if (
        (e.key === " " || e.code === "Space") &&
        !e.ctrlKey && !e.altKey && !e.metaKey
      ) {
        // Don't trigger an activation on a focused link/button.
        if (target) target.blur?.();
        e.preventDefault();
        e.stopPropagation();
        const next = !whichKeyRef.current;
        showWhichKey(next);
        if (next) armAutoHide();
        else if (leaderTimeout.current) clearTimeout(leaderTimeout.current);
        return;
      }

      // After leader: resolve a sub-command.
      if (whichKeyRef.current) {
        if (e.key === "Escape") {
          showWhichKey(false);
          if (leaderTimeout.current) clearTimeout(leaderTimeout.current);
          return;
        }

        const key = e.key.toLowerCase();
        const num = parseInt(e.key, 10);
        const pathMap: Record<string, string> = {
          h: "/", a: "/about", r: "/research",
          p: "/blog",
        };

        const known =
          key === "f" || key === "t" || key === "l" || key === "?" ||
          key === "s" || key === "b" || !!pathMap[key] ||
          (num >= 1 && num <= navItems.length);

        // Only consume the keystroke if it maps to a command; otherwise let it be.
        if (!known) return;

        e.preventDefault();
        showWhichKey(false);
        if (leaderTimeout.current) clearTimeout(leaderTimeout.current);

        if (key === "f") { openTelescope(); return; }
        if (key === "t") { triggerThemeToggle(); return; }
        if (key === "l") { triggerLocaleToggle(); return; }
        if (key === "?") { showWhichKey(true); armAutoHide(); return; }
        if (key === "s") { window.open(SITE.scholar, "_blank"); return; }
        if (key === "b") { window.open(SITE.labUrl, "_blank"); return; }
        if (pathMap[key]) { router.push(pathMap[key]); return; }
        if (num >= 1 && num <= navItems.length) router.push(navItems[num - 1].path);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (leaderTimeout.current) clearTimeout(leaderTimeout.current);
    };
  }, [openTelescope, showWhichKey, router]);

  return (
    <KeybindContext.Provider value={{ telescopeOpen }}>
      {children}
      {mounted &&
        createPortal(
          <WhichKey
            visible={whichKeyVisible}
            onClose={() => showWhichKey(false)}
            groups={WHICH_KEY_GROUPS}
          />,
          document.body
        )}
      {mounted &&
        createPortal(
          <Telescope open={telescopeOpen} onClose={closeTelescope} />,
          document.body
        )}
    </KeybindContext.Provider>
  );
}
