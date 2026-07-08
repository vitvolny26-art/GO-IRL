# Task 5 Profile Fix Report

Generated: 2026-07-08

Status: **partly implemented / production avatar storage pending**.

## Goal

Profile fix requirements:

- edit profile button should save, not close;
- profile data should persist;
- avatar upload:
  - production -> Supabase Storage `avatars`;
  - demo -> base64/local state.

## Current implementation findings

| Requirement | Status | Evidence |
|---|---|---|
| Button says Save / `Сохранить` | Implemented | Profile edit form submit button uses `t.save`. |
| Profile persists | Implemented | `saveProfile()` writes `go-irl-profile` to `localStorage`. |
| Demo avatar upload | Implemented | File input reads image with `FileReader` and stores data URL in `avatarDraft`. |
| Profile avatar rendering | Implemented | Data URLs render as `<img src={profile.avatar} />`; initials/emoji avatars render as text. |
| City sync | Implemented | Save calls `setSelectedCity(nextProfile.cityId)`. |
| Production Supabase Storage avatar upload | Pending | Not implemented in current profile flow. |

## Current safe behavior

Profile data currently stays local:

- name;
- bio;
- city;
- avatar;
- favorite activities;
- registered date.

This is safe for browser demo mode and does not write to production Supabase.

## Why production avatar upload is not changed here

Supabase Storage avatar upload touches production-sensitive areas:

- Storage bucket `avatars`;
- Storage RLS policies;
- authenticated user mapping;
- trusted Telegram auth session;
- profile table ownership.

Per project rules, Supabase RLS/auth/destructive SQL/storage policy changes are not touched without explicit separate approval.

## Next safe step

Before implementing production avatar upload, prepare a small dedicated plan:

1. Inspect existing Supabase storage docs/migrations.
2. Confirm whether `avatars` bucket exists.
3. Confirm trusted auth maps Telegram user to a stable profile row.
4. Add non-destructive upload path only after bucket/policies are confirmed.

## Manual UI check

1. Open Profile.
2. Click edit profile.
3. Confirm button text is `Сохранить`.
4. Change name/bio/city/favorites.
5. Upload avatar image in browser demo.
6. Save.
7. Refresh.
8. Confirm profile persisted.
