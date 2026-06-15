"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { blogPosts } from "@/data/blog";
import { news } from "@/data/news";
import { publications } from "@/data/publications";
import { ASCII_ART, SITE } from "@/lib/constants";

const RESEARCH_DIRECTIONS = {
	en: [
		"Accelerator compiler abstractions",
		"Memory-technology abstractions (LPDDR)",
		"Operator-level optimization",
		"HW / compiler co-design",
	],
	zh: [
		"加速器编译器抽象",
		"存储技术抽象（LPDDR）",
		"算子级优化",
		"硬件 / 编译器协同设计",
	],
};

/* ---- Profile ---- */
export function ProfileBody() {
	const { locale, t } = useLocale();
	const [showDirections, setShowDirections] = useState(false);
	const directions = RESEARCH_DIRECTIONS[locale];

	return (
		<div className="flex flex-col h-full">
			<pre
				aria-hidden="true"
				className="text-ctp-blue text-[0.7rem] leading-tight mb-4 select-none opacity-80"
				style={{ fontFamily: "var(--font-mono-custom)" }}
			>
				{ASCII_ART}
			</pre>
			<h1 className="text-2xl font-bold text-ctp-lavender mb-1.5">
				{locale === "zh" ? SITE.nameCn : SITE.name}
				<span className="ctp-cursor ml-1 align-middle" aria-hidden="true" />
			</h1>
			<p className="text-sm text-ctp-subtext0 mb-1">
				{locale === "zh" ? SITE.titleCn : SITE.title}
			</p>
			<p className="text-sm text-ctp-subtext0 mb-1">
				{locale === "zh" ? SITE.affiliationCn : SITE.affiliation}
			</p>
			<p className="text-xs text-ctp-overlay0 mb-4">
				<a
					href={SITE.labUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-ctp-teal transition-colors"
				>
					{locale === "zh" ? SITE.labCn : SITE.lab}
				</a>
			</p>

			<div className="flex flex-wrap gap-2 mb-4">
				<Link
					href="/about"
					className="text-xs px-3 py-1.5 rounded-sm border border-ctp-blue text-ctp-blue hover:bg-ctp-blue/10 transition-colors font-mono"
				>
					{t("nav.about")}
				</Link>
				<button
					type="button"
					onClick={() => setShowDirections((v) => !v)}
					aria-expanded={showDirections}
					className="text-xs px-3 py-1.5 rounded-sm border border-ctp-teal text-ctp-teal hover:bg-ctp-teal/10 transition-colors font-mono inline-flex items-center gap-1.5"
				>
					<span
						className={`transition-transform duration-200 ${showDirections ? "rotate-90" : ""}`}
						aria-hidden="true"
					>
						›
					</span>
					{locale === "zh" ? "研究方向" : "directions"}
				</button>
				<a
					href={SITE.scholar}
					target="_blank"
					rel="noopener noreferrer"
					className="text-xs px-3 py-1.5 rounded-sm border border-ctp-surface1 text-ctp-subtext0 hover:border-ctp-teal hover:text-ctp-teal transition-colors font-mono"
				>
					Scholar
				</a>
				<a
					href={locale === "zh" ? "/resume_cn.pdf" : "/resume.pdf"}
					target="_blank"
					rel="noopener noreferrer"
					className="text-xs px-3 py-1.5 rounded-sm border border-ctp-surface1 text-ctp-subtext0 hover:border-ctp-yellow hover:text-ctp-yellow transition-colors font-mono"
				>
					CV
				</a>
			</div>

			{/* Expandable research directions */}
			<div
				className={`grid transition-all duration-300 ease-out ${showDirections ? "grid-rows-[1fr] opacity-100 mt-auto" : "grid-rows-[0fr] opacity-0"}`}
			>
				<div className="overflow-hidden">
					<div className="border-t border-ctp-surface0 pt-3">
						<p className="text-xs font-mono text-ctp-overlay0 uppercase tracking-widest mb-2">
							{locale === "zh" ? "研究方向" : "research directions"}
						</p>
						<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
							{directions.map((item) => (
								<li
									key={item}
									className="text-sm text-ctp-subtext1 leading-5 flex items-center"
								>
									<span
										className="inline-block w-1.5 h-1.5 rounded-full bg-ctp-teal mr-2 shrink-0"
										aria-hidden="true"
									/>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

/* ---- News ---- */
export function NewsBody() {
	const { locale } = useLocale();
	const latest = news[0];
	if (!latest)
		return <p className="text-xs text-ctp-overlay0">No recent news</p>;
	return (
		<div className="flex flex-col h-full">
			<p className="text-sm text-ctp-text leading-6">
				{locale === "zh" ? latest.titleZh : latest.titleEn}
			</p>
			{(latest.bodyEn || latest.bodyZh) && (
				<p className="text-xs text-ctp-subtext1 mt-2 leading-5">
					{locale === "zh" ? latest.bodyZh : latest.bodyEn}
				</p>
			)}
			<p className="text-xs text-ctp-overlay0 font-mono mt-auto pt-4">
				{latest.date}
			</p>
		</div>
	);
}

/* ---- Publications (scrollable) ---- */
export function PublicationsBody() {
	if (publications.length === 0)
		return <p className="text-xs text-ctp-overlay0">No publications yet</p>;
	return (
		<ul className="space-y-3">
			{publications.map((p) => (
				<li
					key={p.id}
					className="border-l-2 border-ctp-surface1 pl-3 hover:border-ctp-blue transition-colors"
				>
					{p.award && (
						<span className="inline-flex items-center gap-1 text-xs text-ctp-yellow mb-1">
							<span>★</span>
							<span>{p.award}</span>
						</span>
					)}
					<a
						href={p.url ?? "/research"}
						target={p.url ? "_blank" : undefined}
						rel={p.url ? "noopener noreferrer" : undefined}
						className="block text-sm text-ctp-text leading-5 hover:text-ctp-blue transition-colors"
					>
						{p.title}
					</a>
					<p className="text-xs text-ctp-overlay0 font-mono mt-1">
						{p.venue.split(",")[0]} · {p.year}
					</p>
				</li>
			))}
		</ul>
	);
}

/* ---- Blog (scrollable) ---- */
export function BlogBody() {
	const { locale } = useLocale();
	if (blogPosts.length === 0) {
		return (
			<p className="text-sm text-ctp-subtext1 leading-5">
				{locale === "zh"
					? "研究笔记、技术思考与日常记录 — 即将上线。"
					: "Research notes, technical thoughts, and reflections — coming soon."}
			</p>
		);
	}
	return (
		<ul className="space-y-3">
			{blogPosts
				.filter((b) => !b.draft)
				.map((b) => (
					<li
						key={b.id}
						className="border-l-2 border-ctp-surface1 pl-3 hover:border-ctp-pink transition-colors"
					>
						<Link
							href={`/blog/${b.slug}`}
							className="block text-sm text-ctp-text hover:text-ctp-pink transition-colors"
						>
							{locale === "zh" ? b.titleZh : b.titleEn}
						</Link>
						<p className="text-xs text-ctp-subtext1 mt-1 leading-5">
							{locale === "zh" ? b.excerptZh : b.excerptEn}
						</p>
						<p className="text-xs text-ctp-overlay0 font-mono mt-1">{b.date}</p>
					</li>
				))}
		</ul>
	);
}
