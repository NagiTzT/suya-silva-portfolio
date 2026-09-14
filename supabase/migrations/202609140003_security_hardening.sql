-- Defesa em profundidade: mesmo o proprietário das tabelas fica sujeito a RLS.
-- Roles com BYPASSRLS, como service_role/Secret key, continuam administrativas.
alter table public.projects force row level security;
alter table public.project_images force row level security;

-- Nenhum privilégio é herdado pelo pseudo-role PUBLIC. O frontend recebe
-- somente SELECT por meio das roles anon/authenticated e das políticas RLS.
revoke all privileges on public.projects, public.project_images from public;
revoke insert, update, delete, truncate, references, trigger
  on public.projects, public.project_images
  from anon, authenticated;
grant select on public.projects, public.project_images to anon, authenticated;

