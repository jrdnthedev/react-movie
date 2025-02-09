import { Movie, TvShow } from "./types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

async function fetchData<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.results;
  } catch (err) {
    if (err instanceof TypeError) {
      console.error("Network error: ", err);
      throw new Error("Network issue, please try again.");
    } else {
      console.error("fetching error: ", err);
      throw new Error("Failed to fetch data.");
    }
  }
}

export async function getTopRatedMovies() {
  const topRatedMovies = await fetchData<Movie>(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  );
  return topRatedMovies.sort(
    (a: Movie, b: Movie) => b.vote_average - a.vote_average
  );
}

export async function getMovies() {
  const movies = await fetchData<Movie>(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  );
  return movies;
}

export async function getShows() {
  const shows = await fetchData<TvShow>(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
  );
  return shows;
}

export async function getTopRatedShows() {
  const topRatedShows = await fetchData<TvShow>(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
  );
  return topRatedShows.sort(
    (a: TvShow, b: TvShow) => b.vote_average - a.vote_average
  );
}
