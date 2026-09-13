# TBHUB — working notes for Claude

The landing page and stats page for the textbook family: CppTB, JavaTB, CsaTB,
CalTB, PhysTB.

**Nothing is built yet.** `docs/ROADMAP.md` holds the plan.

## The one thing that matters here

**The stats must be read, never typed.** Every book already publishes
`data/book.json` at its deployed root, carrying its parts, chapters, objectives,
problem counts and status flags. The hub fetches those five files and reports
what is actually in them.

A hand-maintained number on this page would be wrong within a week, and a
dashboard that lies about progress is worse than no dashboard. This is the same
rule the books run on — nothing is asserted that a program cannot check —
applied to the hub.

Consequence worth knowing: those fetches are cross-origin. All five sites are on
`abiel990310.github.io`, so same-origin under the browser's rules, but the paths
differ per repo and each book's base path is `/<repo>/`. Build the URL list from
the repo names, not by hand.

## What goes on it

- **Landing page** — the five books, what each is for, who each is for, and an
  honest status per book rather than five identical cards.
- **Stats page** — chapters written against chapters planned, problems, samples
  verified, last updated. Read from each book's own data.

## Scheduling

Covered by **`trig_017zYznE5wwj44ZGRirzmBRL`**, the shared 07:00 UTC+8 routine.
Do not create a second Routine.

**Pushing `main` deploys** to https://abiel990310.github.io/TBHUB/.

## Inherited gotchas

- Links must go through a base helper — this site is served from `/TBHUB/`, and
  a raw `/path/` resolves against the domain root and 404s. That bug shipped in
  two of the books before it was caught; it is invisible in `npm run dev`.
- Theme key is `tb-theme`, shared across the family so a reader's choice follows
  them from the hub into a book.
