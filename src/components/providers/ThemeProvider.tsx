"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useSyncExternalStore,
} from "react";

type Theme = "mocha" | "latte";

interface ThemeContextValue {
	theme: Theme;
	toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
	theme: "mocha",
	toggle: () => {},
});

type ThemeListener = () => void;

const themeListeners = new Set<ThemeListener>();
let currentTheme: Theme = "mocha";

function parseTheme(value: string | null): Theme | null {
	if (value === "mocha" || value === "latte") return value;
	return null;
}

function persistTheme(next: Theme) {
	document.documentElement.setAttribute("data-theme", next);
	localStorage.setItem("ctp-theme", next);
}

function setThemeValue(next: Theme) {
	currentTheme = next;
	persistTheme(next);
	for (const listener of themeListeners) listener();
}

function getPreferredTheme(): Theme {
	const saved = parseTheme(localStorage.getItem("ctp-theme"));
	return saved ?? "mocha"; // Default to mocha (dark theme)
}

function subscribeTheme(listener: ThemeListener) {
	themeListeners.add(listener);
	return () => themeListeners.delete(listener);
}

function getThemeSnapshot() {
	return currentTheme;
}

function getServerThemeSnapshot(): Theme {
	return "mocha";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const theme = useSyncExternalStore(
		subscribeTheme,
		getThemeSnapshot,
		getServerThemeSnapshot,
	);

	const toggle = useCallback(() => {
		setThemeValue(currentTheme === "mocha" ? "latte" : "mocha");
	}, []);

	useEffect(() => {
		setThemeValue(getPreferredTheme());

		// Allow KeybindProvider to trigger the same theme toggle as the status bar.
		const listener = () => toggle();
		document.addEventListener("toggle-theme", listener);
		return () => document.removeEventListener("toggle-theme", listener);
	}, [toggle]);

	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
