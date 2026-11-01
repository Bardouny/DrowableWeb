import { createFileRoute } from "@tanstack/react-router";
import { ReferenceScreen } from "@/components/ReferenceScreen";

export const Route = createFileRoute("/canvas")({
  head: () => ({ meta: [
    { title: "Quantum Brand System — Drowable Sync" },
    { name: "description", content: "Edit vector graphics and brand systems in the Drowable Sync canvas." },
    { property: "og:title", content: "Quantum Brand System — Drowable Sync" },
    { property: "og:description", content: "Edit vector graphics and brand systems in the Drowable Sync canvas." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ReferenceScreen screen="canvas" title="Quantum Brand System — Drowable Sync" />,
});
