import { NextRequest, NextResponse } from "next/server";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

export async function GET(req: NextRequest) {
  const imdbId = req.nextUrl.searchParams.get("id");

  if (!imdbId || !/^tt\d{7,}$/.test(imdbId)) {
    return NextResponse.json(
      { error: "Invalid IMDb ID. Expected format: tt0133093" },
      { status: 400 }
    );
  }

  if (!OMDB_API_KEY) {
    return NextResponse.json(
      { error: "OMDB API key not configured" },
      { status: 500 }
    );
  }

  try {
    const url = `https://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&apikey=${OMDB_API_KEY}&plot=full`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      return NextResponse.json(
        { error: data.Error || "Movie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      writer: data.Writer,
      actors: data.Actors,
      plot: data.Plot,
      language: data.Language,
      country: data.Country,
      awards: data.Awards,
      poster: data.Poster !== "N/A" ? data.Poster : null,
      ratings: data.Ratings || [],
      metascore: data.Metascore,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
      imdbID: data.imdbID,
      type: data.Type,
      boxOffice: data.BoxOffice,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}
