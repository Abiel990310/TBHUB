import './styles.css';
import { BOOKS, fetchStats, type Book, type Stats } from './books.ts';

const THEME_KEY = 'tb-theme';        // shared with the books, so a choice follows the reader

function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private windows and blocked site data both throw here. The page works
    // without a remembered theme; it must not fail to render because of one.
  }
}

function initialTheme(): string {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* see applyTheme */ }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function card(book: Book): string {
  const href = `https://abiel990310.github.io/${book.repo}/`;
  return `
    <article class="card" data-repo="${book.repo}">
      <div class="card__head">
        <h2 class="card__title">${book.title}</h2>
        ${book.ap ? '<span class="tag">AP</span>' : ''}
      </div>
      <p class="card__subject">${book.subject}</p>
      <p class="card__audience">${book.audience}</p>
      <p class="card__stats" data-stats>Reading its numbers…</p>
      ${book.note ? `<p class="card__note">${book.note}</p>` : ''}
      <div class="card__links">
        ${
          book.deployed
            ? `<a class="btn" href="${href}">Open</a>`
            : '<span class="btn btn--off" aria-disabled="true">Not deployed yet</span>'
        }
        <a class="link" href="https://github.com/Abiel990310/${book.repo}">Source</a>
      </div>
    </article>`;
}

function renderStats(el: HTMLElement, book: Book, stats: Stats | null): void {
  if (!stats) {
    // Honest failure. Never zero, never a stale number.
    el.textContent = book.deployed
      ? 'Numbers unavailable — could not read its data.'
      : 'No site yet, so nothing to count.';
    el.classList.add('card__stats--none');
    return;
  }
  const chapters = `${stats.chapters} chapter${stats.chapters === 1 ? '' : 's'}`;
  const problems = `${stats.problems} problem${stats.problems === 1 ? '' : 's'}`;
  el.innerHTML = `<strong>${chapters}</strong> · <strong>${problems}</strong>`;
  el.classList.remove('card__stats--none');
}

const app = document.getElementById('app')!;
app.innerHTML = `
  <header class="top">
    <div class="top__bar">
      <span class="wordmark">Textbooks</span>
      <button id="theme" class="theme" aria-label="Switch between light and dark">◐</button>
    </div>
    <h1 class="lede">Books where every claim is checked by a program that runs.</h1>
    <p class="sub">
      Every code sample is compiled by a real compiler, every practice problem is
      graded by running it, and every mathematical result is verified
      symbolically. If something cannot be demonstrated, it does not get written.
    </p>
  </header>

  <main class="grid">${BOOKS.map(card).join('')}</main>

  <footer class="foot">
    <p>
      The AP books are <strong>not official College Board products</strong>. AP® is a
      trademark of the College Board, which does not endorse and is not involved
      with them. Every practice question is original.
    </p>
    <p>The counts above are read from each book's own published data, not maintained here.</p>
  </footer>`;

applyTheme(initialTheme());
document.getElementById('theme')!.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

for (const book of BOOKS) {
  const el = app.querySelector<HTMLElement>(`[data-repo="${book.repo}"] [data-stats]`);
  if (!el) continue;
  if (!book.deployed) {
    renderStats(el, book, null);
    continue;
  }
  void fetchStats(book.repo).then((stats) => renderStats(el, book, stats));
}
