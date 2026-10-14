import { createFileRoute } from "@tanstack/react-router";
import { GildedPagesApp } from "@/components/gildedpages-app";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [
    { title: "Make yourself at home · Gilded Pages" },
    { name: "description", content: "Set your reading goals, choose your display preferences, and back up your journal." },
    { property: "og:title", content: "Make yourself at home · Gilded Pages" },
    { property: "og:description", content: "Set your reading goals, choose your display preferences, and back up your journal." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: SettingsPage,
});

function SettingsPage() { return <GildedPagesApp page="Settings" />; }
