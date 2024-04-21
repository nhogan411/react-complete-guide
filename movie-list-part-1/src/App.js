import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null); // default to null

	// need to wrap fetchMovieHandler code in useCallback so that we can add fetchMovieHandler as dependency of useEffect
	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null); // ensure we clear out any previous errors by re-setting state to null

		try {
			// fetch request might take time to process, so utilizes promise
			const response = await fetch('https://swapi.dev/api/films')

			// 400 responses are not recognized by try as errors, so we have to manually trigger the error code
			if ( !response.ok ) {
				throw new Error('Something Went Wrong! Response Not OK!');
			}

			const data = await response.json();

			const transformedMovies = data.results.map( (movie) => {
				return {
					id: movie.episode_id,
					title: movie.title,
					// our format looks for 'releaseDate', the API format is 'release_date' so we're mapping their format into ours
					releaseDate: movie.release_date,
					// our format looks for 'openingText', the API format is 'opening_crawl' so we're mapping their format into ours
					openingText: movie.opening_crawl
				}
			});

			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect( () => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	let content = <p>No Movies Found</p>;

	if ( isLoading ) {
		content = <p>Loading...</p>;
	} else if ( error ) {
		content = <p>{error}</p>
	} else if ( movies.length > 0 ) {
		content = <MoviesList movies={movies} />
	}

  return (
    <React.Fragment>
      <section>{ content }</section>
    </React.Fragment>
  );
}

export default App;
