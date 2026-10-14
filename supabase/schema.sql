-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- One row per user. The whole reading journal is stored as JSON in "data".

create table if not exists public.journals (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security: each person can only touch their own row.
alter table public.journals enable row level security;

create policy "Read own journal"
  on public.journals for select
  using ((select auth.uid()) = user_id);

create policy "Create own journal"
  on public.journals for insert
  with check ((select auth.uid()) = user_id);

create policy "Update own journal"
  on public.journals for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Delete own journal"
  on public.journals for delete
  using ((select auth.uid()) = user_id);
