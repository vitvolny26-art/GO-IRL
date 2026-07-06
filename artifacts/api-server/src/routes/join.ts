import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";
const BOT_USERNAME = process.env.VITE_TELEGRAM_BOT_USERNAME ?? "GOirl_bot";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const telegramUrl = `https://t.me/${BOT_USERNAME}?startapp=${encodeURIComponent(id)}`;

  let title = "GO IRL — Спортивное событие";
  let description = "Присоединяйся к реальному событию в Оломоуце!";

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const resp = await fetch(
        `${SUPABASE_URL}/rest/v1/activities?id=eq.${encodeURIComponent(id)}&select=title_ru,description_ru,event_date,event_time,address&limit=1`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      if (resp.ok) {
        const data = (await resp.json()) as Array<{
          title_ru?: string;
          description_ru?: string;
          event_date?: string;
          event_time?: string;
          address?: string;
        }>;
        const row = data[0];
        if (row) {
          if (row.title_ru) title = row.title_ru;
          const parts = [row.description_ru, row.event_date, row.event_time, row.address].filter(Boolean);
          if (parts.length) description = parts.join(" · ");
        }
      }
    } catch {
      // use defaults
    }
  }

  const proto = (req.headers["x-forwarded-proto"] as string | undefined) ?? "https";
  const host = req.headers.host ?? "";
  const ogUrl = `${proto}://${host}/join/${encodeURIComponent(id)}`;
  const imageUrl = `${proto}://${host}/brand/logo-wide.png`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.send(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(ogUrl)}" />
  <meta property="og:image" content="${esc(imageUrl)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(imageUrl)}" />
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f0f;color:#fff;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:24px}
    .card{max-width:420px;width:100%;text-align:center}
    .logo{width:160px;margin-bottom:28px;border-radius:12px}
    h1{font-size:1.35rem;font-weight:700;margin-bottom:10px;line-height:1.3}
    p{font-size:.95rem;color:#aaa;margin-bottom:32px;line-height:1.5}
    .btn{display:inline-block;background:#2AABEE;color:#fff;font-size:1rem;font-weight:600;padding:14px 36px;border-radius:14px;text-decoration:none;letter-spacing:.01em}
    .btn:active{opacity:.85}
  </style>
</head>
<body>
  <div class="card">
    <img src="${esc(imageUrl)}" alt="GO IRL" class="logo" />
    <h1>${esc(title)}</h1>
    <p>${esc(description)}</p>
    <a href="${esc(telegramUrl)}" class="btn">Открыть в Telegram</a>
  </div>
  <script>setTimeout(function(){ window.location.href="${esc(telegramUrl)}"; }, 1500);</script>
</body>
</html>`);
});

export default router;
