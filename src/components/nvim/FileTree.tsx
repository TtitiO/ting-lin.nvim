"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, type NavItem } from "@/data/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  IconHome,
  IconPerson,
  IconBeaker,
  IconBlog,
} from "@/components/icons/CatppuccinIcons";

const iconMap = {
  home: IconHome,
  person: IconPerson,
  beaker: IconBeaker,
  blog: IconBlog,
} as const;

function NavIcon({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = iconMap[item.iconName];
  return <Icon color={active ? item.color : undefined} />;
}

export default function FileTree() {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <nav
      className="flex flex-col bg-ctp-mantle border-r border-ctp-surface0 overflow-y-auto shrink-0 py-4"
      style={{ width: "200px", minWidth: "200px" }}
      aria-label="Site navigation"
    >
      {/* Profile mini-header */}
      <div className="px-4 mb-4">
        <div className="text-sm font-semibold text-ctp-lavender">
          {SITE.name}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 mb-3 border-t border-ctp-surface0" />

      {/* Nav items */}
      <div className="flex flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-2.5 px-3 py-2 rounded-sm transition-all duration-150 relative",
                active
                  ? "text-ctp-text bg-ctp-surface0/50"
                  : "text-ctp-overlay1 hover:text-ctp-text hover:bg-ctp-surface0/30"
              )}
            >
              {/* Active indicator — left bar */}
              <span
                className={cn(
                  "absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-all duration-150",
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                )}
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />

              {/* Catppuccin SVG icon */}
              <span className={cn("shrink-0 transition-transform duration-150", active ? "scale-110" : "group-hover:scale-105")}>
                <NavIcon item={item} active={active} />
              </span>

              {/* Label */}
              <span className={cn("text-sm", active && "font-medium")}>
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
