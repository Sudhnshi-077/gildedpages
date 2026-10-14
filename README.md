# gildedpages

A reading journal for the books you finish, the pages you turn, and the lines you want to keep.

I wanted somewhere calm to track my reading that didn't feel like a spreadsheet, so it has a forest-green library look, a night mode for late reading, and a little more warmth than most trackers.

## What you can do

- Add books to your library (covers are looked up online) and sort them onto shelves or a wishlist
- Track what you're reading with a page slider and a reading timer
- Keep notes for each book and save quotes you love
- Set reading goals and watch your streak, pages and ratings on the dashboard
- Look back on the year in the Year in Review page
- Switch to Evening mode when the lights are low
- Sign in with Google or email, so your journal stays with you on any device
- Export or import your journal as a file from Settings

## Built with

React, TypeScript, TanStack Start and Router, Tailwind CSS, shadcn/ui, and Supabase for sign-in and the database.

## Running it yourself

You'll need Node.js and a free Supabase project.

```bash
git clone https://github.com/Sudhnshi-077/gildedpages.git
cd gildedpages
npm install
```

1. In Supabase, open the SQL Editor and run `supabase/schema.sql` once. It creates the table and makes sure each person can only read their own journal.
2. Copy `.env.example` to `.env` and fill in your Supabase project URL and publishable key.
3. Start the app:

```bash
npm run dev
```

Email sign-in works straight away. Google sign-in also needs the Google provider switched on in Supabase.

## Where things are

```
src/routes/       one file per page
src/components/   the app screens and shared pieces
src/lib/          journal data and sign-in code
src/styles.css    colours, fonts and animations
supabase/         the database setup
```