"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { navItems } from "@/data/navigation";

export default function StatusLine() {
  const pathname = usePathname();
  const { theme, toggle: toggleTheme } = useTheme();
  const { locale, toggle: toggleLocale } = useLocale();

  const current = navItems.find((n) => n.path === pathname);

  return (
    <div
      className="flex items-stretch bg-ctp-crust border-t border-ctp-surface0 text-xs shrink-0 select-none h-7"
      aria-label="Site footer bar"
    >
      {/* Left: section name */}
      <div className="flex items-center gap-2 px-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: current?.color }}
          aria-hidden="true"
        />
        <span className="text-ctp-subtext1 font-mono">
          {current?.displayName ?? "~"}
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: locale + theme */}
      <div className="flex items-stretch divide-x divide-ctp-surface0">
        <button
          onClick={toggleLocale}
          className="flex items-center px-3 text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors"
          title="Toggle language / 切换语言"
        >
          {locale === "en" ? "EN" : "中"}
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center px-3 text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors"
          title={theme === "mocha" ? "Switch to light (Latte)" : "Switch to dark (Mocha)"}
          aria-label="Toggle theme"
        >
          {theme === "mocha" ? "☾ mocha" : "☀ latte"}
        </button>
      </div>
    </div>
  );
}
