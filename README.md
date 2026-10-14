# gildedpages

A warm, personal reading journal. Track the books you read, your reading streaks, favourite quotes, goals, and the stories that stayed with you.

## Features

- **Dashboard** with books finished, pages turned, current streak, and average rating
- **Library, Shelves, Wishlist** to organise every book you own or want to read
- **Currently Reading** with page-progress sliders and a reading timer
- **Book journals** with notes for each book
- **Quotes** to save lines worth keeping
- **Goals, Stats, Year in Review** to see the shape of your reading
- **Evening mode**, a deep forest night theme that remembers your choice
- **Online cover search** when adding books
- **Accounts.** Sign in with Google or email and password. Your journal is saved to your account, so it follows you across devices, and you can still export or import it as a JSON file from Settings

## Built with

- React + TypeScript
- TanStack Start and TanStack Router (file-based routing in `src/routes/`)
- Tailwind CSS and shadcn/ui components
- Vite
- Supabase (login + database)

## Run it on your computer

You need [Node.js](https://nodejs.org) installed.

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:3000 or http://localhost:5173).

Other commands:

```bash
npm run build   # make a production build
npm run test    # run the tests
```

## Set up sign-in (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the project, open **SQL Editor**, paste the contents of `supabase/schema.sql`, and click **Run**. This creates the `journals` table and the rules that let each person see only their own journal.
3. Open **Project Settings -> API** and copy the **Project URL** and the **anon public** key.
4. Copy `.env.example` to `.env` and paste those two values in. Never commit `.env`, and never use the `service_role` key in this app.
5. Open **Authentication -> URL Configuration** and set **Site URL** to your site (`http://localhost:8080` while testing, your Vercel URL after deploying). Add both under **Redirect URLs**, plus `/reset-password` on each.
6. **Google sign-in:** open **Authentication -> Sign In / Providers -> Google**, switch it on, and paste a Client ID and Secret from the Google Cloud Console (APIs & Services -> Credentials -> OAuth client ID, type "Web application"). Add the callback URL that Supabase shows you to Google's "Authorized redirect URIs".
7. When you deploy on Vercel, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings -> Environment Variables**, then redeploy.

## Project structure

```
src/
  components/   the app UI (gildedpages-app.tsx) and reusable ui/ pieces
  routes/       one file per page (index.tsx = Dashboard, library.tsx = Library, login.tsx = sign-in, ...)
  lib/          data and helper code (gildedpages-data.ts loads and saves your journal, auth.tsx handles sign-in)
  styles.css    colours, fonts, and animations
```

## Deploy

Push this repo to GitHub, then import it on [Vercel](https://vercel.com/new) and click Deploy.
