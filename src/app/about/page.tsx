import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About — Ting Lin",
  description: "About Ting Lin, researcher at UM-SJTU Joint Institute.",
};

export default function Page() {
  return <AboutPage />;
}
