const fs = require('fs');

const file = 'package.json';
const pkg = JSON.parse(fs.readFileSync(file,'utf-8'));

pkg.scripts = pkg.scripts || {};
pkg.scripts.dev = "pnpm --filter @workspace/go-irl dev";

fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
console.log('dev script added');
