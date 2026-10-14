import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/year-in-review")({
  head: () => ({ meta: [
    { title: "A year between the covers · Gilded Pages" },
    { name: "description", content: "Celebrate the books, pages, and reading memories that shaped your year." },
    { property: "og:title", content: "A year between the covers · Gilded Pages" },
    { property: "og:description", content: "Celebrate the books, pages, and reading memories that shaped your year." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: YearinReviewPage,
});

function YearinReviewPage() { return <GildedPagesApp page="Year in Review" />; }
