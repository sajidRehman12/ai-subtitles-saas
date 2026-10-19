# SubFlow AI — Video Subtitle & Caption Studio SaaS

A production-ready 8-page SaaS web application for generating, styling, synchronizing, and translating animated video subtitles.

## Deploying to Vercel

This repository is pre-configured with `vercel.json` for instant deployment on [Vercel](https://vercel.com).

### Method 1: Deploy with Git (Recommended)

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Select your repository and click **Import**.
4. Vercel will auto-detect the configuration:
   - **Framework Preset**: Vite
   - **Install Command**: `npm install --legacy-peer-deps` (automatically configured via `.npmrc` & `vercel.json`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your app will be live on a `*.vercel.app` domain in seconds!

### Method 2: Deploy with Vercel CLI

From your local project terminal:

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Run deployment
vercel
```

Follow the interactive prompts (defaults are pre-configured in `vercel.json`). For production deployment:

```bash
vercel --prod
```

---

### Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Create production build
npm run build
```
