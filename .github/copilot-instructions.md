# Copilot Instructions for MangaUpdater-V3-Front

## Project Overview
This is a React 19 + TypeScript + Vite frontend using MUI for UI components, React Query for data fetching/caching, Axios for HTTP requests, React Router for routing, and Sass for some local styles.

The application is split mainly into:
- `src/features/home`: public/home-facing screens
- `src/features/admin`: admin screens and admin-specific components
- `src/api`: API clients, query helpers, commands, and types
- `src/components`: shared UI components such as modal and reusable table/button pieces
- `src/interfaces`: shared UI-oriented interfaces

## Core Stack
- React 19
- TypeScript
- Vite
- MUI (`@mui/material`, `@mui/icons-material`)
- React Query (`@tanstack/react-query`)
- Axios
- React Router
- Sass

## Architecture Conventions
- Keep code organized by feature first, not by technical layer only.
- Put route declarations inside the related feature folder.
- Put page-level components in `features/*/pages`.
- Put feature-specific hooks in `features/*/hooks`.
- Put feature-specific layout components in `features/*/layouts`.
- Put shared API contracts and request helpers under `src/api`.
- Put reusable generic UI components under `src/components`.

## API Layer Conventions
- Reuse the shared Axios clients from `src/api/axiosClient.ts`.
- `apiClientDatabase` is used for the main backend.
- `apiClientUser` is used for the user-related backend.
- Prefer the shared helpers in `src/api/utils`:
  - `createQuery` for simple GET queries
  - `createUserQuery` for GET queries against the user service
  - `createPagedQuery` for paginated GET queries
  - `postCommand` for POST requests
  - `updateCommand` for PUT requests
  - `deleteCommand` for DELETE requests
- When adding a new API surface, create:
  - a `*.types.ts` file for request/response shapes
  - a `*.queries.ts` file for reads
  - a `*.commands.ts` file for writes when needed
- Keep API functions thin and typed. Avoid putting UI mapping logic inside the API layer.

## React Query Conventions
- Use `useQuery` for reads and `useMutation` for writes.
- Use stable and descriptive query keys.
- For paged resources, follow the current pattern of query keys like:
  - `["logs", { pageNumber, pageSize }]`
  - `["manga", { pageNumber, pageSize }]`
- After successful mutations, invalidate only the relevant query keys with `queryClient.invalidateQueries`.
- If lightweight formatting is needed for display, use `select` in `useQuery` or a feature hook rather than mutating the raw server response in components.

## UI Conventions
- Prefer MUI components and `sx` styling for layout, spacing, and component-level styles.
- Keep using the project dark theme defined in `src/App.tsx`.
- Use local `.scss` files only when there is an existing local stylesheet pattern or the styling is clearly better kept outside `sx`.
- Preserve the current visual language:
  - dark surfaces
  - MUI cards, papers, tables, dialogs
  - consistent spacing
- Prefer responsive MUI layout primitives such as `Box`, `Stack`, `Grid`, `Paper`, `Container`, `Toolbar`, and `Drawer`.
- For inline styled text inside MUI typography, prefer MUI components such as `Box component="span"` over raw HTML tags when the styling is component-local.

## Component Conventions
- Prefer functional components with explicit `React.FC` only where the file already follows that pattern.
- Keep components focused:
  - page component handles orchestration
  - hook handles data loading or transformation
  - shared component handles presentation and interaction
- Reuse shared components when possible instead of duplicating dialogs, tables, or button patterns.
- If extending CRUD pages, keep the current pattern of:
  - page-level query and mutation hooks
  - modal for create/edit
  - confirmation dialog for delete
- Do not introduce a second competing CRUD pattern unless refactoring the existing one consistently.

## TypeScript Conventions
- Keep all new API and component data strongly typed.
- Define or extend explicit interfaces in the nearest `*.types.ts` or shared interface file.
- Avoid `any`.
- Convert string form values to typed payload values at the page boundary before calling API commands.
- Keep IDs read-only in editing flows unless the business rule explicitly requires otherwise.

## Routing Conventions
- Keep route definitions close to their feature modules.
- Preserve the split between `homeRoutes` and `adminRoutes`.
- If authentication is added later, protect `/admin` with a dedicated route guard instead of scattering auth checks throughout page components.

## State and Side Effects
- Prefer local component state for modal visibility, selected rows, and page number state.
- Prefer React Query for server state.
- Prefer derived data in hooks when multiple components/pages depend on the same transformation.
- Avoid adding global state unless there is a clear cross-feature need.

## File and Naming Conventions
- Keep existing naming patterns:
  - `FeatureName.tsx` for components/pages
  - `feature.queries.ts` for read APIs
  - `feature.commands.ts` for write APIs
  - `feature.types.ts` for API contracts
- Match the naming style already present in the folder you are editing.
- Keep new files near the owning feature unless they are truly shared.

## When Changing Admin
The admin area currently includes:
- dashboard/home
- logs
- manga CRUD
- source CRUD
- manga source CRUD
- queue placeholder

When working in admin:
- prefer improving the existing feature structure rather than moving everything into a new pattern
- keep navigation coherent with the drawer layout
- avoid adding duplicate or placeholder menu items
- treat admin as an operational interface, not just a demo UI

## Known Issues and Current Gaps
Be aware of the following current project realities before making changes:
- The admin route is currently not protected by authentication.
- The admin menu currently contains a duplicate/confusing "Configuration" entry.
- The `Queue` page is a placeholder and not a real operations page yet.
- `Source` and `MangaSource` pages do not yet have complete update flows in the API layer.
- There is an existing type mismatch between `src/api/logs/logs.types.ts` and `src/features/admin/components/LogsPanel.tsx` because the UI expects a log `id` that the current log type does not expose.
- The full build may fail because of existing unrelated issues; avoid assuming a failing build was caused by your change without checking the touched files.

## Guidance for New Work
When adding a feature:
1. Start from the owning feature folder.
2. Add or update types first.
3. Add/update API query or command helpers.
4. Add/update the feature hook if data shaping is needed.
5. Implement the page/component with MUI.
6. Use React Query invalidation after writes.
7. Keep styling aligned with the current dark admin/home layouts.
8. Prefer minimal, targeted changes over broad refactors.

## Guidance for Refactors
- Do not refactor unrelated files while implementing one feature.
- If a shared abstraction is clearly broken or duplicated, extract it only if at least two real call sites benefit immediately.
- Preserve the current project shape unless a broader refactor is explicitly requested.

## Validation Expectations
Before considering a change complete:
- check TypeScript errors in the touched files
- prefer narrow validation for the edited area
- if the full build fails, distinguish new failures from pre-existing ones
- keep the code consistent with the current ESLint and TypeScript setup

## What Copilot Should Avoid
- Do not introduce a new state management library.
- Do not replace MUI with another UI system.
- Do not add untyped API calls.
- Do not duplicate CRUD logic across admin pages if an existing pattern can be reused.
- Do not introduce broad architecture changes unless explicitly requested.