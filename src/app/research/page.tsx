import type { Metadata } from "next";
import ResearchPage from "./ResearchPage";

export const metadata: Metadata = {
  title: "Research — Ting Lin",
  description: "Research interests and publications of Ting Lin.",
};

export default function Page() {
  return <ResearchPage />;
}
