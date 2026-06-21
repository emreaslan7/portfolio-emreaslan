# AGENTS.md

## Quick start

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # production build
pnpm lint       # ESLint (flat config, core-web-vitals rules)
pnpm lint:fix   # ESLint with --fix
```

No test or typecheck scripts exist. Type errors surface during `pnpm build` (Next.js calls `tsc` internally). No formatter config (no Prettier).

## Architecture

- **Single config file**: `src/data/resume.tsx` — edit this to change portfolio content, nav links, socials, skills, projects, work history, education.
- **Blog**: MDX files in `content/*.mdx` with frontmatter (title, publishedAt, summary, etc.). Processed by `content-collections` via `content-collections.ts` at build time.
- **Content collections**: Generates into `.content-collections/generated/` (gitignored). Path alias `content-collections` maps there. Do not edit generated files — edit `content/*.mdx` + `content-collections.ts` instead.
- **Custom MDX components**: `src/mdx-components.tsx` wires custom code blocks (`CodeBlock`) and media containers (`MediaContainer`). Remark plugin `src/lib/remark-code-meta.ts` extracts code block metadata.
- **Tailwind v4**: Uses `@import "tailwindcss"` syntax (no `tailwind.config.ts`). Theme variables via CSS in `src/app/globals.css`.
- **shadcn/ui**: Components in `src/components/ui/`, aliases in `components.json`.
- **Magic UI**: Components vendored in `src/components/magicui/`.
- **Local fonts**: `public/fonts/CabinetGrotesk-Medium.ttf` and `ClashDisplay-Semibold.ttf` loaded via `next/font/local`.
- **Blog pagination**: Custom in `src/lib/pagination.ts` — page size 5, controlled via `?page=N` query param.

## Important paths

| Path | Purpose |
|------|---------|
| `src/data/resume.tsx` | All site content and configuration |
| `content/*.mdx` | Blog post source files |
| `content-collections.ts` | Content collection config + MDX compilation |
| `src/mdx-components.tsx` | MDX component overrides |
| `src/app/layout.tsx` | Root layout (theme provider, navbar, flicker grid) |
| `src/app/page.tsx` | Homepage (all sections) |
| `src/app/blog/page.tsx` | Blog index with pagination |
| `src/app/blog/[slug]/page.tsx` | Individual blog post page |

## Conventions

- Class merging uses `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge).
- Icons: `lucide-react` and custom SVG components in `src/components/icons.tsx` and `src/components/ui/svgs/`.
- Dark mode: `.dark` class on `<html>` via `next-themes` `ThemeProvider`.
- Security headers set in `next.config.mjs` (CSP-like headers).
- `@/*` path alias maps to `./src/*`.
