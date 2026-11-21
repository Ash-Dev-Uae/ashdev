<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Portfolio content lives in `src/lib/portfolio-data.ts`; pages render from it so text edits never touch layout code.
- Animation helpers (scroll reveal, counters, typewriter) live in `src/components/portfolio/motion.tsx`; keyframes/utilities in `src/styles.css`.

- AI chat: server route `src/routes/api/chat.ts` streams via AI Gateway; system prompt built from portfolio data in `src/lib/ash-prompt.ts` so answers stay in sync with site content. Chats saved in browser localStorage (no backend).
- AshBot is a closed-by-default floating panel; never autofocus its composer so opening the portfolio cannot scroll visitors away from the introduction.
- Arcade rules live in a pure reducer; the game uses an absolute deadline and a cleaned-up interval so throttled tabs and restarts cannot extend a round.
