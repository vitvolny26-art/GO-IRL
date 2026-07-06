const fs = require('fs');

const file = 'package.json';
const pkg = JSON.parse(fs.readFileSync(file,'utf-8'));

pkg.scripts.build = "PORT=5173 BASE_PATH=/ pnpm run typecheck && pnpm -r --if-present run build";

fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
console.log('build script patched with env');
