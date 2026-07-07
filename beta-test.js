#!/usr/bin/env node
/**
 * GO IRL Beta Test Script
 * Tests deployment, auth, and basic functionality
 */

const fs = require('fs');
const path = require('path');

const tests = {
  vercel: {
    name: 'Vercel Deployment',
    check: () => {
      console.log('\n✓ Check Vercel dashboard:');
      console.log('  https://vercel.com/vitvolny26-art/go-irl');
      console.log('  - Verify latest deployment is READY (green)');
      console.log('  - Note commit hash and deploy time');
      return true;
    }
  },

  telegram: {
    name: 'Telegram Bot Configuration',
    check: () => {
      const envFile = path.join(__dirname, '.env.local');
      if (!fs.existsSync(envFile)) {
        console.log('⚠ .env.local not found');
        return false;
      }
      
      const env = fs.readFileSync(envFile, 'utf8');
      const hasSupabase = env.includes('VITE_SUPABASE_URL');
      const hasKey = env.includes('VITE_SUPABASE_PUBLISHABLE_KEY');
      
      console.log('\n✓ Environment variables:');
      console.log(`  Supabase URL: ${hasSupabase ? 'OK' : 'MISSING'}`);
      console.log(`  Supabase Key: ${hasKey ? 'OK' : 'MISSING'}`);
      
      return hasSupabase && hasKey;
    }
  },

  srcFiles: {
    name: 'Source Code Files',
    check: () => {
      const required = [
        'src/App.tsx',
        'src/store.ts',
        'src/types.ts',
        'src/authSession.ts',
        'src/verticals/SportVertical.tsx',
      ];
      
      console.log('\n✓ Required files:');
      const missing = required.filter(f => !fs.existsSync(path.join(__dirname, f)));
      
      required.forEach(f => {
        const exists = fs.existsSync(path.join(__dirname, f));
        console.log(`  ${exists ? '✓' : '✗'} ${f}`);
      });
      
      return missing.length === 0;
    }
  },

  supabase: {
    name: 'Supabase Tables',
    check: () => {
      console.log('\n✓ Required Supabase tables (verify in dashboard):');
      const tables = [
        'activities',
        'activity_members',
        'user_roles',
        'coach_profiles',
        'coach_requests',
        'activity_chats',
        'activity_chat_messages',
      ];
      
      tables.forEach(t => console.log(`  - ${t}`));
      console.log('\n  Do NOT modify RLS policies manually!');
      
      return true;
    }
  },

  demo: {
    name: 'Demo Mode Links',
    check: () => {
      console.log('\n✓ Test links (open in browser):');
      console.log('  - http://localhost:5178 (normal mode)');
      console.log('  - http://localhost:5178?demo=true (demo mode)');
      console.log('\n  In demo mode:');
      console.log('  ✓ Can view activities');
      console.log('  ✗ Cannot create/join/delete (writes blocked)');
      
      return true;
    }
  }
};

console.log('╔════════════════════════════════════════╗');
console.log('║   GO IRL Manual Beta Test Checklist   ║');
console.log('╚════════════════════════════════════════╝');

let passed = 0;
let failed = 0;

Object.entries(tests).forEach(([key, test]) => {
  try {
    const result = test.check();
    if (result) {
      passed++;
      console.log(`\n[✓] ${test.name}`);
    } else {
      failed++;
      console.log(`\n[✗] ${test.name}`);
    }
  } catch (err) {
    failed++;
    console.log(`\n[✗] ${test.name}`);
    console.log(`    Error: ${err.message}`);
  }
});

console.log('\n' + '='.repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40));

console.log('\nNext steps:');
console.log('1. Open BETA_CHECKLIST.md for detailed test procedures');
console.log('2. Test on iOS and Android devices');
console.log('3. Verify Vercel deployment is live');
console.log('4. Document any issues found\n');

process.exit(failed > 0 ? 1 : 0);
