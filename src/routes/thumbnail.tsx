import { createFileRoute } from "@tanstack/react-router";
import { ReferenceScreen } from "@/components/ReferenceScreen";

export const Route = createFileRoute("/thumbnail")({
  head: () => ({ meta: [
    { title: "YouTube Thumbnail Editor — Drowable Sync" },
    { name: "description", content: "Create and preview YouTube thumbnails in the Drowable Sync studio." },
    { property: "og:title", content: "YouTube Thumbnail Editor — Drowable Sync" },
    { property: "og:description", content: "Create and preview YouTube thumbnails in the Drowable Sync studio." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ReferenceScreen screen="thumbnail" title="YouTube Thumbnail Editor — Drowable Sync" />,
});
