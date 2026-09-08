-- The Clyve Portal: first persistent module
create extension if not exists pgcrypto;

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 500),
  due_at timestamptz,
  priority text not null default 'normal' check (priority in ('low','normal','high')),
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

-- Temporary single-user development policy. Replace with authenticated policy
-- as soon as Clyve authentication is connected.
create policy "temporary dev read" on public.tasks for select using (true);
create policy "temporary dev insert" on public.tasks for insert with check (true);
create policy "temporary dev update" on public.tasks for update using (true);
create policy "temporary dev delete" on public.tasks for delete using (true);

create index if not exists tasks_due_at_idx on public.tasks(due_at);
create index if not exists tasks_completed_idx on public.tasks(completed);
