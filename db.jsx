// ─── Supabase REST client ────────────────────────────────────
// Reads supabaseUrl + supabaseKey from window.APARTMENT (set in data.jsx).
// All functions return Promises. When Supabase is not configured they
// resolve/reject gracefully so callers can fall back to local state.

const DB = (() => {
  function cfg() {
    const A = window.APARTMENT;
    return { url: A?.supabaseUrl?.replace(/\/$/, ''), key: A?.supabaseKey };
  }

  function ready() {
    const { url, key } = cfg();
    return !!(url && key);
  }

  async function req(path, method = 'GET', body, extraHeaders = {}) {
    const { url, key } = cfg();
    if (!url || !key) throw new Error('db_not_configured');
    const headers = {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...extraHeaders,
    };
    if (method !== 'GET') headers['Prefer'] = 'return=representation';
    const res = await fetch(`${url}/rest/v1/${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.message || err.hint || err.details || `HTTP ${res.status}`;
      console.error(`[DB] ${method} ${path} → ${res.status}:`, msg, '\nHint: if 401, check supabaseKey in data.jsx (use the anon JWT from Supabase → Settings → API, not the publishable key)');
      throw new Error(msg);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  return {
    ready,

    // ── Guestbook ──────────────────────────────────────────────
    getEntries() {
      return req('guestbook?order=created_at.desc&limit=200');
    },
    addEntry({ name, from, text }) {
      return req('guestbook', 'POST', { name, from: from || 'Somewhere', text });
    },

    // ── Visitor tips (Ghent tab) ───────────────────────────────
    getTips() {
      return req('visitor_tips?order=votes.desc,created_at.desc&limit=200');
    },
    addTip({ name, place, description }) {
      return req('visitor_tips', 'POST', { name: name || 'A guest', place, description });
    },
    // Optimistic: pass current votes so we can increment without re-fetch
    vote(id, currentVotes, delta) {
      return req(
        `visitor_tips?id=eq.${id}`,
        'PATCH',
        { votes: Math.max(0, currentVotes + delta) },
      );
    },

    // ── Contact form ───────────────────────────────────────────
    sendMessage({ name, phone, message }) {
      return req('contact_messages', 'POST', {
        name,
        phone: phone || null,
        message,
      });
    },

    // ── Issue reports ──────────────────────────────────────────
    reportIssue({ category, description, room }) {
      return req('issue_reports', 'POST', {
        category,
        description,
        room: room || null,
      });
    },
  };
})();

window.DB = DB;

// ── SQL schema (run once in Supabase SQL editor) ─────────────
// Paste this into your Supabase project → SQL Editor → New query
/*
-- Guestbook
create table if not exists guestbook (
  id        bigint generated always as identity primary key,
  name      text not null,
  "from"    text default 'Somewhere',
  text      text not null,
  created_at timestamptz default now()
);
alter table guestbook enable row level security;
create policy "public read"   on guestbook for select using (true);
create policy "public insert" on guestbook for insert with check (true);

-- Visitor tips
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
create policy "public update votes" on visitor_tips for update using (true) with check (true);

-- Contact messages (owner reads in Supabase dashboard)
create table if not exists contact_messages (
  id         bigint generated always as identity primary key,
  name       text not null,
  phone      text,
  message    text not null,
  created_at timestamptz default now()
);
alter table contact_messages enable row level security;
create policy "public insert" on contact_messages for insert with check (true);

-- Issue reports (owner reads in Supabase dashboard)
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
*/
