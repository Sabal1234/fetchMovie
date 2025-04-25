import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const GetMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [search, setSearch] = useState('');

  // Use a default search query for all movies until user provides input
  const defaultSearch = search === '' ? 'Avengers' : search; // Default to "Avengers" for now

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie', defaultSearch],
    queryFn: async () =>
      await fetch(`https://www.omdbapi.com/?s=${defaultSearch}&apikey=6a864e71`) // Using "s" to fetch a list of movies
        .then((res) => res.json()),
  });

  const handleSearch = () => {
    setSearch(movieName);
  };

  if (isError) {
    return <h1>Sorry, there was an error</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="movie-container">
      <h2>Search Movie</h2>

      <div className="input-group">
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {data && data.Response === 'True' && (
        <div className="movie-list">
          {data.Search.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <h3>{movie.Title}</h3>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
                width="200"
              />
              <p><strong>Year:</strong> {movie.Year}</p>
              <p><strong>Type:</strong> {movie.Type}</p>
            </div>
          ))}
        </div>
      )}

      {data && data.Response === 'False' && <p>No movies found for "{search}".</p>}
    </div>
  );
};
