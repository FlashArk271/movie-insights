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



