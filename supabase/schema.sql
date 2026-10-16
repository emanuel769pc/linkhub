-- ============================================================
--  LinkHub — Esquema de base de datos para Supabase
--  Pega TODO este archivo en:  Supabase → SQL Editor → New query
--  y pulsa RUN. Es seguro ejecutarlo una sola vez.
-- ============================================================

-- ── Tablas ──────────────────────────────────────────────────

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  client_name text not null,
  tagline text,
  avatar_path text,
  template_id text not null default 'estudio',
  theme jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  label text not null,
  url text not null,
  icon text not null default 'link',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists links_page_id_idx on public.links (page_id);

-- ── updated_at automático ───────────────────────────────────

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists pages_set_updated_at on public.pages;
create trigger pages_set_updated_at
  before update on public.pages
  for each row execute function public.set_updated_at();

-- ── Seguridad (RLS) ─────────────────────────────────────────
-- Público: solo lectura de páginas publicadas.
-- Usuario autenticado (tú, admin): control total.

alter table public.pages enable row level security;
alter table public.links enable row level security;

drop policy if exists "pages_public_read" on public.pages;
create policy "pages_public_read" on public.pages
  for select using (published = true);

drop policy if exists "pages_admin_all" on public.pages;
create policy "pages_admin_all" on public.pages
  for all to authenticated using (true) with check (true);

drop policy if exists "links_public_read" on public.links;
create policy "links_public_read" on public.links
  for select using (
    exists (
      select 1 from public.pages p
      where p.id = page_id and p.published = true
    )
  );

drop policy if exists "links_admin_all" on public.links;
create policy "links_admin_all" on public.links
  for all to authenticated using (true) with check (true);

-- ── Almacenamiento de fotos de perfil ───────────────────────

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatars_admin_insert" on storage.objects;
create policy "avatars_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'avatars');

drop policy if exists "avatars_admin_update" on storage.objects;
create policy "avatars_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'avatars');

drop policy if exists "avatars_admin_delete" on storage.objects;
create policy "avatars_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'avatars');

-- ✅ Listo. Ya puedes usar el panel de LinkHub.
