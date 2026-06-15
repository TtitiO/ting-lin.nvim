"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface WindowProps {
	/** Stable id used for drag reordering. */
	id: string;
	/** Winbar label (the "filename" shown in the title bar). */
	title: string;
	/** Glyph shown before the title. */
	icon?: string;
	/** Accent color for the icon + active border. */
	accent?: string;
	/** Optional link target for the title (opens the matching page). */
	href?: string;
	children: ReactNode;
	className?: string;
	/** When set, the body becomes a fixed-height independently scrolling pane. */
	scrollBody?: boolean;
	/** Max body height (Tailwind class) when scrollBody is on. */
	bodyMaxH?: string;

	// Drag wiring (supplied by the parent grid)
	active?: boolean;
	dragging?: boolean;
	dropTarget?: boolean;
	/** When false, the titlebar becomes non-draggable. */
	draggable?: boolean;
	onDragStart?: () => void;
	onDragEnter?: () => void;
	onDrop?: () => void;
	onDragEnd?: () => void;
	onFocusWindow?: () => void;
}

export default function Window({
	title,
	icon = "",
	accent = "var(--ctp-blue)",
	href,
	children,
	className,
	scrollBody = false,
	bodyMaxH = "max-h-72",
	active = false,
	dragging = false,
	dropTarget = false,
	draggable = true,
	onDragStart,
	onDragEnter,
	onDrop,
	onDragEnd,
	onFocusWindow,
}: WindowProps) {
	const titlebarClassName = cn(
		"flex items-center gap-2 px-3 h-8 shrink-0 select-none",
		draggable ? "cursor-grab active:cursor-grabbing" : "cursor-default",
		"border-b border-ctp-surface0 bg-ctp-crust/40 transition-colors duration-200 group-hover:bg-ctp-crust/65",
	);

	const startDrag = (e: React.DragEvent<HTMLElement>) => {
		if (!draggable) return;
		e.dataTransfer.effectAllowed = "move";
		onDragStart?.();
	};

	// Shared titlebar content — used for both Link and button renders.
	const titlebarContent = (
		<>
			<span
				className="text-ctp-overlay0 text-xs font-mono leading-none tracking-tighter"
				aria-hidden="true"
			>
				⠿
			</span>
			<span
				className="text-sm font-mono leading-none"
				style={{ color: accent }}
				aria-hidden="true"
			>
				{icon}
			</span>
			<span className="text-xs font-mono text-ctp-subtext0 hover:text-ctp-text transition-colors lowercase tracking-wide">
				{title}
			</span>
			<span className="flex-1" />
			<span
				className={cn(
					"text-xs font-mono transition-opacity duration-200",
					active
						? "opacity-100 text-ctp-overlay1"
						: "opacity-0 text-ctp-overlay1 group-hover:opacity-100",
				)}
				aria-hidden="true"
			>
				{scrollBody ? "↕" : "◦"}
			</span>
		</>
	);

	return (
		<fieldset
			aria-label={title}
			onDragEnter={(e) => {
				e.preventDefault();
				onDragEnter?.();
			}}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				e.preventDefault();
				onDrop?.();
			}}
			className={cn(
				"group flex flex-col bg-ctp-mantle border rounded-sm overflow-hidden relative h-full w-full",
				"transition-[border-color,box-shadow,transform,opacity] duration-200 hover:-translate-y-0.5",
				active ? "border-ctp-surface2" : "border-ctp-surface1",
				dragging && "opacity-50 scale-[0.98]",
				dropTarget && "ring-2 ring-ctp-blue/60 ring-offset-0",
				className,
			)}
			style={{
				boxShadow: active
					? "0 4px 16px 0 rgba(0,0,0,0.28)"
					: "0 2px 8px 0 rgba(0,0,0,0.18)",
			}}
		>
			{/* Active-split accent line (nvim-style focused window) */}
			<div
				className="absolute top-0 left-0 right-0 h-px transition-opacity duration-200"
				style={{ backgroundColor: accent, opacity: active ? 0.9 : 0.35 }}
			/>

			{/* Winbar — draggable handle */}
			{href ? (
				<Link
					href={href}
					draggable={draggable}
					onFocus={() => onFocusWindow?.()}
					onMouseEnter={() => onFocusWindow?.()}
					onDragStart={startDrag}
					onDragEnd={() => onDragEnd?.()}
					className={titlebarClassName}
				>
					{titlebarContent}
				</Link>
			) : (
				<button
					type="button"
					draggable={draggable}
					onFocus={() => onFocusWindow?.()}
					onMouseEnter={() => onFocusWindow?.()}
					onDragStart={startDrag}
					onDragEnd={() => onDragEnd?.()}
					className={titlebarClassName}
				>
					{titlebarContent}
				</button>
			)}

			{/* Body */}
			<div
				className={cn(
					"flex-1 px-5 py-4",
					scrollBody && cn("overflow-y-auto", bodyMaxH),
				)}
			>
				{children}
			</div>
		</fieldset>
	);
}
