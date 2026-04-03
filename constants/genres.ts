export interface GenreChip {
  id: number;
  name: string;
}

/** "All / Recommended" pseudo-genre — id 0 means no genre filter */
export const ALL_GENRE: GenreChip = {
  id: 0,
  name: "Recommended",
};

/**
 * Curated list of popular TMDB genres for the category chips.
 * The full list is also fetched dynamically from the API,
 * but this acts as a fast fallback while the request is in-flight.
 */
export const POPULAR_GENRES: GenreChip[] = [
  ALL_GENRE,
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 16, name: "Animation" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
];
