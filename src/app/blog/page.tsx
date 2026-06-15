import type { Metadata } from "next";
import BlogPage from "./BlogPage";

export const metadata: Metadata = {
  title: "Blog — Ting Lin",
  description: "Blog posts by Ting Lin on research, computing, and more.",
};

export default function Page() {
  return <BlogPage />;
}
