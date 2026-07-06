const fs = require('fs');

const file = 'package.json';
const pkg = JSON.parse(fs.readFileSync(file,'utf-8'));

pkg.scripts.dev = "PORT=5173 BASE_PATH=/ pnpm --filter @workspace/go-irl dev";

fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
console.log('port switched to 5173');
