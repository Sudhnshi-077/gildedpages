import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [
    { title: "Your next chapter · Gilded Pages" },
    { name: "description", content: "Explore and prioritize the books you cannot wait to read." },
    { property: "og:title", content: "Your next chapter · Gilded Pages" },
    { property: "og:description", content: "Explore and prioritize the books you cannot wait to read." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WishlistPage,
});

function WishlistPage() { return <GildedPagesApp page="Wishlist" />; }
