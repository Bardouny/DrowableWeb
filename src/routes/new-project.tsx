import { createFileRoute } from "@tanstack/react-router";
import { ReferenceScreen } from "@/components/ReferenceScreen";

export const Route = createFileRoute("/new-project")({
  head: () => ({ meta: [
    { title: "Create New Project — Drowable Sync" },
    { name: "description", content: "Choose a canvas preset and invite collaborators to a new project." },
    { property: "og:title", content: "Create New Project — Drowable Sync" },
    { property: "og:description", content: "Choose a canvas preset and invite collaborators to a new project." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ReferenceScreen screen="new-project" title="Create New Project — Drowable Sync" />,
});
