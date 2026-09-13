# What to write next

## Wave A — the hub exists

- [x] Minimal Vite + TypeScript site, deploy workflow to Pages. Done 2026-09-14.
- [x] Landing page: five books, what each is for, who it is for, honest status.
- [x] Theme toggle sharing `tb-theme` with the books.

## Wave B — stats that cannot rot

- [x] Fetch each book's `data/book.json` and render real counts. Done
      2026-09-14: chapters and problems, read live from each deployed book.
- [x] Degrade honestly — "numbers unavailable" when the fetch fails,
      "no site yet" when there is nothing to fetch. Never zero, never stale.
- [ ] **Blocked: per-book progress bars.** `status: complete` is *not* in the
      published `data/book.json` — `toNav` drops it, so the hub can count
      chapters but cannot tell finished ones from drafts. Fixing this means
      adding `status` to the search/nav payload in each book's
      `build/plugin.ts`, then reading it here. Until then, do not invent a
      progress figure.
- [ ] Samples verified and last-updated are likewise not published yet; same
      fix, same file.

## Wave C — worth having, not urgent

- [ ] Search across all five books at once, reusing the per-book index format.
- [ ] A "start here" route for a reader who does not know which book they want.

## Rules

- **No hand-typed statistics.** If a number cannot be read from a book's
  published data, it does not go on the page.
- The AP books carry a College Board disclaimer; the hub must too, since it
  links to them and describes them.
