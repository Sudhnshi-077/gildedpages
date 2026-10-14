import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/book/$bookId")({
  head: () => ({ meta: [
    { title: "Book journal · Gilded Pages" },
    { name: "description", content: "A reading journal for your books, reviews, reading notes, and favorite quotes." },
    { property: "og:title", content: "Book journal · Gilded Pages" },
    { property: "og:description", content: "A reading journal for your books, reviews, reading notes, and favorite quotes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BookJournalPage,
});

function BookJournalPage() {
  const { bookId } = Route.useParams();
  return <GildedPagesApp page="Book journal" bookId={bookId} />;
}
