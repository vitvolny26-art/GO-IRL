# Manual Beta Checklist

## 0. Local Helper Check
- [ ] Run local helper:

```bash
node beta-test.cjs
```

- [ ] Confirm required source files are present
- [ ] Confirm local `.env.local` contains required Supabase variable names if Supabase-backed flows are being tested
- [ ] Continue with the manual checks below

**Expected:** Helper completes without runtime errors. Dashboard/device checks are still manual.

---

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
- [ ] Verify link format: `https://t.me/[BOT_NAME]/[APP_NAME]?startapp=[ACTIVITY_ID]`
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
- [ ] Start dev server:

```bash
pnpm run dev
```

- [ ] Open local app in a normal browser, not inside Telegram
- [ ] Open Vercel app in a normal browser, not inside Telegram
- [ ] Confirm demo user is active: `Vit_Test` / `telegram:999999`
- [ ] Confirm Olomouc demo events are visible:
  - [ ] Volleyball
  - [ ] Board games
  - [ ] Running
  - [ ] Walking
  - [ ] Coffee meetup
  - [ ] Language exchange
- [ ] Create a demo activity
- [ ] Confirm message appears: `Изменения сохранены (Демо-режим)`
- [ ] Refresh the page
- [ ] Confirm the demo activity persists from local browser state
- [ ] Join/leave a demo activity
- [ ] Open sport event details
- [ ] Check Coach request flow
- [ ] Check Event Chat message flow
- [ ] Confirm browser demo writes do not appear in production Supabase tables

**Expected:** Browser without Telegram uses local demo state. Demo writes are allowed locally and must not touch production Supabase.

---

## 6. Event Cards: Time Rendering
- [ ] Open Home
- [ ] Compare generic cards and sport cards
- [ ] Confirm sport cards show event start time, not duration
- [ ] Confirm cards with invalid/empty time do not show an empty time badge
- [ ] Open sport event detail and confirm duration remains visible in details metadata

**Expected:** Card time rendering is consistent and no empty time badge appears.

---

## 7. Weather Widget
- [ ] Open a sport event within 7 days
- [ ] Confirm weather text appears after loading
- [ ] Expand weather details
- [ ] Confirm temperature bars are visible
- [ ] Confirm rain and wind values are visible
- [ ] Open/create sport event more than 7 days ahead
- [ ] Confirm forecast-available-later message appears

**Expected:** Weather works without API keys and does not break sport details.

---

## 8. Bug Report
- [ ] Open event details
- [ ] Open more menu
- [ ] Tap `Сообщить о баге`
- [ ] Confirm Telegram support link opens
- [ ] Confirm share text is not copied
- [ ] Confirm no alert popup appears

**Expected:** Bug report opens support link only.

---

## 9. Supabase: Table Integrity
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
