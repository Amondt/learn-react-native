const initState = {
    favMovies: []
}

function favReducer(state = initState, action) {
    switch (action.type) {
        case 'TOGGLE_FAV':
            console.log(action.filmId)
            const favMovieIndex = state.favMovies.indexOf(action.filmId)
            if (favMovieIndex !== -1) {
                return {
                    ...state,
                    favMovies: state.favMovies.splice(favMovieIndex, 1)
                }
            } else {
                return {
                    ...state,
                    favMovies: state.favMovies.concat(action.filmId)
                }
            }

        default:
            return state
    }
}

export default favReducer