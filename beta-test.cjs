#!/usr/bin/env node
/**
 * GO IRL Beta Test Helper
 * Local smoke helper for manual beta testing.
 *
 * Note: this script does not call Vercel, Telegram, or Supabase APIs.
 * It verifies local prerequisites and prints the manual checks that must be completed.
 */

const fs = require('fs');
const path = require('path');

const tests = {
  vercel: {
    name: 'Vercel Deployment Manual Check',
    check: () => {
      console.log('\n✓ Manual Vercel check:');
      console.log('  https://vercel.com/vitvolny26-art/go-irl');
      console.log('  - Verify latest deployment is READY (green)');
      console.log('  - Open the latest preview/production URL');
      console.log('  - Note commit hash and deploy time');
      return true;
    }
  },

  environment: {
    name: 'Local Environment Variables',
    check: () => {
      const envFile = path.join(__dirname, '.env.local');
      if (!fs.existsSync(envFile)) {
        console.log('\n⚠ .env.local not found');
        console.log('  Create it locally if you need to test Supabase-backed flows.');
        return false;
      }

      const env = fs.readFileSync(envFile, 'utf8');
      const hasSupabaseUrl = env.includes('VITE_SUPABASE_URL=');
      const hasSupabaseKey = env.includes('VITE_SUPABASE_PUBLISHABLE_KEY=');

      console.log('\n✓ Local environment variables:');
      console.log(`  VITE_SUPABASE_URL: ${hasSupabaseUrl ? 'OK' : 'MISSING'}`);
      console.log(`  VITE_SUPABASE_PUBLISHABLE_KEY: ${hasSupabaseKey ? 'OK' : 'MISSING'}`);

      return hasSupabaseUrl && hasSupabaseKey;
    }
  },

  srcFiles: {
    name: 'Required Source Files',
    check: () => {
      const required = [
        'src/App.tsx',
        'src/store.ts',
        'src/types.ts',
        'src/authSession.ts',
        'src/verticals/SportVertical.tsx',
      ];

      console.log('\n✓ Required source files:');
      const missing = required.filter((filePath) => !fs.existsSync(path.join(__dirname, filePath)));

      required.forEach((filePath) => {
        const exists = fs.existsSync(path.join(__dirname, filePath));
        console.log(`  ${exists ? '✓' : '✗'} ${filePath}`);
      });

      return missing.length === 0;
    }
  },

  supabase: {
    name: 'Supabase Tables Manual Check',
    check: () => {
      console.log('\n✓ Manual Supabase table check:');
      const tables = [
        'activities',
        'activity_members',
        'user_roles',
        'coach_profiles',
        'coach_requests',
        'activity_chats',
        'activity_chat_messages',
      ];

      tables.forEach((tableName) => console.log(`  - ${tableName}`));
      console.log('\n  Verify these in the Supabase dashboard.');
      console.log('  Do NOT modify RLS policies manually.');

      return true;
    }
  },

  demo: {
    name: 'Demo Mode Manual Check',
    check: () => {
      console.log('\n✓ Manual demo links:');
      console.log('  - http://localhost:5178');
      console.log('  - http://localhost:5178?demo=true');
      console.log('\n  In demo mode:');
      console.log('  ✓ Can view activities');
      console.log('  ✗ Cannot create/join/delete (writes blocked)');

      return true;
    }
  }
};

console.log('╔════════════════════════════════════════╗');
console.log('║   GO IRL Manual Beta Test Helper      ║');
console.log('╚════════════════════════════════════════╝');

let passed = 0;
let failed = 0;

Object.entries(tests).forEach(([, test]) => {
  try {
    const result = test.check();
    if (result) {
      passed += 1;
      console.log(`\n[✓] ${test.name}`);
    } else {
      failed += 1;
      console.log(`\n[✗] ${test.name}`);
    }
  } catch (err) {
    failed += 1;
    console.log(`\n[✗] ${test.name}`);
    console.log(`    Error: ${err.message}`);
  }
});

console.log('\n' + '='.repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40));

console.log('\nNext steps:');
console.log('1. Run pnpm run dev');
console.log('2. Open BETA_CHECKLIST.md for detailed test procedures');
console.log('3. Test on iOS and Android devices');
console.log('4. Verify Vercel deployment is live');
console.log('5. Document any issues found\n');

process.exit(failed > 0 ? 1 : 0);
