# Movie Insights

Enter an IMDb movie ID and get movie details + AI-powered audience sentiment analysis.

## Features

- Movie details: poster, cast, rating, plot, box office, awards
- AI sentiment analysis via Groq (Llama 3.3 70B)
- Sentiment classification: positive / mixed / negative
- Recent searches saved locally
- Responsive, dark-themed UI

## Tech Stack

Next.js · TypeScript · Tailwind CSS · Framer Motion · Groq SDK

## Setup

```bash
npm install
```

Create a `.env.local` file:

```
OMDB_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

- OMDB key: [omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
- Groq key: [console.groq.com](https://console.groq.com)

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Push to GitHub and import at [vercel.com/new](https://vercel.com/new). Add `OMDB_API_KEY` and `GROQ_API_KEY` as environment variables in the Vercel dashboard.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
