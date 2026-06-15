// Catppuccin-style SVG icons for the sidebar navigation
// Inspired by catppuccin/vscode-icons — simple, colorful, clean

import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  color?: string;
}

// Markdown file icon (for content pages)
export function IconMarkdown({ className, color }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 16 16" fill="none">
      <path d="M3 1.5h7l3 3v10a1 1 0 01-1 1H3a1 1 0 01-1-1v-13a1 1 0 011-1z" stroke={color || "currentColor"} strokeWidth="1.2" fill="none"/>
      <path d="M10 1.5v3h3" stroke={color || "currentColor"} strokeWidth="1.2" fill="none"/>
      <path d="M5 9l1.5-2L8 9m2-2v4m0 0l-1-1.5m1 1.5l1-1.5" stroke={color || "currentColor"} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Home icon
export function IconHome({ className, color }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 16 16" fill="none">
      <path d="M2 8l6-5.5L14 8" stroke={color || "currentColor"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 9v4.5a1 1 0 001 1h7a1 1 0 001-1V9" stroke={color || "currentColor"} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M6 14.5v-3.5a1 1 0 011-1h2a1 1 0 011 1v3.5" stroke={color || "currentColor"} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

// Person/about icon
export function IconPerson({ className, color }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="2.5" stroke={color || "currentColor"} strokeWidth="1.3"/>
      <path d="M3.5 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke={color || "currentColor"} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

// Beaker/research icon
export function IconBeaker({ className, color }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 16 16" fill="none">
      <path d="M5.5 2v4L3 12.5a1 1 0 001 1.5h8a1 1 0 001-1.5L10.5 6V2" stroke={color || "currentColor"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 2h7" stroke={color || "currentColor"} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M4 10h8" stroke={color || "currentColor"} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

// Newspaper/news icon
export function IconNews({ className, color }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2.5" width="10" height="11" rx="1" stroke={color || "currentColor"} strokeWidth="1.2"/>
      <path d="M12 5.5h1.5a.5.5 0 01.5.5v7a1 1 0 01-1 1" stroke={color || "currentColor"} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M4.5 5.5h5M4.5 8h3M4.5 10.5h5" stroke={color || "currentColor"} strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

// Pencil/blog icon
export function IconBlog({ className, color }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 16 16" fill="none">
      <path d="M11.5 2.5l2 2-8 8H3.5v-2z" stroke={color || "currentColor"} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M9.5 4.5l2 2" stroke={color || "currentColor"} strokeWidth="1.2"/>
      <path d="M3 13.5h10" stroke={color || "currentColor"} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

// Mail/contact icon
export function IconMail({ className, color }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke={color || "currentColor"} strokeWidth="1.3"/>
      <path d="M2.5 4.5l5.5 4 5.5-4" stroke={color || "currentColor"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
