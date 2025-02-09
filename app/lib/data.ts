import { Movie, TvShow } from "./types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

export async function getTopRatedMovies() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const data = await res.json();
    data.results.sort((a: Movie, b: Movie) => b.vote_average - a.vote_average);
    const topRatedMovies = data.results.slice(0, 4);
    return topRatedMovies;
  } catch (err) {
    console.error("fetching error: ", err);
    throw new Error("Failed to fetch rated movies.");
  }
}

export async function getMovies() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("fetching error: ", err);
    throw new Error("Failed to fetch rated movies.");
  }
}

export async function getShows() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("fetching error: ", err);
    throw new Error("Failed to fetch rated shows.");
  }
}

export async function getTopRatedShows() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      options
    );
    const data = await res.json();
    data.results.sort(
      (a: TvShow, b: TvShow) => b.vote_average - a.vote_average
    );
    const topRatedShows = data.results.slice(0, 4);
    return topRatedShows;
  } catch (err) {
    console.error("fetching error: ", err);
    throw new Error("Failed to fetch rated shows.");
  }
}
