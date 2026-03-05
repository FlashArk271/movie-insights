export interface MovieData {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string | null;
  ratings: { Source: string; Value: string }[];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  boxOffice: string;
}

export interface SentimentData {
  sentimentSummary: string;
  classification: "positive" | "mixed" | "negative";
  keyThemes: string[];
  audienceHighlights: string;
  recommendedFor: string;
}
