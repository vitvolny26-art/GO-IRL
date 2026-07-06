const fs = require('fs');

const file = 'artifacts/go-irl/src/verticals/SportVertical.tsx';
let c = fs.readFileSync(file,'utf-8');

// добавим импорт toast если нет
if (!c.includes('from "sonner"')) {
  c = c.replace(
    /import.*\n/,
    `$&import { toast } from 'sonner'\n`
  );
}

// заменим alert на toast
c = c.replace(
  /window\.alert\(["'`]Ссылка скопирована["'`]\)/g,
  `toast.success('✅ Ссылка скопирована')`
);

c = c.replace(
  /window\.alert\(["'`]Invite link copied["'`]\)/g,
  `toast.success('🔗 Invite link copied')`
);

fs.writeFileSync(file,c);
console.log('alert replaced with toast');
