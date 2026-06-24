-- Security hardening — run in Supabase → SQL Editor → New query → Run
-- Adds missing RLS policies to prevent delete/update abuse

-- Guestbook: block delete and update
create policy "no delete" on guestbook for delete using (false);
create policy "no update" on guestbook for update using (false);

-- Visitor tips: block delete, enforce votes >= 0
drop policy if exists "public update votes" on visitor_tips;
create policy "public update votes" on visitor_tips for update using (true) with check (votes >= 0);
create policy "no delete" on visitor_tips for delete using (false);

-- Contact messages: allow read (needed for owner notifications), block delete
create policy "public read" on contact_messages for select using (true);
create policy "no delete" on contact_messages for delete using (false);
create policy "no update" on contact_messages for update using (false);

-- Issue reports: allow read (needed for owner notifications), block delete
create policy "public read" on issue_reports for select using (true);
create policy "no delete" on issue_reports for delete using (false);
create policy "no update" on issue_reports for update using (false);
