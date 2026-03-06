<div align="center">

# tjhorwood.com

**Personal website and portfolio for Taylor Horwood**

[![Live Site](https://img.shields.io/badge/Live-tjhorwood.com-0a66c2?style=for-the-badge)](https://tjhorwood.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

A modern portfolio experience focused on clean design, motion, and technical storytelling.
The site introduces Taylor as a Site Reliability Engineer and full stack developer, with dedicated pages for projects, experience, and contact.

## Highlights

- Personal landing page with rotating role tags and quick contact actions
- About page with skills, tools, databases, and career timeline
- Projects gallery with detailed project pages and technology tags
- Blog and gear sections ready for future content
- Resume download and social links

## Live Content Structure

- `/` - Intro, profile, and CTA links
- `/about` - Background, technical stack, and work history
- `/projects` - Featured project portfolio
- `/blog` - Placeholder for upcoming posts
- `/gear` - Placeholder for recommended gear

## Tech Stack

- Next.js App Router (React 19)
- Tailwind CSS v4
- Framer Motion + custom animation components
- Radix UI primitives
- Directus SDK integration for content-driven pages
- Biome for formatting and linting
- Docker + Helm manifests for deployment

## Local Development

```bash
pnpm install
pnpm dev
```

App runs on `http://localhost:3031`.

## Scripts

```bash
pnpm dev           # local dev server (port 3031)
pnpm build         # production build
pnpm start         # run production server
pnpm lint          # biome check
pnpm format        # biome format
pnpm docker:build  # docker compose build
pnpm docker:deploy # docker compose up -d
```

## Environment

The Directus client reads:

- `NEXT_PUBLIC_DIRECTUS_URL` (defaults to `http://localhost:8055`)

## Deployment

### Docker Compose

```bash
docker compose -f compose.yml up -d
```

### Kubernetes (Helm)

Helm chart is in [`helm/`](./helm) with defaults in [`helm/values.yaml`](./helm/values.yaml).

## Contact

- Website: [tjhorwood.com](https://tjhorwood.com)
- GitHub: [@tjhorwood](https://github.com/tjhorwood)
- LinkedIn: [taylor-horwood](https://linkedin.com/in/tjhorwood)
- Email: [contact@tjhorwood.com](mailto:contact@tjhorwood.com)
