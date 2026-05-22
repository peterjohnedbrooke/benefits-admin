# Benefits Admin

A small admin dashboard for managing employee benefits enrolment. Built as a portfolio piece, exploring the Benifex frontend stack end-to-end.

**Live demo:** _(add Vercel URL here after deploy)_

## What it does

- **Dashboard** with overview stats (total employees, active enrolments, monthly cost).
- **Employees list** with debounced search and department filtering. Filter state is URL-synced — links are shareable.
- **Employee detail** with an optimistic-UI toggle for enrolling/disenrolling in each benefit. The toggle flips instantly, the request goes out in the background, and rolls back with a toast if the server errors.
- **Benefits catalogue** grouped by category.

There is no real backend — every API call is intercepted by [MSW](https://mswjs.io) running in the browser, with an in-memory mutable store so the demo feels stateful within a session.

## Tech stack

| Tool | Why |
|---|---|
| **React 19 + TypeScript** | Strict mode TS throughout; no `any`. |
| **RsBuild** | Webpack-compatible plugin ecosystem with Rust-grade build speed. |
| **Redux Toolkit + Redux-Sagas** | Centralised state with generator-based async flows. Sagas chosen over thunks for testability and the cancellation/race-condition tooling. |
| **MSW v2** | Mocks the API at the network layer using a Service Worker, so the same handlers work in dev, tests, and Storybook. |
| **React Router v6** | Nested routes, lazy-loaded pages, URL-synced filter state. |
| **Tailwind CSS v3** | Utility-first styling with `:focus-visible` accessibility baked in. |
| **Vitest + RTL** _(planned)_ | Test the optimistic-toggle + rollback flow end-to-end against MSW. |

## The headline feature: optimistic toggle + rollback

Clicking an enrolment toggle flips the UI **before** the network responds. The saga:

1. Dispatches the optimistic update (reducer applies it immediately).
2. Calls the API.
3. On success, reconciles state with the server's response.
4. On failure, dispatches a rollback action with the original status and shows an error toast.

Each toggle is dispatched through `takeEvery` so independent toggles for different benefits run in parallel and never cancel each other.

## Running locally

```bash
npm install
npm run dev          # dev server at http://localhost:3000
npm run build        # production build to dist/
npx serve -s dist    # smoke-test the production build locally
```

## Project structure

```
src/
  app/           router + lazy route definitions
  components/    layout + reusable UI primitives
  features/     ┐
    dashboard/  ├── page + presentational components
    employees/  │
    benefits/   ┘
  lib/           api client, types, hooks
  mocks/         MSW handlers + seed data + mutable store
  store/         Redux slices + sagas + selectors
    dashboard/
    employees/
    benefits/
    enrolments/  ← the optimistic-toggle saga lives here
    toasts/
```

## What I'd add next

- **Vitest + RTL tests** covering the optimistic-toggle rollback path with MSW handler overrides. This is the test that proves the centrepiece flow works under failure conditions.
- **Storybook** for `StatCard`, `EmployeeRow`, and `EnrolmentToggle` — component-driven development signals.
- **Real backend**: swap MSW for a thin Node API; the `apiGet`/`apiPatch` boundary already abstracts the network so this is a flip of one config flag rather than a refactor.
- **Pagination + server-side filtering** for the employee list once the dataset would exceed a few hundred rows.
- **Audit logging** of enrolment changes — useful for compliance-driven admin tools.
