import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [
    { title: "Your reading room · Gilded Pages" },
    { name: "description", content: "Browse, search, and sort every book in your personal reading library." },
    { property: "og:title", content: "Your reading room · Gilded Pages" },
    { property: "og:description", content: "Browse, search, and sort every book in your personal reading library." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LibraryPage,
});

function LibraryPage() { return <GildedPagesApp page="Library" />; }
