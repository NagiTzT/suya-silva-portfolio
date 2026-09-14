create extension if not exists pgcrypto with schema extensions;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  description text,
  cover_url text not null,
  featured boolean not null default false,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  unique (project_id, position)
);

create index if not exists projects_position_idx
  on public.projects (position);

create index if not exists project_images_project_position_idx
  on public.project_images (project_id, position);

alter table public.projects enable row level security;
alter table public.project_images enable row level security;

drop policy if exists "Public portfolio projects are readable" on public.projects;
create policy "Public portfolio projects are readable"
  on public.projects
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public portfolio images are readable" on public.project_images;
create policy "Public portfolio images are readable"
  on public.project_images
  for select
  to anon, authenticated
  using (true);

grant usage on schema public to anon, authenticated;
grant select on public.projects, public.project_images to anon, authenticated;
revoke insert, update, delete, truncate
  on public.projects, public.project_images
  from anon, authenticated;

