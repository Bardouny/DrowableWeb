import { createFileRoute } from "@tanstack/react-router";
import { ReferenceScreen } from "@/components/ReferenceScreen";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [
    { title: "Projects — Drowable Sync" },
    { name: "description", content: "Manage creative projects, collaborators and connections in your workspace." },
    { property: "og:title", content: "Projects — Drowable Sync" },
    { property: "og:description", content: "Manage creative projects, collaborators and connections in your workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ReferenceScreen screen="projects" title="Projects — Drowable Sync" />,
});
