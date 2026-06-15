import type { Metadata } from "next";
import AwardsPage from "./AwardsPage";

export const metadata: Metadata = {
  title: "Awards — Ting Lin",
  description: "Awards and honors received by Ting Lin.",
};

export default function Page() {
  return <AwardsPage />;
}
