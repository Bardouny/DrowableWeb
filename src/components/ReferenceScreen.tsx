export function ReferenceScreen({ screen, title }: { screen: string; title: string }) {
  return <iframe title={title} src={`/reference/${screen}.html`} className="reference-screen" />;
}
