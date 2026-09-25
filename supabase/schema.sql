-- Green Build — news table
-- Run this in the Supabase dashboard: SQL Editor → New query → Run.
-- Safe to re-run: existing policies are dropped first.

create table if not exists public.news (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  date        date not null default current_date,
  image_url   text not null,
  created_at  timestamptz not null default now()
);

alter table public.news enable row level security;

-- Clean up any earlier (auth-based) policies.
drop policy if exists "news is readable by everyone"              on public.news;
drop policy if exists "news is writable by authenticated users"   on public.news;
drop policy if exists "news is updatable by authenticated users"  on public.news;
drop policy if exists "news is deletable by authenticated users"  on public.news;
drop policy if exists "news is writable by anyone"                on public.news;
drop policy if exists "news is updatable by anyone"               on public.news;
drop policy if exists "news is deletable by anyone"               on public.news;

-- Anyone may read the news — this is how the public site loads it.
create policy "news is readable by everyone"
  on public.news for select
  using (true);

-- The /admin page has no login, so writes are done with the public anon key.
-- WARNING: anyone who knows the /admin URL (or the anon key, which ships in the
-- JS bundle) can add, edit and delete news. Keep the URL private, or put the
-- write policies back behind `to authenticated` and re-add a login.
create policy "news is writable by anyone"
  on public.news for insert
  to anon, authenticated
  with check (true);

create policy "news is updatable by anyone"
  on public.news for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "news is deletable by anyone"
  on public.news for delete
  to anon, authenticated
  using (true);

-- Optional: seed with the current static content.
insert into public.news (title, description, date, image_url) values
  ('გრინბილდი ახალ პროექტზე მუშაობას იწყებს',
   'მალე მომხმარებლებს შესაძლებლობა ექნებათ გაიცნონ კომპანიის ახალი საცხოვრებელი პროექტი.',
   '2026-06-08',
   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop'),
  ('გადახდის მოქნილი პირობები მომხმარებლებისთვის',
   'გრინბილდი აგრძელებს მომხმარებლებზე მორგებული შეთავაზებების შემუშავებას.',
   '2026-05-05',
   'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop');
