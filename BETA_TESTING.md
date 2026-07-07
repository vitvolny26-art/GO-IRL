# Beta Testing Quick Start

## Automated Checks
```bash
node beta-test.js
```

This verifies:
- ✓ Environment variables configured
- ✓ Source files present
- ✓ Supabase tables exist
- ✓ Demo mode links work

---

## Manual Testing Workflow

### 1. Start Dev Server
```bash
pnpm run dev
```

Opens browser to `http://localhost:5178`

### 2. Test Normal Mode
- [ ] View activity list
- [ ] Open sport activity card (should show details)
- [ ] Try to join activity
- [ ] Check members panel
- [ ] Verify no console errors

### 3. Test Demo Mode
```bash
# In browser, go to:
http://localhost:5178?demo=true
```

- [ ] View demo activities
- [ ] Try to join → should fail with error message
- [ ] Open console (F12) → check `ensureTrustedAuthForWrite()` guard
- [ ] Verify error is helpful (not black screen)

### 4. Test on Mobile (iOS/Android)

#### Share Link Test
1. Find sport activity in Telegram mini app
2. Tap share button
3. Copy link
4. Open link → should load activity in mini app
5. Try to join

#### Expected Link Format
```
https://t.me/[BOT_NAME]?startapp=[ACTIVITY_ID]
```

### 5. Check Vercel Deployment
1. Go to https://vercel.com/vitvolny26-art/go-irl
2. Check latest deployment status (should be green)
3. Open preview URL
4. Verify same functionality as localhost

### 6. Supabase Verification
1. Open Supabase dashboard
2. Check `Tables` section → verify all tables exist
3. Check `SQL Editor` → run verification queries
4. **DO NOT modify RLS policies** (just verify they're there)

---

## Quick Issue Template

If you find a bug:

```
## Issue: [Short title]

**Steps to reproduce:**
1. ...
2. ...
3. ...

**Expected behavior:**
[What should happen]

**Actual behavior:**
[What actually happens]

**Environment:**
- Device: iOS / Android / Browser
- Version: [App version if available]
- Screenshot/video: [Attach if possible]
```

---

## Ready to Test?

1. ✓ Run `node beta-test.js`
2. ✓ Start `pnpm run dev`
3. ✓ Open `BETA_CHECKLIST.md`
4. ✓ Go through each test systematically
5. ✓ Document any issues

**Let me know when you find issues!** 🚀
