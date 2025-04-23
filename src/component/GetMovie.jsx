import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const GetMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie', search],
    queryFn: () =>
      fetch(`https://www.omdbapi.com/?t=${search}&apikey=6a864e71`)
        .then((res) => res.json()),
    enabled: !!search, 
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
  <input
    type="text"
    value={movieName}
    onChange={(e) => setMovieName(e.target.value)}
    placeholder="Enter movie name"
  />
  <button onClick={handleSearch}>Search</button>

  {data && data.Response === 'True' && (
    <div className="movie-details">
      <h3>{data.Title}</h3>
      <img
        src={data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450'}
        alt={data.Title}
        width="200"
      />
      <p><strong>Year:</strong> {data.Year}</p>
      <p><strong>Genre:</strong> {data.Genre}</p>
      <p><strong>Director:</strong> {data.Director}</p>
      <p><strong>Actors:</strong> {data.Actors}</p>
      <p><strong>Plot:</strong> {data.Plot}</p>
      <p><strong>IMDb Rating:</strong> {data.imdbRating}</p>
    </div>
  )}

  {data && data.Response === 'False' && <p>No movie found for "{search}".</p>}
</div>

  );
};
