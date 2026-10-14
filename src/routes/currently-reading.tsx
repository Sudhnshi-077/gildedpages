import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/currently-reading")({
  head: () => ({ meta: [
    { title: "The books beside you · Gilded Pages" },
    { name: "description", content: "Follow your in-progress reads, reading pace, and book notes." },
    { property: "og:title", content: "The books beside you · Gilded Pages" },
    { property: "og:description", content: "Follow your in-progress reads, reading pace, and book notes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CurrentlyReadingPage,
});

function CurrentlyReadingPage() { return <GildedPagesApp page="Currently Reading" />; }
