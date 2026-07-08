const fs = require("fs");
const cp = require("child_process");

const htmlPath = "index.html";
const commit = process.env.VERCEL_GIT_COMMIT_SHA || cp.execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
const shortCommit = commit.slice(0, 7);
const builtAt = new Date().toISOString();

let html = fs.readFileSync(htmlPath, "utf8");

html = html.replace(/\s*<div id="beta-build-marker"[\s\S]*?<\/script>/g, "");
html = html.replace(/\s*<button id="beta-build-marker"[\s\S]*?<\/script>/g, "");

const marker = `
    <button id="beta-build-marker" type="button" style="position:fixed;left:60px;top:24px;z-index:99999;font-size:12px;font-weight:700;line-height:1;background:#2563eb;color:#fff;padding:5px 10px;border:0;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.28);cursor:pointer;user-select:none">BETA ${shortCommit}</button>
    <script>
      (() => {
        const commit = "${shortCommit}";
        const builtAt = "${builtAt}";
        const badge = document.getElementById("beta-build-marker");

        const reload = () => {
          const url = new URL(window.location.href);
          url.searchParams.set("refresh", String(Date.now()));
          window.location.replace(url.toString());
        };

        const copy = async (text) => {
          try { await navigator.clipboard.writeText(text); } catch {}
        };

        badge?.addEventListener("click", async () => {
          const action = window.prompt(
            "GO IRL Developer\\n\\n" +
            "Commit: " + commit + "\\n" +
            "Built: " + builtAt + "\\n\\n" +
            "1 - Reload latest build\\n" +
            "2 - Copy commit\\n" +
            "3 - Copy debug info\\n" +
            "4 - Report bug"
          );

          if (action === "1") reload();
          if (action === "2") await copy(commit);
          if (action === "3") await copy(JSON.stringify({
            app: "GO IRL",
            commit,
            builtAt,
            href: window.location.href,
            userAgent: navigator.userAgent
          }, null, 2));
          if (action === "4") window.open("https://t.me/go_irl_support", "_blank", "noopener,noreferrer");
        });
      })();
    </script>`;

html = html.replace("</body>", marker + "\n  </body>");
html = html.trimEnd() + "\n";

fs.writeFileSync(htmlPath, html);
console.log("developer badge:", shortCommit);
