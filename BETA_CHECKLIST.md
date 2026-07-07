# Manual Beta Checklist

## 1. Vercel: Latest Deployment
- [ ] Go to https://vercel.com/vitvolny26-art/go-irl
- [ ] Check that latest deployment from `main` is **READY** (green checkmark)
- [ ] Click on deployment → Preview URL should work
- [ ] Note deployment time and commit hash

**Expected:** Green status, no errors

---

## 2. Telegram: Bot Configuration
- [ ] Open Telegram bot settings: @BotFather
- [ ] Check bot name (should be `GO_IRL_BOT_USERNAME` from .env)
- [ ] Check mini app name (should match `APP_NAME`)
- [ ] Verify webhook is active

**Expected:** Bot responds to /start, mini app link works

---

## 3. iOS: Share & Join Link
- [ ] Open Telegram on iPhone
- [ ] Find a sport activity card
- [ ] Tap share button (Share2 icon)
- [ ] Select "Copy link"
- [ ] Paste link in Notes app
- [ ] Verify link format: `https://t.me/[BOT_NAME]?startapp=[ACTIVITY_ID]`
- [ ] Tap link → should open mini app with activity loaded
- [ ] Check if you can join/request

**Expected:** Link works, activity loads, no black screen

---

## 4. Android: Share & Join Link
- [ ] Same as iOS but on Android device/emulator
- [ ] Verify link opens mini app
- [ ] Check join/request works

**Expected:** Same behavior as iOS

---

## 5. Browser: Demo Mode
- [ ] Open: `http://localhost:5178?demo=true`
- [ ] Check that demo user is loaded (should see demo activities)
- [ ] Try to join an activity (POST)
- [ ] Check browser console for `ensureTrustedAuthForWrite()` guard
- [ ] Verify write operations show error (demo mode blocks writes)

**Demo write tests:**
- [ ] Try to create activity → should fail
- [ ] Try to join activity → should fail  
- [ ] Try to delete activity → should fail
- [ ] Chat/coach features → should fail

**Expected:** All writes blocked with appropriate error messages

---

## 6. Supabase: Table Integrity
- [ ] Open Supabase dashboard
- [ ] Check tables exist (no manual changes):
  - [ ] `activities`
  - [ ] `activity_members`
  - [ ] `user_roles`
  - [ ] `coach_profiles`
  - [ ] `coach_requests`
  - [ ] `activity_chats` (if migrations ran)
  - [ ] `activity_chat_messages` (if migrations ran)

**RLS Policies Check:**
- [ ] View RLS policies on each table
- [ ] Verify `go_irl_request_user_key()` function exists
- [ ] Verify `go_irl_request_is_admin()` function exists
- [ ] **DO NOT modify RLS policies** (just verify they exist)

**Data Integrity:**
- [ ] Check sample activity record has all required fields
- [ ] Check member records have correct statuses: `joined`, `waiting`, `pending`
- [ ] Verify no orphaned records

**Expected:** Tables intact, RLS policies unchanged, data looks valid

---

## Issues Found
Document any issues:

```
Issue #1: [Description]
- Steps to reproduce
- Expected vs actual
- Screenshot/video if possible
- Severity: Critical / High / Medium / Low

Issue #2: [...]
```

---

## Sign-off
- [ ] Tester name: ________________
- [ ] Date: ________________
- [ ] All tests passed: YES / NO
- [ ] Ready for production: YES / NO

---

## Notes
[Any additional observations, performance issues, UI glitches, etc.]
