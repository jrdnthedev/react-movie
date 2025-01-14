export type BaseMedia = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Movie = BaseMedia & {
  original_title: string;
  title: string;
};

export type TvShow = BaseMedia & {
  original_name: string;
  name: string;
};

export type Media = Movie | TvShow;
