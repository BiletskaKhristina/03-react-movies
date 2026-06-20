import styles from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';
import { posterUrl } from '../../services/movieService';

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(m)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(m);
            }}
          >
            <img
              className={styles.image}
              src={posterUrl(m.poster_path, 'w500') || ''}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
