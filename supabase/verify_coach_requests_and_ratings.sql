-- Verification SQL for Coach Requests and Ratings Migration
-- Run this after applying the migration to verify all components are in place

-- 1. Check tables exist
SELECT 
  tablename,
  'EXIST' as status
FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('coach_profiles', 'coach_requests', 'coach_reviews')
ORDER BY tablename;

-- 2. Check RLS is enabled on all three tables
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('coach_profiles', 'coach_requests', 'coach_reviews')
ORDER BY tablename;

-- 3. Check RLS policies exist
SELECT
  schemaname,
  tablename,
  policyname,
  cmd as operation,
  qual as using_clause
FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('coach_profiles', 'coach_requests', 'coach_reviews')
ORDER BY tablename, policyname;

-- 4. Check functions exist
SELECT
  routine_schema,
  routine_name,
  routine_type,
  data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public' AND routine_name IN ('go_irl_recalculate_coach_rating', 'go_irl_trigger_recalculate_coach_rating')
ORDER BY routine_name;

-- 5. Check trigger exists
SELECT
  trigger_schema,
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public' AND trigger_name = 'coach_reviews_update_rating';

-- 6. Check indexes exist
SELECT
  schemaname,
  indexname,
  tablename
FROM pg_indexes
WHERE schemaname = 'public' AND indexname LIKE 'idx_coach%'
ORDER BY tablename, indexname;

-- 7. Check constraints on coach_requests (request_type, status, payment_mode)
SELECT
  constraint_name,
  constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'public' AND table_name = 'coach_requests'
ORDER BY constraint_name;

-- 8. Check unique constraint on coach_reviews (coach_profile_id, activity_id, reviewer_user_key)
SELECT
  constraint_name,
  constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'public' AND table_name = 'coach_reviews'
AND constraint_type = 'UNIQUE'
ORDER BY constraint_name;

-- 9. Verify coach_profiles columns (especially separate from user ratings)
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'coach_profiles'
ORDER BY ordinal_position;

-- 10. Verify coach_reviews columns (rating fields are separate)
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'coach_reviews'
ORDER BY ordinal_position;

-- 11. Verify coach_requests columns (payment_mode is info-only, no payment processing)
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'coach_requests'
ORDER BY ordinal_position;

-- 12. Verify no Stripe or payment columns
SELECT COUNT(*) as payment_related_columns
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name IN ('coach_profiles', 'coach_requests', 'coach_reviews')
  AND (column_name LIKE '%stripe%' OR column_name LIKE '%payment_id%' OR column_name LIKE '%transaction%');

-- 13. Check foreign key relationships
SELECT
  constraint_name,
  table_name,
  column_name,
  referenced_table_name,
  referenced_column_name
FROM information_schema.key_column_usage
WHERE table_schema = 'public' AND table_name IN ('coach_profiles', 'coach_requests', 'coach_reviews')
  AND referenced_table_name IS NOT NULL
ORDER BY table_name, constraint_name;

-- 14. Test rating calculation function signature
SELECT
  routine_schema,
  routine_name,
  parameters,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public' AND routine_name = 'go_irl_recalculate_coach_rating';

-- 15. Summary report
WITH table_check AS (
  SELECT COUNT(*) as tables_count
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename IN ('coach_profiles', 'coach_requests', 'coach_reviews')
),
rls_check AS (
  SELECT COUNT(*) as rls_enabled_count
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename IN ('coach_profiles', 'coach_requests', 'coach_reviews')
    AND rowsecurity = true
),
policy_check AS (
  SELECT COUNT(*) as policies_count
  FROM pg_policies
  WHERE schemaname = 'public' AND tablename IN ('coach_profiles', 'coach_requests', 'coach_reviews')
),
function_check AS (
  SELECT COUNT(*) as functions_count
  FROM information_schema.routines
  WHERE routine_schema = 'public' 
    AND routine_name IN ('go_irl_recalculate_coach_rating', 'go_irl_trigger_recalculate_coach_rating')
),
trigger_check AS (
  SELECT COUNT(*) as triggers_count
  FROM information_schema.triggers
  WHERE trigger_schema = 'public' AND trigger_name = 'coach_reviews_update_rating'
),
index_check AS (
  SELECT COUNT(*) as indexes_count
  FROM pg_indexes
  WHERE schemaname = 'public' AND indexname LIKE 'idx_coach%'
)
SELECT
  table_check.tables_count as "✓ Tables Created",
  rls_check.rls_enabled_count as "✓ RLS Enabled",
  policy_check.policies_count as "✓ RLS Policies",
  function_check.functions_count as "✓ Functions",
  trigger_check.triggers_count as "✓ Triggers",
  index_check.indexes_count as "✓ Indexes"
FROM table_check, rls_check, policy_check, function_check, trigger_check, index_check;

-- 16. Verify coach rating is completely separate from user ratings
-- Coach ratings table should NOT reference user_roles or have user_rating fields
SELECT
  column_name
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'coach_profiles'
  AND (column_name LIKE '%user_rating%' OR column_name LIKE '%organizer_rating%')
UNION ALL
SELECT
  column_name
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'coach_reviews'
  AND (column_name LIKE '%user_rating%' OR column_name LIKE '%organizer_rating%');

-- Expected output: (empty result set - no conflicting rating columns)
