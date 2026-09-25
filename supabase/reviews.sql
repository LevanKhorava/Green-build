-- Green Build — review videos
-- Run this in the Supabase dashboard: SQL Editor → New query → Run.
-- Safe to re-run.

create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  youtube_id text not null,
  title      text not null,
  author     text not null,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

drop policy if exists "reviews readable by everyone" on public.reviews;
drop policy if exists "reviews writable by anyone"   on public.reviews;
drop policy if exists "reviews updatable by anyone"  on public.reviews;
drop policy if exists "reviews deletable by anyone"  on public.reviews;

create policy "reviews readable by everyone"
  on public.reviews for select
  using (true);

create policy "reviews writable by anyone"
  on public.reviews for insert
  to anon, authenticated
  with check (true);

create policy "reviews updatable by anyone"
  on public.reviews for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "reviews deletable by anyone"
  on public.reviews for delete
  to anon, authenticated
  using (true);

-- Seed with the videos that are currently hardcoded.
insert into public.reviews (youtube_id, title, author) values
  ('Dv6Ewpn2w5g', 'ვიდეო 1', 'ანა ნაზარიანი'),
  ('5hmAV373oRA', 'ვიდეო 2', 'დიმიტრი კრემერი'),
  ('R4Y0kHgCK6s', 'ვიდეო 3', 'ზურაბ გონაშვილი'),
  ('n7jltvM_UKw', 'ვიდეო 4', 'მაია გიორგაძე'),
  ('rBfxflgmIF4', 'ვიდეო 5', 'თეიმურ გომელაური');
