import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

      const getMovieRequest = async () => {

        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        console.log("Data inside External Api Response is : ", responseJson);

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    const saveToLocalStorage = (items) => {
      localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));  // .json.stringify -> converts our javascript object into JSON format
    };

    const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
      const newFavouriteList = favourites.filter(
          (favourite) => favourite.imdbID !== movie.imdbID
      );

      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    };

      useEffect(() => {
        getMovieRequest();
      } , [searchValue]);

      useEffect(() => {
        const movieFavourites = JSON.parse(       // .json.parse -> converting back into our javascript object
            localStorage.getItem('react-movie-app-favourites')
        );

        setFavourites(movieFavourites);
      }, []);


      

  return (
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="Movies" />
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>

        <div className='overflow-y-hidden d-flex border'>   {/*removed ROW class from here*/} 
          <MovieList movies={movies} favouriteComponent={AddFavourite} handleFavouritesClick={addFavouriteMovie} />
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="Favourites" />
        </div>

        <div className='overflow-y-hidden d-flex border'>     {/*removed ROW class from here*/} 
            <MovieList movies={favourites} favouriteComponent={RemoveFavourites} handleFavouritesClick={removeFavouriteMovie} />
        </div>
      </div>
  );
};

export default App;
