import axios from 'axios';
import type { Movie } from '../types/movie';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

interface SearchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const { data } = await API.get<SearchMoviesResponse>('/search/movie',
     {
    params: { query },
  }
);
  return data.results ?? [];
 
}

export function posterUrl(path: string | null, size: 'w500' | 'original' = 'w500') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
}

export function backdropUrl(path: string | null, size: 'w500' | 'original' = 'original') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
}