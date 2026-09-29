# Portfolio (Next.js 16, Turbopack)

## Commands
- `npm run lint`: ESLint
- `npx tsc --noEmit -p .`: typecheck
- `npm test`: Vitest unit tests (`tests/unit`)
- `npm run test:e2e`: Playwright. Do not run `tests/e2e/contact.spec.ts`; it submits the real contact form and sends email.
- `npm run build && npx next start -p <port>`: production build

## Verification
- Use the `verify` skill (`.claude/skills/verify/SKILL.md`) for UI and motion changes.
- Motion bugs around client-side navigation (for example, scroll reveals after using the header menu) can reproduce only in a
  production build. Check `next build && next start` before concluding the dev server shows no bug.

## Long-running commands

If you expect a command to take more than ~4 minutes, don't run it in the
foreground. Run it in the background (redirect output to a log file), then
check on it every 3-4 minutes (e.g. `sleep 180; tail -n 20 <logfile>`) until
it finishes. Never let more than 5 minutes pass between your tool calls, so
the prompt cache stays warm.
