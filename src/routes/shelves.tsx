import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/shelves")({
  head: () => ({ meta: [
    { title: "Books, gathered together · Gilded Pages" },
    { name: "description", content: "Explore and organize books in personal reading collections." },
    { property: "og:title", content: "Books, gathered together · Gilded Pages" },
    { property: "og:description", content: "Explore and organize books in personal reading collections." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ShelvesPage,
});

function ShelvesPage() { return <GildedPagesApp page="Shelves" />; }
