import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/goals")({
  head: () => ({ meta: [
    { title: "A little progress, every day · Gilded Pages" },
    { name: "description", content: "Track your reading goals and celebrate your milestones." },
    { property: "og:title", content: "A little progress, every day · Gilded Pages" },
    { property: "og:description", content: "Track your reading goals and celebrate your milestones." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: GoalsPage,
});

function GoalsPage() { return <GildedPagesApp page="Goals" />; }
