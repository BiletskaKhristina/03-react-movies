import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const res: AxiosResponse<SearchMoviesResponse> = await API.get(
    "/search/movie",
    {
      params: { query },
    }
  );

  return res.data?.results ?? [];
}

export function posterUrl(
  path: string | null,
  size: "w500" | "original" = "w500"
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}

export function backdropUrl(
  path: string | null,
  size: "w500" | "original" = "original"
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}