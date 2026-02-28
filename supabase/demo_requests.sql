create table if not exists public.opttera_demo_requests (
  id bigserial primary key,
  name text not null,
  company text not null,
  role text null,
  email text not null,
  use_case text not null,
  data_sources text[] not null default '{}',
  notes text null,
  submitted_at timestamptz not null default now(),
  source_ip text null,
  user_agent text null
);

create index if not exists idx_opttera_demo_requests_submitted_at
  on public.opttera_demo_requests (submitted_at desc);

create index if not exists idx_opttera_demo_requests_email
  on public.opttera_demo_requests (email);
