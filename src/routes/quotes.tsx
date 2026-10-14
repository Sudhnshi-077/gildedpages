import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/quotes")({
  head: () => ({ meta: [
    { title: "Lines worth keeping · Gilded Pages" },
    { name: "description", content: "A personal collection of memorable passages from the books you read." },
    { property: "og:title", content: "Lines worth keeping · Gilded Pages" },
    { property: "og:description", content: "A personal collection of memorable passages from the books you read." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: QuotesPage,
});

function QuotesPage() { return <GildedPagesApp page="Quotes" />; }
