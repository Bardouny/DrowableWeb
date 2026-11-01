<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the six supplied screen designs as original HTML in `public/reference/` and present each through a dedicated TanStack route because exact reference fidelity and independent URLs matter.
- Put cross-screen demo interactions in `public/reference/interactions.js` because all six supplied HTML documents share the same navigation and preview-only behavior.
