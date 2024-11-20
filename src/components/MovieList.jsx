import React from 'react'

const MovieList = (props) => {
    // console.log("INSIDE MOVIE LIST PROPS IS : ", props); // just to check
    return (
        <>
            {props.movies.map((movie, index) => (
                
                <div className="col-sm-4">
                    <div className='image-container d-flex justify-content-start m-3'>
                        <img src={movie.Poster} alt='movie'></img>
                    </div>
                </div>
                
            ))}
        </>
    );
};

export default MovieList;