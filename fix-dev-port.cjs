const fs = require('fs');

const file = 'package.json';
const pkg = JSON.parse(fs.readFileSync(file,'utf-8'));

// позволяем передавать порт извне
pkg.scripts.dev = "PORT=${PORT:-5173} BASE_PATH=/ pnpm --filter @workspace/go-irl dev";

fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
console.log('dev port made dynamic');
