# DHIS2 Data Element Explorer

A DHIS2 web app (TypeScript + React) for browsing data elements and attaching notes to them. Built as a training task to practise DHIS2 app development and git flow.

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Released code only. Every merge is tagged (`1.0.0`, `1.0.1`, ...). Protected. |
| `develop` | Integration branch. Default branch. Protected. |
| `feature/*` | One per milestone, branched from `develop`, PR back into `develop`. |
| `release/*` | Branched from `develop`, PR into `main`. |
| `hotfix/*` | Branched from `main`, PR into `main`. |

Nobody pushes directly to `main` or `develop`; everything goes through a reviewed pull request.

## Getting started

Scaffolding the app is the first milestone (`feature/project-setup`); see the task brief.
