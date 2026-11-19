# DHIS2 Data Element Explorer

A DHIS2 web app (TypeScript + React) for browsing data elements and attaching notes to them. Built as a training task to practise DHIS2 app development and git flow.

## Run, build and test

You need Node 20+ and pnpm (`npm install -g pnpm`).

```bash
pnpm install     # once, after cloning
pnpm start       # dev server on http://localhost:3000
pnpm lint        # ESLint + Prettier check (pnpm format fixes formatting)
pnpm test        # unit tests
pnpm build       # writes an installable .zip to build/bundle/
```

On the login screen, use the DHIS2 play server `https://play.im.dhis2.org/stable-2-43-2-1` and log in as `admin` / `district`. If that address stops working, pick the newest **Stable** instance at https://im.dhis2.org/public/instances.

Play is reset every night, so notes you save and apps you install there are gone the next day.

## Project structure

```
src/
├── App.tsx          the page: title + your components
├── api/             queries and mutations (named constants)
├── types/           TypeScript interfaces for API responses
├── hooks/           custom hooks: data fetching and logic
└── components/      React components, one per file
i18n/en.pot          translation strings (updated automatically by pnpm build)
typings/             global type declarations (you shouldn't need to touch this)
```

Each folder in `src/` has a short README saying what goes in it.

## Branches

| Branch      | Purpose                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| `main`      | Released code only. Every merge is tagged (`1.0.0`, `1.0.1`, ...). Protected. |
| `develop`   | Integration branch. Default branch. Protected.                                |
| `feature/*` | One per milestone, branched from `develop`, PR back into `develop`.           |
| `release/*` | Branched from `develop`, PR into `main`.                                      |
| `hotfix/*`  | Branched from `main`, PR into `main`.                                         |

Nobody pushes directly to `main` or `develop`; everything goes through a reviewed pull request.
