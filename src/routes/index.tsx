import { createFileRoute } from "@tanstack/react-router";
import { ReferenceScreen } from "@/components/ReferenceScreen";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Drowable Sync — Real-Time Collaborative Creative Suite" },
    { name: "description", content: "Design logos, YouTube thumbnails, icons and banners together in Drowable Sync." },
    { property: "og:title", content: "Drowable Sync — Real-Time Collaborative Creative Suite" },
    { property: "og:description", content: "Design logos, YouTube thumbnails, icons and banners together in Drowable Sync." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ReferenceScreen screen="home" title="Drowable Sync — Real-Time Collaborative Creative Suite" />,
});
