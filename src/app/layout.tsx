import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { KeybindProvider } from "@/components/providers/KeybindProvider";
import NvimLayout from "@/components/nvim/NvimLayout";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Maple Mono is not on Google Fonts; use Fira Code as a close alternative
// that's available on Google Fonts. To use Maple Mono, self-host it later.
const monoFont = Fira_Code({
  variable: "--font-mono-custom",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ting Lin (林汀) — Personal Website",
  description:
    "Personal academic website of Ting Lin (林汀), Ph.D. student at Shanghai Jiao Tong University. Research on architecture-oriented abstractions for AI inference.",
  openGraph: {
    title: "Ting Lin (林汀)",
    description: "Ph.D. Student at Shanghai Jiao Tong University · iCAS Lab",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="mocha"
      className={`${lora.variable} ${monoFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden">
        <ThemeProvider>
          <LocaleProvider>
            <KeybindProvider>
              <NvimLayout>{children}</NvimLayout>
            </KeybindProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
