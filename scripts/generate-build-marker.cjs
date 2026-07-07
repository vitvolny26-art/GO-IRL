const fs = require("fs");
const cp = require("child_process");

const htmlPath = "index.html";

const commit =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  cp.execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();

const shortCommit = commit.slice(0, 7);
let html = fs.readFileSync(htmlPath, "utf8");

html = html.replace(/\s*<div id="beta-build-marker"[\s\S]*?<\/div>/g, "");
html = html.replace(/\s*<button id="beta-build-marker"[\s\S]*?<\/button>/g, "");

const marker = `<button id="beta-build-marker" type="button" title="Reload clean build" onclick="(async()=>{try{localStorage.removeItem('go-irl-store');sessionStorage.clear();if('caches'in window){const keys=await caches.keys();await Promise.all(keys.map((key)=>caches.delete(key)));}if(navigator.serviceWorker){const regs=await navigator.serviceWorker.getRegistrations();await Promise.all(regs.map((reg)=>reg.unregister()));}}catch(e){}const url=new URL(window.location.href);url.searchParams.set('refresh',String(Date.now()));window.location.replace(url.toString());})()" style="position:fixed;left:68px;top:34px;z-index:99999;font-size:10px;font-weight:400;line-height:1;opacity:.65;background:#111;color:#fff;padding:3px 6px;border:0;border-radius:8px">beta ${shortCommit}</button>`;

html = html.replace("</body>", `    ${marker}\n  </body>`);
html = html.trimEnd() + "\n";

fs.writeFileSync(htmlPath, html);
console.log(`beta build marker: beta ${shortCommit}`);
