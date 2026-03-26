create extension if not exists "pgcrypto";

create table if not exists demos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  tags text[] not null default '{}'::text[],
  slug text unique not null,
  demo_url text not null,
  preview_image text,
  base_price numeric(10,2),
  short_description text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

alter table demos
add column if not exists tags text[] not null default '{}'::text[];

create table if not exists custom_previews (
  id uuid primary key default gen_random_uuid(),
  demo_id uuid references demos(id) on delete cascade,
  company_name text not null,
  custom_title text,
  custom_description text,
  custom_price numeric(10,2),
  custom_cover_image text,
  accent_color text,
  hero_primary_cta text,
  hero_secondary_cta text,
  contact_name text,
  contact_phone text,
  contact_email text,
  preview_slug text unique not null,
  status text default 'active',
  created_at timestamp with time zone default now()
);

alter table custom_previews
add column if not exists custom_cover_image text;
alter table custom_previews
add column if not exists accent_color text;
alter table custom_previews
add column if not exists hero_primary_cta text;
alter table custom_previews
add column if not exists hero_secondary_cta text;

create index if not exists idx_demos_category on demos(category);
create index if not exists idx_demos_title on demos(title);
create index if not exists idx_demos_tags_gin on demos using gin (tags);
create index if not exists idx_custom_previews_slug on custom_previews(preview_slug);

create or replace function public.search_demos(search_text text)
returns setof demos
language sql
stable
as $$
  select d.*
  from demos d
  where d.is_active = true
    and (
      coalesce(search_text, '') = ''
      or d.title ilike '%' || search_text || '%'
      or d.category ilike '%' || search_text || '%'
      or exists (
        select 1
        from unnest(coalesce(d.tags, '{}'::text[])) as t(tag)
        where t.tag ilike '%' || search_text || '%'
      )
    )
  order by d.created_at desc;
$$;

