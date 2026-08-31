<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Operasyon — Netcup self-hosted (2026-08-31)

Web + PostgreSQL + auth artık **Netcup VPS'te self-hosted**. **Vercel ve Neon terk edildi** (yedek olarak duruyor, sonra kesilecek). Canlı: **https://www.exfe.me** · Tüm veri (kullanıcılar, şifreler, ilerleme, içerik) taşındı.

## Sunucu bağlantısı
`ssh wortspiel` (takma ad `~/.ssh/config`'de; adres ve kullanıcı orada, repoda değil). Uygulama kökü `/opt/wortspiel/`:
- `blue/` + `green/` — iki git checkout (blue-green deploy) · `active` — aktif renk (`blue`|`green`)
- `.env` — tek kaynak env (her checkout'a symlink); **prod sırlar burada, repoda değil**
- `deploy.sh` — sıfır-kesinti deploy · `run-instance.sh` + systemd `wortspiel@<renk>-<port>`

## Mimari
Blue-green, renk başına **3 Node instance** (blue 3001-3003 / green 3011-3013). nginx yük dengeleme (`upstream wortspiel_app`) + statik cache + per-IP rate-limit (50r/s) + HTTPS (certbot, oto-yenileme). PostgreSQL yerel + tuned (shared_buffers 2GB). **better-auth self-hosted** (Neon Auth/Supabase DEĞİL; Google creds boş→giriş kapalı, Apple/FB "yakında"). Kapasite: 2000+ req/s doğrulandı, 10k DAU rahat.

## Commit / Push / Deploy
- **Commit**: yerelde normal `git commit`. Claude **yerel commit'te kalır**.
- **Push**: `git push origin main` — **Samet yapar** (Claude push etmez). Push → GitHub webhook → sunucuda `deploy.sh` → **sıfır-kesinti** rolling deploy: idle renk build + sağlık kontrolü → nginx graceful swap → eski renk durur. Sağlık geçmezse deploy iptal, **canlıya dokunulmaz**.
- **Manuel deploy** (nadiren): `ssh wortspiel 'bash /opt/wortspiel/deploy.sh'`

## Durum / deploy kontrolü
```bash
curl -sI https://www.exfe.me | head -1                              # site canlı mı
ssh wortspiel 'cat /opt/wortspiel/active'                           # aktif renk
ssh wortspiel 'journalctl -u wortspiel-webhook -n 30 --no-pager'    # son push→deploy logu
ssh wortspiel 'systemctl is-active wortspiel@green-3011 wortspiel@green-3012 wortspiel@green-3013'  # instance sağlığı (aktif renge göre port)
```
