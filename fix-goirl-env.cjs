const fs = require('fs');

const file = 'artifacts/go-irl/package.json';
const pkg = JSON.parse(fs.readFileSync(file,'utf-8'));

pkg.scripts = pkg.scripts || {};
pkg.scripts.build = "PORT=5173 BASE_PATH=/ vite build --config vite.config.ts";

fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
console.log('go-irl env fixed');
