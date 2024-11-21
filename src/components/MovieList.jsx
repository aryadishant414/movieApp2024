import React from 'react'

const MovieList = (props) => {
    // console.log("INSIDE MOVIE LIST PROPS IS : ", props); // just to check
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.map((movie, index) => (
                
                <div className='image-container d-flex  justify-content-start m-3'>
                    
                    <img src={movie.Poster} alt='movie'></img>
                    <span onClick={() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavouriteComponent />
                    </span>
                </div>
                
            ))}
        </>
    );
};

export default MovieList;