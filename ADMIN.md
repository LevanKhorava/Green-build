# Admin panel (`/admin`) — setup

The site has no backend of its own. News is stored in **Supabase** (free hosted
Postgres), so anything published at `/admin` is instantly visible to every
visitor without a redeploy.

`/admin` is **open — there is no login**. See [Security](#security) below.

| Route          | What you manage                                  |
| -------------- | ------------------------------------------------ |
| `/admin`         | News — add, edit, delete                         |
| `/admin/reviews` | Review videos — add, edit, delete                |
| `/admin/texts`   | Site copy — headings, paragraphs, labels, footer |

## 1. Create the Supabase project

1. Sign up at <https://supabase.com> → **New project** (free tier is enough).
2. Wait for the project to finish provisioning.

## 2. Create the table

Open **SQL Editor → New query**, paste the contents of each file below and
press **Run**. Both are safe to re-run — they drop the old policies first.

1. [`supabase/schema.sql`](supabase/schema.sql) — the `news` table
2. [`supabase/site_texts.sql`](supabase/site_texts.sql) — the `site_texts` table
3. [`supabase/reviews.sql`](supabase/reviews.sql) — the `reviews` table (review videos)

Both get row-level-security policies that let anyone read *and* write, since the
page sends requests with the public publishable key.

## 3. Add the keys

This project uses **no .env files** — all client-side keys live in
[`src/config.ts`](src/config.ts). Open **Project Settings → API** in Supabase
and fill in the two empty values:

```ts
export const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGci...";
```

Use the **anon public** key. Never put the *service_role* key here — it ignores
every policy, and this file ships inside the public JS bundle.

Restart `npm run dev` after editing the file. Deploys need nothing extra: the
values are part of the source, so Vercel and GitHub Pages pick them up
automatically.

## Security

With no login, the `/admin` URL is the only thing standing between the public
and your news: anyone who opens `https://your-site/admin` can add, edit or
delete items, and the same is true for anyone who reads the anon key out of the
JS bundle and calls the API directly. Nothing else on the site links to
`/admin`, and it is not in the header, footer or sitemap — but treat the URL as
a secret.

If you later want it locked down, the options in increasing strength are:

1. **A shared password kept in the frontend** — stops casual visitors, but the
   password is readable in the bundle, and the API stays open.
2. **Supabase Auth login** (what this project had before) — real protection:
   the write policies go back to `to authenticated` and the API rejects
   anonymous writes. Roughly 30 lines of code plus one user in the dashboard.

Note that `src/config.ts` is committed to git, so on a public repo the anon key
is visible there as well as in the bundle.

## How it fits together

| File                       | Role                                                   |
| -------------------------- | ------------------------------------------------------ |
| `src/config.ts`            | Supabase + EmailJS keys (no .env files)                 |
| `src/lib/supabase.ts`      | Client; `isSupabaseConfigured` when keys are missing    |
| `src/lib/newsApi.ts`       | fetch / create / update / delete, row ⇄ `NewsItem`      |
| `src/hooks/useNews.ts`     | Public read used by the news page and home carousel     |
| `src/lib/reviewsApi.ts`    | Review videos CRUD, row ⇄ `Video`                       |
| `src/hooks/useReviews.ts`  | Public read used by the reviews page and home section   |
| `src/data/siteTexts.ts`    | Every editable string + its default + admin grouping    |
| `src/lib/textsApi.ts`      | Reads overrides, upserts edits, deletes on reset        |
| `src/hooks/siteTexts.ts`   | `useText()` — `t("home.hero.title")` in components       |
| `src/pages/admin/`         | Admin shell + news CRUD screen                          |
| `src/data/news.ts`         | Static fallback if the DB is unconfigured/unreachable   |

Because of that fallback the site never breaks: with no keys set, visitors see
the three original hard-coded items and `/admin` shows a configuration notice.

## Editing site texts

Only *changed* strings are stored — `site_texts` holds one row per override, and
every other string comes from `defaultTexts` in
[`src/data/siteTexts.ts`](src/data/siteTexts.ts). "საწყისზე დაბრუნება" deletes
the rows for that section, restoring the original wording.

To make a new string editable: add a key to `defaultTexts`, list it in the
matching group in `textGroups`, then render it with `useText()` instead of a
literal.

The interactive building, the projects page and the home projects section are
deliberately **not** editable — their copy is still hardcoded. The video card
label and the lightbox close label are also fixed, since review videos are
managed at `/admin/reviews` instead.

## Review videos

`/admin/reviews` works like the news screen. Paste a full YouTube link — watch,
`youtu.be`, embed or shorts — and the id is extracted automatically; a bare id
works too. The first three videos appear on the home page, all of them on
`/reviews`, ordered oldest first.
