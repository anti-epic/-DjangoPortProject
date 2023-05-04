

const LOAD_MOVIE = '/movie/load'

export const getMovie = (payload, movieId) => async dispatch => {
    const response = await fetch(`/backend/forms`)

    if(response.ok){
        console.log(response)
        const movie = await response.json()
        dispatch(getSingleMovie(movie))
    }
    else {
        console.log(response, ' bad')
    }
}




const getSingleMovie = (movie) =>{
    return {type: LOAD_MOVIE,
    movie
    }
}




const initialState = {
};


const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_MOVIE:
            let loadMovieState = { ...action.movie
            }
            return loadMovieState
        default:
            return state
    }
}


export default movieReducer
