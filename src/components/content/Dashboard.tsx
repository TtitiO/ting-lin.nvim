"use client";

import { useState } from "react";
import Window from "@/components/nvim/Window";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SITE } from "@/lib/constants";
import CommandGreeting from "./CommandGreeting";
import {
	BlogBody,
	NewsBody,
	ProfileBody,
	PublicationsBody,
} from "./DashboardCards";

type WinId = "profile" | "news" | "publications" | "blog";

interface WinDef {
	id: WinId;
	icon: string;
	accent: string;
	href?: string;
	titleEn: string;
	titleZh: string;
	scrollBody?: boolean;
	/** column span on the md grid (1 or 2) */
	span: 1 | 2;
	/** min height class so windows can differ in size */
	minH: string;
}

const WINDOWS: Record<WinId, WinDef> = {
	profile: {
		id: "profile",
		icon: "",
		accent: "var(--ctp-lavender)",
		href: "/about",
		titleEn: "profile.md",
		titleZh: "profile.md",
		span: 2,
		minH: "min-h-[20rem]",
	},
	publications: {
		id: "publications",
		icon: "◈",
		accent: "var(--ctp-blue)",
		href: "/research",
		titleEn: "papers.bib",
		titleZh: "papers.bib",
		span: 1,
		minH: "min-h-[14rem]",
		scrollBody: true,
	},
	news: {
		id: "news",
		icon: "◆",
		accent: "var(--ctp-peach)",
		titleEn: "news.log",
		titleZh: "news.log",
		span: 1,
		minH: "min-h-[14rem]",
	},
	blog: {
		id: "blog",
		icon: "▣",
		accent: "var(--ctp-pink)",
		href: "/blog",
		titleEn: "blog.md",
		titleZh: "blog.md",
		span: 1,
		minH: "min-h-[10rem]",
		scrollBody: true,
	},
};

const INITIAL_ORDER: readonly WinId[] = [
	"profile",
	"publications",
	"news",
	"blog",
];

function renderBody(id: WinId) {
	switch (id) {
		case "profile":
			return <ProfileBody />;
		case "news":
			return <NewsBody />;
		case "publications":
			return <PublicationsBody />;
		case "blog":
			return <BlogBody />;
	}
}

export default function Dashboard() {
	const { locale, t } = useLocale();

	// Session-only window order (resets on reload, per design decision).
	const [order, setOrder] = useState<WinId[]>([...INITIAL_ORDER]);
	const [dragId, setDragId] = useState<WinId | null>(null);
	const [overId, setOverId] = useState<WinId | null>(null);
	const [activeId, setActiveId] = useState<WinId | null>(null);

	const reorder = (from: WinId, to: WinId) => {
		if (from === to || from === "profile" || to === "profile") return;
		setOrder((cur) => {
			const next = [...cur];
			const fi = next.indexOf(from);
			const ti = next.indexOf(to);
			next.splice(fi, 1);
			next.splice(ti, 0, from);
			return next;
		});
	};

	return (
		<div className="space-y-5">
			<div className="ctp-rise" style={{ animationDelay: "0ms" }}>
				<CommandGreeting />
			</div>

			{/* Masonry-ish flexible grid: windows flow and auto-rearrange on drag.
					Different spans + min-heights make windows genuinely different sizes. */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
				{order.map((id, i) => {
					const w = WINDOWS[id];
					const expanded = w.id === "profile" || i === order.length - 1;
					return (
						<div
							key={id}
							className={`ctp-rise flex transition-[grid-column] duration-300 ${expanded ? "md:col-span-2" : ""} ${w.minH}`}
							style={{ animationDelay: `${60 + i * 70}ms` }}
						>
							<Window
								id={id}
								icon={w.icon}
								accent={w.accent}
								href={w.href}
								title={locale === "zh" ? w.titleZh : w.titleEn}
								scrollBody={w.scrollBody}
								bodyMaxH="max-h-72"
								active={activeId === id}
								dragging={dragId === id}
								dropTarget={overId === id && dragId !== id}
								draggable={id !== "profile"}
								onFocusWindow={() => setActiveId(id)}
								onDragStart={id !== "profile" ? () => setDragId(id) : undefined}
								onDragEnter={id !== "profile" ? () => setOverId(id) : undefined}
								onDrop={id !== "profile" ? () => {
									if (dragId) reorder(dragId, id);
									setDragId(null);
									setOverId(null);
								} : undefined}
								onDragEnd={id !== "profile" ? () => {
									setDragId(null);
									setOverId(null);
								} : undefined}
							>
								{renderBody(id)}
							</Window>
						</div>
					);
				})}
			</div>

			{/* Contact bar — email only */}
			<div
				className="ctp-rise flex flex-wrap items-center gap-x-6 gap-y-2 text-sm bg-ctp-mantle border border-ctp-surface1 rounded-sm px-5 py-3"
				style={{
					boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
					animationDelay: "420ms",
				}}
			>
				<span className="text-xs font-mono text-ctp-overlay0 uppercase tracking-widest mr-1">
					<span className="text-ctp-green" aria-hidden="true">
						◇
					</span>{" "}
					{t("contact.heading")}
				</span>
				<span className="text-ctp-overlay1 select-none">·</span>
				<a
					href={`mailto:${SITE.email}`}
					className="text-ctp-subtext1 hover:text-ctp-green transition-colors"
				>
					{SITE.email}
				</a>
			</div>

			{/* Keyboard hints */}
			<div
				className="ctp-rise text-center text-xs text-ctp-overlay1 font-mono space-x-1.5"
				style={{ animationDelay: "480ms" }}
			>
				<kbd className="px-1.5 py-0.5 rounded bg-ctp-surface0 text-ctp-yellow">
					Space
				</kbd>
				<span className="text-ctp-overlay0">commands</span>
				<span className="mx-1 text-ctp-overlay0 opacity-40">·</span>
				<kbd className="px-1.5 py-0.5 rounded bg-ctp-surface0 text-ctp-blue">
					Ctrl+P
				</kbd>
				<span className="text-ctp-overlay0">search</span>
				<span className="mx-1 text-ctp-overlay0 opacity-40">·</span>
				<span className="text-ctp-overlay0">
					drag a window&apos;s titlebar to rearrange
				</span>
			</div>
		</div>
	);
}
