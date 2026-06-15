"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

/**
 * A faux nvim command line that "types" a welcome command on mount.
 * Pure flourish — no real command is executed.
 */
export default function CommandGreeting() {
	const { locale } = useLocale();
	const full =
		locale === "zh"
			? ":echo 'stay sharp and sensitive'"
			: ":echo 'stay sharp and sensitive'";

	const [typed, setTyped] = useState("");
	const done = typed.length >= full.length;

	useEffect(() => {
		// Restart the typing animation whenever the target string changes.
		// Each tick fully overwrites `typed`, so no synchronous reset is needed.
		let i = 0;
		const id = window.setInterval(() => {
			i += 1;
			setTyped(full.slice(0, i));
			if (i >= full.length) window.clearInterval(id);
		}, 32);
		return () => window.clearInterval(id);
	}, [full]);

	return (
		<div className="flex items-center gap-2 font-mono text-xs text-ctp-subtext0 bg-ctp-crust/50 border border-ctp-surface0 rounded-sm px-3 py-2">
			<span className="text-ctp-green" aria-hidden="true">
				▶
			</span>
			<span className="text-ctp-text">{typed}</span>
			<span
				className={done ? "ctp-caret text-ctp-lavender" : "text-ctp-lavender"}
				aria-hidden="true"
			>
				█
			</span>
			<span className="flex-1" />
			<span className="text-ctp-overlay0 hidden sm:inline" aria-hidden="true">
				NORMAL
			</span>
		</div>
	);
}
