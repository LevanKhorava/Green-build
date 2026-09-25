-- Green Build — editable site texts
-- Run this in the Supabase dashboard: SQL Editor → New query → Run.
-- Safe to re-run.

create table if not exists public.site_texts (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_texts enable row level security;

drop policy if exists "site_texts readable by everyone" on public.site_texts;
drop policy if exists "site_texts writable by anyone"   on public.site_texts;
drop policy if exists "site_texts updatable by anyone"  on public.site_texts;
drop policy if exists "site_texts deletable by anyone"  on public.site_texts;

-- Anyone may read — this is how the site loads its copy.
create policy "site_texts readable by everyone"
  on public.site_texts for select
  using (true);

-- /admin has no login, so writes use the public publishable key.
create policy "site_texts writable by anyone"
  on public.site_texts for insert
  to anon, authenticated
  with check (true);

create policy "site_texts updatable by anyone"
  on public.site_texts for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "site_texts deletable by anyone"
  on public.site_texts for delete
  to anon, authenticated
  using (true);
