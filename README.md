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

This repo deploys automatically on every push to `main`. The workflow builds the app and publishes the `dist` folder to the `gh-pages` branch.

### One-time GitHub setup

1. Push the code to GitHub:
   ```bash
   git add .
   git commit -m "Add World Cup schedule tracker"
   git push -u origin main
   ```

2. In your repo on GitHub, go to **Settings → Pages**.

3. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `/ (root)`

   Do **not** use the `main` branch — that serves raw source files and causes a blank page with a `/src/main.tsx` 404.

4. Wait for the **Deploy to GitHub Pages** workflow to finish under the **Actions** tab, then visit:
   ```
   https://logolica99.github.io/football-schedule-tracker/
   ```
