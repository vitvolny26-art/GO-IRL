const fs = require('fs');

const file = 'artifacts/go-irl/src/components/EventSheet.tsx';
let c = fs.readFileSync(file,'utf-8');

// добавим supabase импорт
if (!c.includes('from \'../lib/supabaseClient\'')) {
  c = c.replace(
    /import.*\n/,
    `$&import { supabase } from '../lib/supabaseClient'\n`
  );
}

// заменим console.log на insert
c = c.replace(
  /console\.log\('BUG REPORT:', text\);/,
`await supabase.from('bug_reports').insert({
  message: text,
  created_at: new Date().toISOString()
});`
);

fs.writeFileSync(file,c);
console.log('feedback → supabase connected');
