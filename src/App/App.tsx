import { useCallback, useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import MovieModal from '../components/MovieModal/MovieModal';
import { fetchMovies } from '../services/movieService';
import type { Movie } from '../types/movie';
import toast from 'react-hot-toast';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    const trimmed = query.trim();
   
    if (!trimmed) return;

    setError(null);
    setMovies([]); 
    setLoading(true);

    try {
      const result = await fetchMovies(trimmed);
      if (result.length === 0) {
        toast('No movies found for your request.');
      }
      setMovies(result);
    } catch (error){
      console.error(error);
      setError('Request failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = (movie: Movie) => {
    setSelected(movie);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <main className={styles.main}>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage />
        ) : movies.length > 0 ? (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        ) : null}
      </main>

      {selected && <MovieModal movie={selected} onClose={handleCloseModal} />}
    </div>
  );
}
