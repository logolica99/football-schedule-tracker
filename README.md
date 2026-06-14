# World Cup 2026 Schedule Tracker

A glassmorphism-styled FIFA World Cup 2026 match schedule with timezone support, search, and live countdown timers for today's matches.

**Live site:** [https://logolica99.github.io/football-schedule-tracker/](https://logolica99.github.io/football-schedule-tracker/)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repo is configured to deploy automatically via GitHub Actions on every push to `main`.

### One-time GitHub setup

1. Push the code to GitHub:
   ```bash
   git add .
   git commit -m "Add World Cup schedule tracker"
   git push -u origin main
   ```

2. In your repo on GitHub, go to **Settings → Pages**.

3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

4. After the first push to `main`, the **Deploy to GitHub Pages** workflow will run. Once it completes, your site will be live at:
   ```
   https://logolica99.github.io/football-schedule-tracker/
   ```

### Manual deploy

You can also trigger a deploy from the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.
