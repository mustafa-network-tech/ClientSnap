create extension if not exists "pgcrypto";

create table if not exists demos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  slug text unique not null,
  demo_url text not null,
  preview_image text,
  base_price numeric(10,2),
  short_description text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists custom_previews (
  id uuid primary key default gen_random_uuid(),
  demo_id uuid references demos(id) on delete cascade,
  company_name text not null,
  custom_title text,
  custom_description text,
  custom_price numeric(10,2),
  contact_name text,
  contact_phone text,
  contact_email text,
  preview_slug text unique not null,
  status text default 'active',
  created_at timestamp with time zone default now()
);

create index if not exists idx_demos_category on demos(category);
create index if not exists idx_demos_title on demos(title);
create index if not exists idx_custom_previews_slug on custom_previews(preview_slug);

