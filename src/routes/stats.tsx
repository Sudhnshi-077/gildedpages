import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/stats")({
  head: () => ({ meta: [
    { title: "The shape of your reading · Gilded Pages" },
    { name: "description", content: "Explore your reading history, pages, ratings, and favorite genres." },
    { property: "og:title", content: "The shape of your reading · Gilded Pages" },
    { property: "og:description", content: "Explore your reading history, pages, ratings, and favorite genres." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: StatsPage,
});

function StatsPage() { return <GildedPagesApp page="Stats" />; }
