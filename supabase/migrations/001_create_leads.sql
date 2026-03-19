-- Migration: Create leads table for contact form submissions

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  email       text,
  message     text,
  created_at  timestamptz not null default now()
);

-- Index for sorting by date
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Only the service role can read/write (no public access)
create policy "service role only" on public.leads
  using (auth.role() = 'service_role');
