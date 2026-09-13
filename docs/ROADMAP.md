# What to write next

## Wave A — the hub exists

- [ ] Minimal Vite + TypeScript site, the family's styles, deploy workflow to
      Pages. Take what is portable from CsaTB rather than starting blank.
- [ ] Landing page: five books, what each is for, who it is for, honest status.
- [ ] Theme toggle sharing `tb-theme` with the books.

## Wave B — stats that cannot rot

- [ ] Fetch each book's `data/book.json` and render real counts: chapters
      written against planned, problems, samples, last updated.
- [ ] Degrade honestly. A book whose data is missing or whose site is not yet
      deployed shows as "not deployed yet" — never as zero, and never as a
      number carried over from last time.
- [ ] Per-book progress bars driven by `status: complete`, the same flag the
      books' own `/progress/` pages use.

## Wave C — worth having, not urgent

- [ ] Search across all five books at once, reusing the per-book index format.
- [ ] A "start here" route for a reader who does not know which book they want.

## Rules

- **No hand-typed statistics.** If a number cannot be read from a book's
  published data, it does not go on the page.
- The AP books carry a College Board disclaimer; the hub must too, since it
  links to them and describes them.
