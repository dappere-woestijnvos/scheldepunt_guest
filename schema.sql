-- Scheldepunt Guest App — Supabase schema
-- Run this once in Supabase → SQL Editor → New query → Run

-- ── Guestbook ─────────────────────────────────────────────────
create table if not exists guestbook (
  id         bigint generated always as identity primary key,
  name       text not null,
  "from"     text default 'Somewhere',
  text       text not null,
  created_at timestamptz default now()
);
alter table guestbook enable row level security;
create policy "public read"   on guestbook for select using (true);
create policy "public insert" on guestbook for insert with check (true);
create policy "no delete"    on guestbook for delete using (false);
create policy "no update"    on guestbook for update using (false);

-- ── Visitor tips (Ghent tab) ───────────────────────────────────
create table if not exists visitor_tips (
  id          bigint generated always as identity primary key,
  name        text default 'A guest',
  place       text not null,
  description text not null,
  votes       integer default 0,
  created_at  timestamptz default now()
);
alter table visitor_tips enable row level security;
create policy "public read"         on visitor_tips for select using (true);
create policy "public insert"       on visitor_tips for insert with check (true);
create policy "public update votes" on visitor_tips for update using (true) with check (votes >= 0);
create policy "no delete"           on visitor_tips for delete using (false);

-- ── Contact messages (insert-only, no read/delete by guests) ───
create table if not exists contact_messages (
  id         bigint generated always as identity primary key,
  name       text not null,
  phone      text,
  message    text not null,
  created_at timestamptz default now()
);
alter table contact_messages enable row level security;
create policy "public insert" on contact_messages for insert with check (true);
create policy "public read"   on contact_messages for select using (true);
create policy "no delete"     on contact_messages for delete using (false);
create policy "no update"     on contact_messages for update using (false);

-- ── Issue reports ──────────────────────────────────────────────
create table if not exists issue_reports (
  id          bigint generated always as identity primary key,
  category    text not null,
  description text not null,
  room        text,
  resolved    boolean default false,
  created_at  timestamptz default now()
);
alter table issue_reports enable row level security;
create policy "public insert" on issue_reports for insert with check (true);
create policy "public read"   on issue_reports for select using (true);
create policy "no delete"     on issue_reports for delete using (false);
create policy "no update"     on issue_reports for update using (false);
