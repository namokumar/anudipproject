-- ============================================================
-- SupportSaaS — Row Level Security (RLS) for the tickets table
-- ============================================================
-- Run this in the Supabase SQL Editor AFTER creating the tickets table.
-- This ensures users can only access their own data.
--
-- IMPORTANT: RLS must be enabled before any production data is stored.
-- Without RLS, the anon key grants full table access to anyone.
-- ============================================================

-- 1. Enable RLS on the tickets table
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- 2. Policy: Users can SELECT only their own tickets
CREATE POLICY "Users can view own tickets"
  ON tickets
  FOR SELECT
  USING (auth.uid() = user_id);

-- 3. Policy: Users can INSERT tickets only for themselves
CREATE POLICY "Users can create own tickets"
  ON tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Policy: Users can UPDATE only their own tickets
CREATE POLICY "Users can update own tickets"
  ON tickets
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Policy: Users can DELETE only their own tickets (optional, disable if not needed)
CREATE POLICY "Users can delete own tickets"
  ON tickets
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- Admin override (optional): If you have an admin role column
-- ============================================================
-- Uncomment the following if you add a `role` column to auth.users metadata
-- and want admins to access all tickets:
--
-- CREATE POLICY "Admins can view all tickets"
--   ON tickets
--   FOR ALL
--   USING (
--     EXISTS (
--       SELECT 1 FROM auth.users
--       WHERE auth.users.id = auth.uid()
--       AND auth.users.raw_user_meta_data ->> 'role' = 'admin'
--     )
--   );
-- ============================================================
