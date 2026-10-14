import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gilded Pages · Your reading universe" },
      { name: "description", content: "A warm personal reading journal — track books, streaks, quotes, goals, and the stories that stayed with you." },
      { property: "og:title", content: "Gilded Pages · Your reading universe" },
      { property: "og:description", content: "A warm personal reading journal — track books, streaks, quotes, goals, and the stories that stayed with you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <GildedPagesApp page="Dashboard" />;
}
