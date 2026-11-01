import { createFileRoute } from "@tanstack/react-router";
import { ReferenceScreen } from "@/components/ReferenceScreen";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign in — Drowable Sync" },
    { name: "description", content: "Access your Drowable Sync creative workspace." },
    { property: "og:title", content: "Sign in — Drowable Sync" },
    { property: "og:description", content: "Access your Drowable Sync creative workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ReferenceScreen screen="login" title="Sign in — Drowable Sync" />,
});
