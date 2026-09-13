/**
 * The family, and how to read each book's own numbers.
 *
 * Every book publishes `data/book.json` at its deployed root. The hub fetches
 * those and reports what is in them, so nothing here is a number somebody typed.
 * A figure that is maintained by hand is wrong within a week, and a dashboard
 * that misreports progress is worse than no dashboard at all.
 */

export interface Book {
  readonly repo: string;
  readonly title: string;
  readonly subject: string;
  /** Who it is for, in one line. */
  readonly audience: string;
  /** True once the book has a deployed site to fetch from. */
  readonly deployed: boolean;
  /** Said plainly when there is nothing to show yet. */
  readonly note?: string;
  readonly ap?: boolean;
}

export const BOOKS: readonly Book[] = [
  {
    repo: 'CppTB',
    title: 'C++',
    subject: 'A full C++ course, from first program to algorithms.',
    audience: 'Anyone learning C++ properly, and competitive programmers.',
    deployed: true,
  },
  {
    repo: 'JavaTB',
    title: 'Java',
    subject: 'Java and the JVM — objects, generics, streams, concurrency.',
    audience: 'Anyone learning Java beyond syntax.',
    deployed: true,
  },
  {
    repo: 'CsaTB',
    title: 'AP Computer Science A',
    subject: 'The exam, not the language: the tested subset and where the rubric gives points.',
    audience: 'Students sitting AP CSA.',
    deployed: true,
    ap: true,
    note: 'Just scaffolded — the engine runs, the chapters are not written yet.',
  },
  {
    repo: 'CalTB',
    title: 'AP Calculus AB/BC',
    subject: 'One book for both courses, where every worked result is checked by a program.',
    audience: 'Students sitting AP Calculus AB or BC.',
    deployed: false,
    ap: true,
    note: 'The verifier that checks the mathematics is built. The site is not.',
  },
  {
    repo: 'PhysTB',
    title: 'AP Physics C',
    subject: 'Mechanics and E&M, with every result checked against a simulation.',
    audience: 'Students sitting either Physics C exam.',
    deployed: false,
    ap: true,
    note: 'Planned. Shares CalTB’s machinery, so it waits on that.',
  },
];

export interface Stats {
  chapters: number;
  problems: number;
}

/**
 * Read one book's published data.
 *
 * Returns null rather than throwing or guessing. A book whose site is not up,
 * or whose data cannot be read, must show as exactly that — never as zero, and
 * never as a number carried over from a previous load.
 */
export async function fetchStats(repo: string): Promise<Stats | null> {
  try {
    const res = await fetch(`https://abiel990310.github.io/${repo}/data/book.json`, {
      cache: 'no-cache',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      nav?: unknown[];
      problems?: unknown[];
    };
    if (!Array.isArray(data.nav)) return null;
    return {
      chapters: data.nav.length,
      problems: Array.isArray(data.problems) ? data.problems.length : 0,
    };
  } catch {
    return null;
  }
}
